#include "controller/controller.hpp"

Controller::Controller(ros::NodeHandle nh){
    control_service = nh.advertiseService("/control", &Controller::control_cb, this);
    cmd_subscriber = nh.subscribe<geometry_msgs::Twist>("/cmd_vel", 1, boost::bind(&Controller::cmd_vel_cb, this, _1));
}

Controller::~Controller(){};

bool Controller::control_cb(controller_msgs::Control::Request &req,
                controller_msgs::ControlResponse &res)
{
    std::cout << "Service Called " << std::endl;
    return true;
}

void Controller::cmd_vel_cb(const geometry_msgs::Twist::ConstPtr& cmd){
    std::cout << "Lin Vel X: " << cmd->linear.x << " Ang Vel Z: " << cmd->angular.z << std::endl;
}

