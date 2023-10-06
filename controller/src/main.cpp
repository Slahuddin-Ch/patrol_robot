#include "ros/ros.h"
#include "controller/controller.hpp"

int main(int argc, char **argv){
    ros::init(argc, argv, "controller");
    ros::NodeHandle nh;
    Controller controller(nh);
    ros::spin();
    return(0);
}