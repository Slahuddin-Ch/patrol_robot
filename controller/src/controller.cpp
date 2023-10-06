#include "controller/controller.hpp"

Controller::Controller(ros::NodeHandle nh){
    control_service = nh.advertiseService("/control", &Controller::control_cb, this);
    cmd_subscriber = nh.subscribe<geometry_msgs::Twist>("input/cmd_vel", 1, boost::bind(&Controller::cmd_vel_cb, this, _1));
    cmd_publisher = nh.advertise<geometry_msgs::Twist>("/cmd_vel", 1);
}

Controller::~Controller(){};

bool Controller::control_cb(controller_msgs::Control::Request &req,
                controller_msgs::ControlResponse &res)
{
    switch (req.mode) {
        case CONTROL::TELEOP:
            if (req.action == CONTROL::ENABLE && !teleop_enabled){
                teleop_enabled = true;
                res.result = true;
                std::cout << "Teleoperation Enabled" << std::endl;
            }
            else if (req.action == CONTROL::DISABLE && teleop_enabled){
                teleop_enabled = false;
                res.result = true;
                std::cout << "Teleoperation Disabled" << std::endl;
            }
            break;
        case CONTROL::ESTOP:
            if (req.action == CONTROL::ENABLE && !emergency_stop){
                emergency_stop = true;
                res.result = true;
                std::cout << "Emergency Engaged" << std::endl;
            }
            else if (req.action == CONTROL::DISABLE && emergency_stop){
                emergency_stop = false;
                res.result = true;
                std::cout << "Emergency Disengaged" << std::endl;
            }
            break;

    }
    return true;
}

void Controller::cmd_vel_cb(const geometry_msgs::Twist::ConstPtr& cmd){
    if (teleop_enabled && !emergency_stop){
        current_cmd_vel = *cmd;
        cmd_publisher.publish(current_cmd_vel);
        std::cout << "Publishing Velocity Linear: " << cmd->linear.x << " Angualar: " << cmd->angular.z << std::endl;
    }
    else if(!teleop_enabled){
        std::cout << "Can't control Robot, Teleopration Disabled" << std::endl;
    }
    else if (emergency_stop){
        std::cout << "Can't control Robot, Emergency Stopped" << std::endl;
    }
    else {
        std::cout << "Can't control Robot, Unknown Reason" << std::endl;
    }
}

