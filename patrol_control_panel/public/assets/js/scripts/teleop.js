var ros_wessocket_ip = "10.10.199.212"
console.log("WEBSOCKET IP", `ws://${ros_wessocket_ip}:9090`)
var ros;
var cmdVel;
var camera_viewer;
var keyboard_teleop;
var control_service;
var toleop_enabled = false;
var estop_enabled = false;
var move;

function connect() {
    ros = new ROSLIB.Ros();
    ros.on('connection', function() {
        console.log("Websocket Connected")
        // document.getElementById("status").innerHTML = "Connected";
      });
    
      ros.on('error', function(error) {
        console.log("Websocket error",error);
        // document.getElementById("status").innerHTML = "Error";
      });
    
      ros.on('close', function() {
        console.log("Websocket Closed")
        // document.getElementById("status").innerHTML = "Closed";
      });
    // Connects to rosbridge.
    ros.connect(`ws://${ros_wessocket_ip}:9090`);
    init()
}

function init(){
    cmdVel = new ROSLIB.Topic({
      ros : ros,
      name : "/input/cmd_vel",
      messageType : 'geometry_msgs/Twist'
    });

    keyboard_teleop = KEYBOARDTELEOP.Teleop({
        ros : ros,
        topic : "/input/cmd_vel",
        cmdVel: cmdVel
    });

    // camera_viewer = new MJPEGCANVAS.Viewer({
    //     divID : 'camera_viewer',
    //     host : ros_wessocket_ip,
    //     width : 500,
    //     height : 400,
    //     topic : '/rrbot/camera1/image_raw'
    //   });

      control_service = new ROSLIB.Service({
        ros: ros,
        name: "/control",
        serviceType: "controller_msgs/Control",
      });

      createJoystick();
}

function send_control(mode,action){
    var cmd = new ROSLIB.ServiceRequest({
        mode: mode,
        action: action
      });

      control_service.callService(cmd, function (result) {
        var res = result.result;
        if (res) {
          console.log("Success");
          return true;
        }
      });
}

function toggle_teleop(){
    if (!toleop_enabled){
        toleop_enabled = true;
        send_control(1,1)
        $("#teleop_toggle").html("Disable Teleop");
        $("#teleop_toggle").css("background-color", "#3ecc06");
    }
    else{
        toleop_enabled = false;
        send_control(1,0)
        $("#teleop_toggle").html("Enable Teleop");
        $("#teleop_toggle").css("background-color", "#75e090");
    }
    console.log("Toggle Teleop")
}

function toggle_estop(){
    if (!estop_enabled){
        estop_enabled = true;
        send_control(0,1)
        $("#estop_toggle").html("Release E-stop");
        $("#estop_toggle").css("background-color", "#e34d4d");
    }
    else{
        estop_enabled = false;
        send_control(0,0)
        $("#estop_toggle").html("Emergency Stop");
        $("#estop_toggle").css("background-color", "#e07575");
    }
    console.log("Toggle Teleop")
}

move = function(linear,angular){
    var twist = new ROSLIB.Message({
      linear : {
        x : linear,
        y : 0,
        z : 0
      },
      angular : {
        x : 0,
        y : 0,
        z : angular
      }
    });
    console.log('publishing');
    cmdVel.publish(twist);
  }

createJoystick = function () {
    var options = {
      zone: document.getElementById('joystick_area'),
      threshold: 0.1,
      position: { left: 50 + '%' },
      mode: 'static',
      size: 150,
      color: '#000000',
    };
    manager = nipplejs.create(options);

    linear_speed = 0;
    angular_speed = 0;

    manager.on('start', function (event, nipple) {
        timer = setInterval(function () {
            move(linear_speed, angular_speed)
        }, 25);
      });

    manager.on('move', function (event, nipple) {
    max_linear = 0.5; // m/s
    max_angular = 0.7; // rad/s
    max_distance = 75.0; // pixels;
    linear_speed = Math.sin(nipple.angle.radian) * max_linear * nipple.distance/max_distance;
    angular_speed = -Math.cos(nipple.angle.radian) * max_angular * nipple.distance/max_distance;
    });

    manager.on('end', function () {
        if (timer) {
          clearInterval(timer);
        }
        move(0, 0)
      });
  }