Install Ros1 Noetic with Ubuntu 20.04.

Install Gazebo.

Install Rviz.        

You can launch gazebo by following command after cloning the rewpo : roslaunch mr_robot_gazebo sp_bot_sim.launch

For control the robot remotely using keyboard we need to install a package teleop_twist_keyboard with following command: Sudo apt-get install teleop_twist_keyboard

And then by following command we can run the robot with keyboard : rosrun teleop_twist_keyboard teleop_twist_keyboard.py
