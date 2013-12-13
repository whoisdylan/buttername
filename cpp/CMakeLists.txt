PROJECT(kinect_test)
cmake_minimum_required(VERSION 2.8)

SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=gnu++0x -lpthread") 

include_directories(/home/user/OpenNI-Linux-x64-2.2/Include)

add_executable(bin/test src/test.cpp)
target_link_libraries(bin/test /home/user/OpenNI-Linux-x64-2.2/Redist/libOpenNI2.so)
