var last_selected_site;
var last_selected_map;
var site_name;
var request = new XMLHttpRequest()
var sites_list;
var sites_id;
var maps_list;
var maps_id;
var selected_site
var selected_site_id;
var last_selected_site_id;
var last_selected_map_id;

var base_url_path = window.location.pathname.split('/');
var base_url = "/" + base_url_path[1] + "/" + base_url_path[2];
if (base_url_path[1] == "pages") {
  base_url = ""
}
var api_port = window.location.origin.split(":")[2];

/**    function get_site_name(id){
var site_name;
request.open('GET', `${base_url}/site_name/${id}`, false)
request.onload = function() {
var data = JSON.parse(this.response)
site_name = data[0].name
}
request.send()
return site_name
}
function get_map_name(id){
var res;
var map_name;
request.open('GET', `${base_url}/map_name/${id}`, false)
request.onload = function() {
var data = JSON.parse(this.response)
map_name = data[0].name
site_id = data[0].site_id
res = {'map_name': map_name, 'site_id' : site_id}
}
request.send()
return res
}**/

function selected_search() {
  request.open('GET', `${base_url}/selected`, false)
  request.onload = function () {
    var data = JSON.parse(this.response)
    last_selected_site = data[0].site
    last_selected_map = data[0].map
    console.log("expected", last_selected_map, last_selected_site)
    if (last_selected_site == "Select Site") {
      site_name = undefined
    }
    else {
      site_name = last_selected_site
    }
    if (last_selected_map == "Select Map") {
      map_name = undefined
    }
    else {
      map_name = last_selected_map
    }
  }
  request.send()
  var last_ssite_index = sites_list.indexOf(last_selected_site);
  last_selected_site_id = sites_id[last_ssite_index];
  selected_site_id = last_selected_site_id
}


function update_ssite(site) {
  request.open('GET', `${base_url}/update_ssite/${site}`, false)
  request.onload = function () {
    var data = JSON.parse(this.response)
  }
  request.send()
}

function update_smap(map) {
  request.open('GET', `${base_url}/update_smap/${map}`, false)
  request.onload = function () {
    var data = JSON.parse(this.response)
  }
  request.send()
}
function site_search() {
  sites_list = new Array();
  sites_id = new Array();
  request.open('GET', `${base_url}/sites`, false)
  request.onload = function () {
    var data = JSON.parse(this.response)
    for (i = 0; i < data.length; i++) {
      sites_list.push(data[i].name)
      sites_id.push(data[i].id)
    }
  }
  request.send()
}

function map_search(selected_site_id) {
  console.log("siiteeeeeeeeee", selected_site_id)
  maps_list = new Array();
  maps_id = new Array();
  request.open('GET', `${base_url}/maps/${selected_site_id}`, false)
  request.onload = function () {
    var data = JSON.parse(this.response)
    for (i = 0; i < data.length; i++) {
      maps_list.push(data[i].name)
      maps_id.push(data[i].id)
    }
  }
  request.send()
}

function display_data(element, type) {
  var x, i, j, selElmnt, a, b, c, last_selected, data_list, data_id;
  data_list = new Array();
  data_id = new Array();
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName(element);
  console.log("siiiiiite " + x.length)
  default_site = x[0].getElementsByTagName("select")[0];
  if (type == "site") {
    last_selected = last_selected_site;
    data_list = sites_list;
    data_id = sites_id;
  }
  else if (type == "map") {
    last_selected = last_selected_map;
    data_list = maps_list;
    data_id = maps_id;
  }
  default_site.options[0].innerHTML = last_selected;
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < data_list.length; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = data_list[j];
      c.addEventListener("click", function (e) {
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          s.options[i].innerHTML = this.innerHTML;

          if (s.options[i].innerHTML == this.innerHTML) {
            selected_data = this.innerHTML;
            if (type == "site") {
              if (selected_data != last_selected_site) {
                update_ssite(selected_data);
                update_smap("Select Map");
                site_name = selected_data;
              }
              else {
                site_name = selected_data;
              }
            }
            else if (type == "map") {
              if (selected_data != last_selected_map) {
                update_smap(selected_data);
              }
              else {
                map_name = selected_data;
              }
            }
            data_name = selected_data;
            var data_index = data_list.indexOf(selected_data)
            selected_data_id = data_id[data_index]
            if (selected_data_id == undefined) {
              console.log("select a site")
            }
            else {
              if (type == "site") {
                selected_site_id = selected_data_id;
                console.log("selected site id " + selected_site_id)
              }
              else if (type == "map") {
                selected_map_id = selected_data_id;
                console.log("selected map id " + selected_map_id)
              }
            }
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
var ros;
var web_cmd;
var web_feedback;
var stylesheet;
var status;
var gridClient;
var viewer2D;
var pan_disabled;
var ros_wessocket_ip = window.location.host.replace(":4000", "")
console.log("WEBSOCKET IP", `ws://${ros_wessocket_ip}:9090`)
function init() {
  stylesheet = document.styleSheets[4];
  stylesheet.disabled = true;
  // ----------------------------------------------------------------------
  // Connecting to rosbridge
  // ----------------------------------------------------------------------

  // The Ros object is responsible for connecting to rosbridge.
  ros = new ROSLIB.Ros();
  // When a connection is established with rosbridge, a 'connection' event
  // is emitted. In the event callback, we print a success message to the
  // screen.
  ros.on('connection', function () {
  });

  // Connects to rosbridge.
  ros.connect(`ws://${ros_wessocket_ip}:9090`);
  var d = new Date()
  ros.authenticate('hello',
    "client", "dest", "rand", d.getTime(), "level", d.getTime() + 1200)

  web_cmd = new ROSLIB.Service({
    ros: ros,
    name: '/web_nav',
    serviceType: 'web_control/WebCommand'
  });
  web_feedback = new ROSLIB.Topic({
    ros: ros,
    name: '/web/robot_feedback',
    messageType: 'std_msgs/String'
  });

  start_edit_srv = new ROSLIB.Service({
    ros: ros,
    name: '/start_edit',
    serviceType: 'map_editor/StartEdit'
  });
  edit_srv = new ROSLIB.Service({
    ros: ros,
    name: '/edit',
    messageType: 'map_editor/Edit'
  });

  // ----------------------------------------------------------------------
  // Subscribing to the robot's Pose
  // ----------------------------------------------------------------------

  // The ROSLIB.Topic handles subscribing and publishing a ROS topic. This
  // topic interacts with the /robot_pose topic, published by the robot.
  var poseTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/robot_pose',
    messageType: 'geometry_msgs/Pose'
  });


  // ----------------------------------------------------------------------
  // Displaying a map
  // ----------------------------------------------------------------------

  // The ROS2D.Viewer is a 2D scene manager with additional ROS
  // functionality.
  viewer2D = new ROS2D.Viewer({
    divID: 'map-canvas',
    width: 900,
    height: 700
  });
  var map_onload = function (loaded) {
    selector = new PATH2D.Selector({
      color: createjs.Graphics.getRGB(252, 174, 106, 0.66)
    })

    map_editor.scene.addChild(selector);
  }
  map_editor = new PATH2D.MapEditor({
    divID: 'map-canvas-edit',
    width: 900,
    height: 700,
    onLoadCallBack: map_onload
  });

  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.stageX - rect.left,
      y: event.stageY - rect.top
    };
  }
  var canvas = document.getElementById("map-canvas");

  function mouse_enter(event) {
    viewer2D.scene.addEventListener('stagemousemove', mouse_position);
    window.addEventListener('DOMMouseScroll', doScrollFireFox);
    window.addEventListener('mousewheel', doScrollChrome, { passive: false });
    if (!pan_disabled) {
      enable_pan();
    }
  }

  viewer2D.scene.on("mouseenter", mouse_enter);


  function mouse_leave(event) {
    viewer2D.scene.removeEventListener('stagemousemove', mouse_position);
    window.removeEventListener('DOMMouseScroll', doScrollFireFox);
    window.removeEventListener('mousewheel', doScrollChrome, { passive: false });
    if (!pan_disabled) {
      disable_pan();
    }
  }
  viewer2D.scene.on("mouseleave", mouse_leave);

  touchSupported = createjs.Touch.isSupported();
  if (touchSupported) {
    createjs.Touch.enable(viewer2D.scene);
  }

  enable_pan = function () {
    viewer2D.scene.addEventListener("stagemousedown", mouse_down);
    viewer2D.scene.addEventListener("pressmove", press_move);
  }

  disable_pan = function () {
    viewer2D.scene.removeEventListener("stagemousedown", mouse_down);
    viewer2D.scene.removeEventListener("pressmove", press_move);
  }

  function mouse_position(event) {
    var mouse_pose = getMousePos(canvas, event);
    zoomer.startZoom(mouse_pose.x, mouse_pose.y);
  }
  function doScrollFireFox(event) {

    event = window.event || event;
    zoomer.zoom(event.detail);

    event.preventDefault();
  };

  function doScrollChrome(event) {

    event = window.event || event;
    zoomer.zoom(event.deltaY);

    event.preventDefault();
  };

  enable_zoom = function () {
    viewer2D.scene.addEventListener("stagemousedown", touch_down);
    viewer2D.scene.addEventListener("pressmove", touch_move);
  }
  disable_zoom = function () {
    viewer2D.scene.removeEventListener("stagemousedown", touch_down);
    viewer2D.scene.removeEventListener("pressmove", touch_move);
  }

  function getTouchPos(canvas, pose) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (pose.x - 30) - rect.left,
      y: (pose.y - 100) - rect.top
    };
  }
  enable_zoom();
  var initPointDist, lastPointDist;
  function touch_down(event) {
    if (touchSupported) {
      var touchLength = event.nativeEvent.touches.length;
      if (touchLength == 2) {
        var touchOne = { x: event.nativeEvent.touches[0].pageX, y: event.nativeEvent.touches[0].pageY }
        var touchTwo = { x: event.nativeEvent.touches[1].pageX, y: event.nativeEvent.touches[1].pageY }
        var poseOne = getTouchPos(canvas, touchOne);
        var poseTwo = getTouchPos(canvas, touchTwo);
        initPointDist = Math.sqrt(Math.pow(poseTwo.x - poseOne.x, 2), Math.pow(poseTwo.y - poseOne.y, 2))
        centerPoint = { x: (poseOne.x + poseTwo.x) / 2, y: (poseOne.y + poseTwo.y) / 2 }
        console.log("compare", initPointDist, centerPoint)
        zoomer.startZoom(centerPoint.x, centerPoint.y);
        viewer2D.scene.addEventListener("pressmove", touch_move);
        disable_pan();
      }
      else {
        enable_pan();
      }
    }
  }

  function touch_move(event) {
    if (touchSupported) {
      var touchLength = event.nativeEvent.touches.length;
      if (touchLength == 2) {
        var touchOne = { x: event.nativeEvent.touches[0].pageX, y: event.nativeEvent.touches[0].pageY }
        var touchTwo = { x: event.nativeEvent.touches[1].pageX, y: event.nativeEvent.touches[1].pageY }
        var poseOne = getTouchPos(canvas, touchOne);
        var poseTwo = getTouchPos(canvas, touchTwo);
        var pointDist = Math.sqrt(Math.pow(poseTwo.x - poseOne.x, 2), Math.pow(poseTwo.y - poseOne.y, 2))
        //console.log("compare",pointDist)
        changeDist = lastPointDist - pointDist
        zoomer.zoom(changeDist);
        if (Math.sign(changeDist) == -1) {
          console.log("zoom in", changeDist, initPointDist)
        }
        else if (Math.sign(changeDist) == 1) {
          console.log("zoom out", changeDist, initPointDist)
        }
        lastPointDist = pointDist
        disable_pan();
      }
      else {
        viewer2D.scene.removeEventListener("pressmove", touch_move);
        enable_pan();
      }
    }
  }
  function mouse_down(event) {
    var mouse_pose = getMousePos(canvas, event);
    panner.startPan(mouse_pose.x, mouse_pose.y);
  }

  function press_move(event) {
    var mouse_pose = getMousePos(canvas, event);
    panner.pan(mouse_pose.x, mouse_pose.y);
    viewer2D.scene.update();
  }

  laserScanViewer = new PATH2D.LaserScanViewer({
    scanSize: 0.07,
    scanColor: createjs.Graphics.getRGB(232, 76, 65)
  });

  viewer2D.scene.addChild(laserScanViewer);
  laserScan = new ROSLIB.Topic({
    ros: ros,
    name: '/scan_web',
    messageType: 'laser_viewer/LaserScanXY'
  })

  laserScan.subscribe(function (scan) {
    laserScanViewer.addScan(scan.scan);
  })

  zoomer = new PATH2D.ZoomView({
    rootObject: viewer2D.scene,
    minScale: 0.01,
  });


  panner = new ROS2D.PanView({
    rootObject: viewer2D.scene
  });

  // Subscribes to the robot's OccupancyGrid, which is ROS representation of
  // the map, and renders the map in the scene.
  gridClient = new ROS2D.OccupancyGridClient({
    ros: ros,
    rootObject: viewer2D.scene,
    continuous: true,
  });
  // Scale the canvas to fit to the map
  var count = 0;
  gridClient.on('change', function () {
    viewer2D.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    viewer2D.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
    if (count == 0) {
      displayPoseMarker();
    }
    count++;
  });
  // ----------------------------------------------------------------------
  // Showing the pose on the map
  // ----------------------------------------------------------------------

  function displayPoseMarker() {
    // Create a marker representing the robot.
    var robotMarker = new ROS2D.NavigationArrow({
      size: 12,
      strokeSize: 1,
      fillColor: createjs.Graphics.getRGB(255, 128, 0, 0.66),
    });
    robotMarker.visible = false;
    var child_len = gridClient.rootObject.children.length;
    if (child_len > 2) {
      console.log("greated that three")
      gridClient.rootObject.removeChild(gridClient.rootObject.children[(child_len - 1)]);
    }
    // Add the marker to the 2D scene.
    gridClient.rootObject.addChild(robotMarker);
    var initScaleSet = false;
    console.log("count ", gridClient.rootObject.children.length)

    // Subscribe to the robot's pose updates.
    var poseListener = new ROSLIB.Topic({
      ros: ros,
      name: '/robot_pose',
      messageType: 'geometry_msgs/Pose',
      throttle_rate: 100
    });
    poseListener.subscribe(function (pose) {
      // Orientate the marker based on the robot's pose.
      robotMarker.x = pose.position.x;
      robotMarker.y = -pose.position.y;
      if (!initScaleSet) {
        robotMarker.scaleX = 1.0 / viewer2D.scene.scaleX;
        robotMarker.scaleY = 1.0 / viewer2D.scene.scaleY;
        initScaleSet = true;
      }
      robotMarker.rotation = viewer2D.scene.rosQuaternionToGlobalTheta(pose.orientation);
      robotMarker.visible = true;
    });
  }
  web_feedback.subscribe(function (message) {
    feedback = JSON.parse(message.data);
    data = feedback.data[0];
    console.log(feedback.status + " " + feedback.data)
    if (feedback.status) {
      md.showNotifications("success", "top", "center", feedback.data, 2000);
      console.log("stringg search " + data + " " + data.search("Shutdown"))
      if (data.search("Launched") != -1) {
        toggle_buttons("start-map");
        stylesheet.disabled = true;
      }
      else if (data.search("Shutdown") != -1) {
        console.log("shutdown is true")
        window.location = 'mapping.html';
        stylesheet.disabled = true;
      }

      else if (data.search("Saved") != -1) {
        if (data.search(`Map ${site_name}/${map_name}`)) {
          stylesheet.disabled = true;
        }
      }
      if (data.search("Gmapping Already started") != -1) {
        stylesheet.disabled = true;
        toggle_buttons("start-map");
      }

      else if (data.search("Gmapping is not running") != -1) {
        stylesheet.disabled = true;
        toggle_buttons("staer-map");
      }
    }

    else {
      stylesheet.disabled = true;
      md.showNotifications("danger", "top", "center", feedback.data, 2000);
    }
  });
}
var pan_disabled_edit = false
function init_edit() {
  function getMousePosEdit(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.stageX - rect.left,
      y: event.stageY - rect.top
    };
  }
  var canvas_edit = document.getElementById("map-canvas-edit");

  function mouse_enter_edit(event) {
    map_editor.scene.addEventListener('stagemousemove', mouse_position_edit);
    window.addEventListener('DOMMouseScroll', doScrollFireFoxEdit);
    window.addEventListener('mousewheel', doScrollChromeEdit, { passive: false });
    if (!pan_disabled_edit) {
      enable_pan_edit();
    }
  }

  map_editor.scene.on("mouseenter", mouse_enter_edit);


  function mouse_leave_edit(event) {
    map_editor.scene.removeEventListener('stagemousemove', mouse_position_edit);
    window.removeEventListener('DOMMouseScroll', doScrollFireFoxEdit);
    window.removeEventListener('mousewheel', doScrollChromeEdit, { passive: false });
    if (!pan_disabled_edit) {
      disable_pan_edit();
    }
  }
  map_editor.scene.on("mouseleave", mouse_leave_edit);

  touchSupportedEdit = createjs.Touch.isSupported();
  if (touchSupportedEdit) {
    createjs.Touch.enable(map_editor.scene);
  }

  enable_pan_edit = function () {
    map_editor.scene.addEventListener("stagemousedown", mouse_down_edit);
    map_editor.scene.addEventListener("pressmove", press_move_edit);
  }

  disable_pan_edit = function () {
    map_editor.scene.removeEventListener("stagemousedown", mouse_down_edit);
    map_editor.scene.removeEventListener("pressmove", press_move_edit);
  }

  function mouse_position_edit(event) {
    var mouse_pose = getMousePosEdit(canvas_edit, event);
    zoomerEdit.startZoom(mouse_pose.x, mouse_pose.y);
  }
  function doScrollFireFoxEdit(event) {

    var event = window.event || event;
    zoomerEdit.zoom(event.detail);

    event.preventDefault();
  };

  function doScrollChromeEdit(event) {

    var event = window.event || event;
    zoomerEdit.zoom(event.deltaY);

    event.preventDefault();
  };

  enable_zoom_edit = function () {
    map_editor.scene.addEventListener("stagemousedown", touch_down_edit);
    map_editor.scene.addEventListener("pressmove", touch_move_edit);
  }
  disable_zoom_edit = function () {
    map_editor.scene.removeEventListener("stagemousedown", touch_down_edit);
    map_editor.scene.removeEventListener("pressmove", touch_move_edit);
  }

  function getTouchPosEdit(canvas, pose) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (pose.x - 30) - rect.left,
      y: (pose.y - 100) - rect.top
    };
  }
  enable_zoom_edit();
  var initPointDistEdit, lastPointDistEdit;
  function touch_down_edit(event) {
    if (touchSupported) {
      var touchLength = event.nativeEvent.touches.length;
      if (touchLength == 2) {
        var touchOne = { x: event.nativeEvent.touches[0].pageX, y: event.nativeEvent.touches[0].pageY }
        var touchTwo = { x: event.nativeEvent.touches[1].pageX, y: event.nativeEvent.touches[1].pageY }
        var poseOne = getTouchPos(canvas, touchOne);
        var poseTwo = getTouchPos(canvas, touchTwo);
        initPointDistEdit = Math.sqrt(Math.pow(poseTwo.x - poseOne.x, 2), Math.pow(poseTwo.y - poseOne.y, 2))
        var centerPoint = { x: (poseOne.x + poseTwo.x) / 2, y: (poseOne.y + poseTwo.y) / 2 }
        console.log("compare", initPointDistEdit, centerPoint)
        zoomerEdit.startZoom(centerPoint.x, centerPoint.y);
        map_editor.scene.addEventListener("pressmove", touch_move);
        disable_pan_edit();
      }
      else {
        enable_pan_edit();
      }
    }
  }

  function touch_move_edit(event) {
    if (touchSupported) {
      var touchLength = event.nativeEvent.touches.length;
      if (touchLength == 2) {
        var touchOne = { x: event.nativeEvent.touches[0].pageX, y: event.nativeEvent.touches[0].pageY }
        var touchTwo = { x: event.nativeEvent.touches[1].pageX, y: event.nativeEvent.touches[1].pageY }
        var poseOne = getTouchPos(canvas, touchOne);
        var poseTwo = getTouchPos(canvas, touchTwo);
        var pointDist = Math.sqrt(Math.pow(poseTwo.x - poseOne.x, 2), Math.pow(poseTwo.y - poseOne.y, 2))
        //console.log("compare",pointDist)
        var changeDist = lastPointDistEdit - pointDist
        zoomerEdit.zoom(changeDist);
        if (Math.sign(changeDist) == -1) {
          console.log("zoom in", changeDist, initPointDist)
        }
        else if (Math.sign(changeDist) == 1) {
          console.log("zoom out", changeDist, initPointDist)
        }
        lastPointDistEdit = pointDist
        disable_pan_edit();
      }
      else {
        map_editor.scene.removeEventListener("pressmove", touch_move);
        enable_pan_edit();
      }
    }
  }
  function mouse_down_edit(event) {
    var mouse_pose = getMousePosEdit(canvas_edit, event);
    pannerEdit.startPan(mouse_pose.x, mouse_pose.y);
  }

  function press_move_edit(event) {
    var mouse_pose = getMousePosEdit(canvas_edit, event);
    pannerEdit.pan(mouse_pose.x, mouse_pose.y);
    map_editor.scene.update();
  }

  zoomerEdit = new PATH2D.ZoomView({
    rootObject: map_editor.scene,
    minScale: 0.01,
  });


  pannerEdit = new ROS2D.PanView({
    rootObject: map_editor.scene
  });
}

function popup_handle(popup) {
  popup.style.visibility = "visible";
  popup.style.webkitAnimation = "fadeIn 1s";
  popup.style.animation = "fadeIn 1s";
  var myVar = setTimeout(hide_anim, 1000);
  var myVar = setTimeout(hide_popup, 2000);
  function hide_anim() {
    popup.style.webkitAnimation = "fadeOut 1s";
    popup.style.animation = "fadeOut 1s";
  }
  function hide_popup() {
    popup.style.visibility = "hidden";
  }
}

function button_disable(button) {
  button.disabled = true;
  button.style.opacity = 0.6;
  button.style.cursor = "not-allowed";
}
function button_enable(button) {
  button.disabled = false;
  button.style.opacity = 1.0;
  button.style.cursor = "auto";
}

var marked_original = false;
var marked_edited = false;
function mark_checkbox(type) {
  if (type == "original") {
    marked_original = true
    if (marked_edited) {
      document.getElementById('check-edited').checked = false
      marked_edited = false
    }
  }
  else if (type == "edited") {
    marked_edited = true
    if (marked_original) {
      marked_original = false
      document.getElementById('check-original').checked = false
    }
  }
}

function remove_data(element, type) {
  var drop_down = document.getElementById(element);
  while (drop_down.hasChildNodes()) {
    drop_down.removeChild(drop_down.lastChild);
  }
}

function show_data(element, type) {
  remove_data(element, type);
  var data_list;
  var value_list;
  var drop_down = document.getElementById(element);
  var opt = document.createElement("option");

  if (type == "map") {
    data_list = maps_list;
    value_list = maps_list;
    opt.text = "Select Map";
    opt.value = "select_map";
  }
  drop_down.appendChild(opt);
  for (i = 0; i < data_list.length; i++) {
    var opts = document.createElement("option");
    opts.text = data_list[i];
    opts.value = value_list[i];
    drop_down.appendChild(opts);
  }
}

function toggle_display(state) {
  var new_map_area = document.getElementsByClassName("toggle-new-map-area")[0].style;
  var edit_map_area = document.getElementsByClassName("toggle-edit-map-area")[0].style;
  var map_canvas = document.getElementById("map-canvas").style;
  var edit_canvas = document.getElementById("map-canvas-edit").style;
  if (state == "new") {
    new_map_area.display = "inline";
    edit_map_area.display = "none";
    map_canvas.display = "inline";
    edit_canvas.display = "none";
    document.getElementById("menu-new-map").style.backgroundColor = "#1747d1";
    document.getElementById("menu-edit-map").style.backgroundColor = "#547df0";
  }
  else if (state == "edit") {
    new_map_area.display = "none";
    edit_map_area.display = "inline";
    map_canvas.display = "none";
    edit_canvas.display = "inline";
    document.getElementById("menu-new-map").style.backgroundColor = "#547df0";
    document.getElementById("menu-edit-map").style.backgroundColor = "#1747d1";
    map_search(selected_site_id);
    show_data("select_map", "map")
    init_edit()
  }
}

function add_site() {
  document.getElementById("add-site-form").style.display = "block";
}
function hasSpaceorSlash(s) {
  var slash = s.indexOf('/') >= 0;
  var space = /\s/g.test(s);
  if (slash || space) {
    return true;
  }
}

function clearInput(s) {
  document.getElementById(s).value = '';
}

function save_site() {
  var new_site_name = document.getElementById("new_site_name").value;
  if (new_site_name.length == 0) {
    var popup = document.getElementById("popup-site-name");
    popup_handle(popup);
  }
  else {
    if (hasSpaceorSlash(new_site_name)) {
      var popup = document.getElementById("popup-site-name");
      popup.innerHTML = "Please Don't use spaces and '/''"
      popup_handle(popup);
      clearInput("new_site_name");
    }
    else {
      site_search()
      if (sites_list.includes(new_site_name)) {
        md.showNotifications("warning", "top", "center", "Site Already Exists", 2000);
        clearInput("new_site_name");
      }
      else {
        request.open('GET', `${base_url}/create_site/${new_site_name}`, false)
        request.onload = function () {
          var data = JSON.parse(this.response)
          for (i = 0; i < data.length; i++) {
            var new_site_id = data[i].id
            console.log("new_site_id  " + new_site_id)
          }
          if (new_site_id != undefined) {
            md.showNotifications("success", "top", "center", "Site Saved", 2000);
            var myVar = setTimeout(reload_page, 1000)
            function reload_page() {
              window.location = 'mapping.html';
            }
          }
        }
        request.send()
        document.getElementById("add-site-form").style.display = "none";
      }
    }
  }
}
function closesavesiteform() {
  document.getElementById("add-site-form").style.display = "none";
}
var state;
var first_click = true;
function start_mapping() {
  if (site_name == undefined) {
    console.log("site name undefied")
    md.showNotifications("warning", "top", "center", "Select Site First!", 1000);
  }
  else {
    if (first_click) {
      md.showNotifications("info", "top", "center", "Check Selected Site", 1000);
      first_click = false;
    }
    else {
      var cmd = new ROSLIB.ServiceRequest({
        command: '{"authorization": "auth_token","mode": "gmapping","command":{"gmapping_command": "start","control": "joystick"}}'

      });
      web_cmd.callService(cmd, function (result) {
        var res = result.received_status
        if (res) {
          status = "Launched Gmapping"
          state = "on"
          stylesheet.disabled = false;
          console.log("Started Gmapping: " + res)
        }
      });
    }
  }
}
function reset_mapping() {
  var cmd = new ROSLIB.ServiceRequest({
    command: '{"authorization": "auth_token","mode": "gmapping","command":{"gmapping_command": "reset","control": "joystick"}}'

  });
  web_cmd.callService(cmd, function (result) {
    var res = result.received_status
    if (res) {
      stylesheet.disabled = false;
      console.log("Reset Gmapping: " + res)
    }
  });

}
function exit_mapping() {
  if (state == "on") {

    var cmd = new ROSLIB.ServiceRequest({
      command: '{"authorization": "auth_token","mode": "gmapping","command":{"gmapping_command": "exit"}}'

    });
    web_cmd.callService(cmd, function (result) {
      var res = result.received_status
      if (res) {
        status = "Shutdown Gmapping";
        stylesheet.disabled = false;
        console.log("Reset Gmapping: " + res)
      }
    });
  }
  else {
    console.log("maping not started yet")
  }
}

function toggle_buttons(state) {
  var start_button = document.getElementsByClassName("btn-start-map")[0].style;
  var reset_button = document.getElementsByClassName("btn-reset-map")[0].style;
  var save_button = document.getElementsByClassName("btn-save-map")[0].style;
  var exit_button = document.getElementsByClassName("btn-exit-map")[0].style;
  if (state == "start-map") {
    start_button.display = "none";
    exit_button.display = "inline"
    reset_button.display = "inline";
    save_button.display = "inline";
  }
}
function openmapsaveform() {
  document.getElementById("map-save-form").style.display = "block";
}

function closemapsaveform() {
  document.getElementById("map-save-form").style.display = "none";
}
var map_name;
function savemap() {
  map_name = document.getElementById("map_name").value;
  if (map_name.length == 0) {
    var popup = document.getElementById("popup-map-name");
    popup_handle(popup);
  }
  else {
    if (hasSpaceorSlash(map_name)) {
      var popup = document.getElementById("popup-map-name");
      popup.innerHTML = "Please Don't use spaces and '/''";
      popup_handle(popup);
      clearInput("map_name");
    }
    else {
      map_search(selected_site_id);
      if (maps_list.includes(map_name)) {
        md.showNotifications("warning", "top", "center", `Map ${map_name} already exists in Site ${site_name}`, 1000);
      }
      else {
        closemapsaveform()
        console.log(map_name)
        var cmd = new ROSLIB.ServiceRequest({
          command: `{"authorization": "auth_token","mode": "gmapping","command":{"gmapping_command": "save","site_name": "${site_name}","map_name": "${map_name}"}}`

        });
        web_cmd.callService(cmd, function (result) {
          var res = result.received_status
          if (res) {
            stylesheet.disabled = false;
            console.log("Save Map: " + res)
          }
        });
      }
    }
  }
}

var start_xy;
var end_xy;
function start_selection(event) {
  var pos = map_editor.scene.globalToRos(event.stageX, event.stageY);
  console.log("clicked pose", pos)
  start_xy = { x: pos.x, y: -pos.y }
  selector.StartSelection(start_xy);
}

function update_selection(event) {
  var pos = map_editor.scene.globalToRos(event.stageX, event.stageY);
  update_xy = { x: pos.x, y: -pos.y }
  selector.UpdateSelection(update_xy);
}

function finish_selection(event) {
  var pos = map_editor.scene.globalToRos(event.stageX, event.stageY);
  console.log("final pose", pos)
  end_xy = { x: pos.x, y: -pos.y }
}

var edit_map_name = "select_map"
function select_map() {
  edit_map_name = document.getElementById('select_map').value
}

function load_map() {
  console.log("START EDIT CALLED")
  if (edit_map_name != "select_map") {
    var cmd = new ROSLIB.ServiceRequest({
      edit: "load",
      site_name: site_name,
      map_name: edit_map_name,
      load_original: marked_original
    });
    start_edit_srv.callService(cmd, function (result) {
      var res = result.status
      console.log("START EDIT RES", res);
      if (res) {
        map_editor.addMap({
          src: `../assets/map_temp/${site_name}/${edit_map_name}.png`
        })
      }
    });
  }
  else {
    md.showNotifications("warning", "top", "center", "Select Map then Load", 1000)
  }
  
}

function start_edit() {
  console.log("started editing")
  pan_disabled_edit = true;
  disable_pan_edit();
  map_editor.scene.addEventListener('stagemousedown', start_selection);
  map_editor.scene.addEventListener("pressmove", update_selection);
  map_editor.scene.addEventListener('stagemouseup', finish_selection);
}


function stop_edit() {
  pan_disabled_edit = false;
  enable_pan_edit();
  map_editor.scene.removeEventListener('stagemousedown', start_selection);
  map_editor.scene.removeEventListener("pressmove", update_selection);
  map_editor.scene.removeEventListener('stagemouseup', finish_selection);
}
var edited_coord_list = new Array();

function edit_map(fill_color) {
  edited_coord = { start: { x: start_xy.x, y: start_xy.y }, end: { x: end_xy.x, y: end_xy.y }, color: fill_color };
  edited_coord_list.push(edited_coord);
  selector.finalFill(edited_coord);
  selector.sContainer.removeAllChildren();
  stop_edit()
}

function undo() {
  edited_coord_list.pop();
  selector.fillContainer.removeChildAt((selector.fillContainer.children.length) - 1)
}

function save_edited() {
  var cmd = new ROSLIB.ServiceRequest({
    vertices: edited_coord_list,
  });
  edit_srv.callService(cmd, function (result) {
    var res = result.status
    if (res) {
      console.log("Edited and saved")
    }
  });
}

function use() {
  var cmd = new ROSLIB.ServiceRequest({
    edit: type,
    site_name: site_name,
    map_name: edit_map_name,
    load_original: false
  });
  start_edit_srv.callService(cmd, function (result) {
    var res = result.status
    if (res) {
      console.log(type)
    }
  });
}