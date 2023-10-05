#!/usr/bin/env python3

import rospy
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2

def main():
    rospy.init_node('image_stream')
    image_publisher = rospy.Publisher('/image_stream', Image, queue_size=10)
    bridge = CvBridge()

    # Load the image from file
    image_path = '~/robot_ws/src/my_image_stream/images/my_image.png'  # Replace with the path to your PNG image
    image = cv2.imread(image_path)
    if image is None:
       print(f"Failed to load the image from {image_path}")
    else:
       image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    

    rate = rospy.Rate(1)  # Publish at 1 Hz

    while not rospy.is_shutdown():
        # Convert the image to a ROS message
        image_msg = bridge.cv2_to_imgmsg(image, encoding="bgr8")
        image_publisher.publish(image_msg)
        rate.sleep()

if __name__ == '__main__':
    try:
        main()
    except rospy.ROSInterruptException:
        pass

