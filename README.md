Patrol_Robot 

Various packages used : 
Gazebo
Rviz
Teleop_twist_keyboard

Installing different packages before going to build workspace 
Teleop_twist_keyboard command : sudo apt-get install ros-noetic-teleop-twist-keyboard
Mapping command: sudo apt-get install ros-noetic-slam-gmapping
Gazebo command : sudo apt-get install ros-noetic-gazebo-ros

Steps to launch Robot gazebo world :

1)We have to create a ros workspace with the command : mkdir -p ~/catkin_ws/src

2)Then we have to build the workspace using command : catkin_make

3)Then we have to clone the github repository in the src folder using command git clone "repo ssh" .

4)Then we have to go to our workspace again by using command cd .. and again do catkin_make to built other package and files .

5)Then we have to source our workspace using command : source ~/catkin_ws/devel/setup.bash

6)To launch the gazebo world we have to give command : roslaunch mr_robot_gazebo sp_bot_sim.launch

7)To see the camera images and laserscan , i have saved the config file of the rviz in the package itself so we don't need to run anything rather than that we have to go on the up left side "file" menu and then "open config" and then we have to run "robot.rviz" config file . So our camera and laserscan both will run easily then we can see the image and laserscan both.

8)Then for controlling the robot using keyboard command : rosrun teleop_twist_keyboard teleop_twist_keyboard.py

9)Then using the I,< for front and back and j,l for left and right .
 
10)For mapping use command: rosrun gmapping slam_gmapping scan:=/scan

Other commands to check the topic which are working type rostopic list and to check a specific topic run command rostopic echo "topic name"

To check the nodes working type rosnode list and to check the specific node write rosnode info "node name" 
