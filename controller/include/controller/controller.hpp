#ifndef _CONTROLLER_H
#define _CONTROLLER_H

#include "ros/ros.h"
#include <boost/bind.hpp>
#include <geometry_msgs/Twist.h>
#include <controller_msgs/Control.h>

class Controller {
    public:
        Controller(ros::NodeHandle nh);
        ~Controller();
    private:
        ros::Publisher cmd_publisher;
        ros::Subscriber cmd_subscriber;
        ros::ServiceServer control_service;
        bool control_cb(controller_msgs::Control::Request &req,
                controller_msgs::ControlResponse &res);
        void cmd_vel_cb(const geometry_msgs::Twist::ConstPtr& cmd);
};
#endif