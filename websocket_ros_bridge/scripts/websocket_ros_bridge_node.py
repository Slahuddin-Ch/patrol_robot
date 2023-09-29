#!/usr/bin/env python3

import rospy
import json
import asyncio
import websockets
from subprocess import Popen

async def handle_websocket(websocket, path):
    while True:
        try:
            data = await websocket.recv()
            command = json.loads(data)
            print('Received command:', command) 
            if command.get('action') == 'start_teleop':
                # Launch the teleop_twist_keyboard package
                Popen(['rosrun', 'teleop_twist_keyboard', 'teleop_twist_keyboard.py'])
        except Exception as e:
            print(f"Error: {e}")

def main():
    rospy.init_node('websocket_ros_bridge')
    rospy.loginfo("WebSocket ROS Bridge is running.")

    # Start WebSocket server
    start_server = websockets.serve(handle_websocket, '0.0.0.0', 8765)

    # Start ROS node
    rospy.spin()

if __name__ == '__main__':
    main()

