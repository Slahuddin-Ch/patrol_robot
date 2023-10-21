cmake_minimum_required(VERSION 3.0.2)
project(controller)

find_package(catkin REQUIRED
COMPONENTS 
roscpp
std_msgs
geometry_msgs
message_runtime
controller_msgs
)

catkin_package(
INCLUDE_DIRS include
LIBRARIES ${PROJECT_NAME}
CATKIN_DEPENDS
    std_msgs
    geometry_msgs
    message_runtime
    controller_msgs
)

include_directories(
include
${Boost_INCLUDE_DIRS}
${catkin_INCLUDE_DIRS}
)

add_executable(controller src/controller.cpp src/main.cpp)
target_link_libraries(controller ${Boost_LIBRARIES} ${catkin_LIBRARIES})
add_dependencies(controller ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

install(TARGETS controller
  ARCHIVE DESTINATION ${CATKIN_PACKAGE_LIB_DESTINATION}
  LIBRARY DESTINATION ${CATKIN_PACKAGE_LIB_DESTINATION}
  RUNTIME DESTINATION ${CATKIN_GLOBAL_BIN_DESTINATION}
)

install(DIRECTORY include/${PROJECT_NAME}/
  DESTINATION ${CATKIN_PACKAGE_INCLUDE_DESTINATION}
  FILES_MATCHING PATTERN "*.h"
  PATTERN ".svn" EXCLUDE
)