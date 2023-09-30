
# Patrol_Robot

## Overview
This project contains various packages and configurations to simulate and control a patrol robot.

## Packages Used
- Gazebo
- Rviz
- Teleop_twist_keyboard

## Pre-requisites
Before building the workspace, ensure the following packages are installed:

- Teleop_twist_keyboard: 
  ```bash
  sudo apt-get install ros-noetic-teleop-twist-keyboard
  ```
- Mapping: 
  ```bash
  sudo apt-get install ros-noetic-slam-gmapping
  ```
- Gazebo: 
  ```bash
  sudo apt-get install ros-noetic-gazebo-ros
  ```

## Setup and Launch
1. Create a ROS workspace:
   ```bash
   mkdir -p ~/catkin_ws/src
   ```

2. Build the workspace:
   ```bash
   catkin_make
   ```

3. Clone the GitHub repository in the `src` folder:
   ```bash
   git clone [REPO_SSH]
   ```

4. Navigate back to the workspace and build again:
   ```bash
   cd ..
   catkin_make
   ```

5. Source the workspace:
   ```bash
   source ~/catkin_ws/devel/setup.bash
   ```

6. Launch the Gazebo world:
   ```bash
   roslaunch mr_robot_gazebo sp_bot_sim.launch
   ```

7. To view camera images and laser scans in Rviz:
   - Open Rviz.
   - Navigate to the top-left "File" menu.
   - Select "Open Config".
   - Choose the "robot.rviz" config file.

8. Control the robot using keyboard commands:
   ```bash
   rosrun teleop_twist_keyboard teleop_twist_keyboard.py
   ```
   - Use `I`, `<` for forward and backward.
   - Use `J`, `L` for left and right.

9. For mapping:
   ```bash
   rosrun gmapping slam_gmapping scan:=/scan
   ```

## ROS Utilities
- To check active topics:
  ```bash
  rostopic list
  ```

- To inspect a specific topic:
  ```bash
  rostopic echo [TOPIC_NAME]
  ```

- To check active nodes:
  ```bash
  rosnode list
  ```

- To inspect a specific node:
  ```bash
  rosnode info [NODE_NAME]
  ```

## WebSocket ROS Bridge
- Launch the node:
  ```bash
  rosrun websocket_ros_bridge websocket_ros_bridge_node.py
  ```

- Launch the server:
  ```bash
  python -m http.server
  ```
