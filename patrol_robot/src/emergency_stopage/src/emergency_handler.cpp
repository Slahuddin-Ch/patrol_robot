#include <ros/ros.h>
#include <geometry_msgs/Twist.h>
#include "emergency_stopage/EmergencyControl.srv" // This should be the path to your `.srv` file

bool emergency_stop = false;  // Global flag

void cmdVelCallback(const geometry_msgs::Twist::ConstPtr& msg)
{
    if (!emergency_stop) {
        // Just let the command go through
        // ...
    } else {
        // This is where we stop the robot.
        // Send a zero velocity command or whatever stops your bot.
        // ...
    }
}

bool emergencyServiceCallback(emergency_stopage::EmergencyControl::Request &req,
                              emergency_stopage::EmergencyControl::Response &res)
{
    emergency_stop = (req.command == 0);  // Update the global flag based on the service request
    res.success = true;  // For now, let's assume it's always successful
    return true;
}

int main(int argc, char **argv)
{
    ros::init(argc, argv, "emergency_handler");
    ros::NodeHandle nh;

    // Subscribe to the robot's command topic
    ros::Subscriber sub = nh.subscribe("cmd_vel", 10, cmdVelCallback);

    // Advertise the emergency service
    ros::ServiceServer service = nh.advertiseService("emergency_control", emergencyServiceCallback);

    ros::spin();  // Keep the node alive

    return 0;
}

