/**
 * @author Russell Toris - rctoris@wpi.edu
 */

var KEYBOARDTELEOP = KEYBOARDTELEOP || {
  REVISION : '2'
};

/**
 * @author Russell Toris - rctoris@wpi.edu
 */

/**
 * Manages connection to the server and all interactions with ROS.
 *
 * Emits the following events:
 *   * 'change' - emitted with a change in speed occurs
 *
 * @constructor
 * @param options - possible keys include:
 *   * ros - the ROSLIB.Ros connection handle
 *   * topic (optional) - the Twist topic to publish to, like '/cmd_vel'
 *   * throttle (optional) - a constant throttle for the speed
 */
KEYBOARDTELEOP.Teleop = function(options) {
  var that = this;
  options = options || {};
  var ros = options.ros;
  var topic = options.topic || '/cmd_vel';
  // permanent throttle
  var throttle = options.throttle || 1.0;
  var cmdVel = options.cmdVel;

  // used to externally throttle the speed (e.g., from a slider)
  this.scale = 1.0;

  // linear x and y movement and angular z movement
  var x = 0;
  var y = 0;
  var z = 0;

  // sets up a key listener on the page used for keyboard teleoperation
  var handleKey = function(keyCode, keyDown) {
    // used to check for changes in speed
    var oldX = x;
    var oldY = y;
    var oldZ = z;

    var speed = 0;
    // throttle the speed by the slider and throttle constant
    if (keyDown === true) {
      speed = throttle * that.scale;
    }
    // check which key was pressed
    switch (keyCode) {
      case 73:
        // up
        x = 0.5 * speed;
        break;

      case 188:
        // down
        x = -0.5 * speed;
        break;

      case 74:
        // turn left
        z = 1 * speed;
        break;

      case 76:
        // turn right
        z = -1 * speed;
        break;
    }
    // publish the command
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
  };


  // handle the key
  var body = document.getElementsByTagName('body')[0];
  body.addEventListener('keydown', function(e) {
    console.log('handling keydown', e);
    handleKey(e.keyCode, true);
  }, false);
  body.addEventListener('keyup', function(e) {
    console.log('handling keyup', e);
    handleKey(e.keyCode, false);
  }, false);
};
KEYBOARDTELEOP.Teleop.prototype.__proto__ = EventEmitter2.prototype;
