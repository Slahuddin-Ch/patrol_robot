This controller node is responsible for

1. Receiving the command velocity from topic /input/cmd_vel and republish it to topic /cmd_vel
2. getting other commands such as enable/disable teleop and emergency.

To run this code and also all the necessary packages required for Remote Teleop using web
1.roslaunch mr_robot_gazebo cafehouse_world.launch
2.roslaunch controller teleop.launch