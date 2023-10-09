function on_ready(callback)
{
	if (document.readyState !== "loading")
		callback.call(document);
	else
		document.addEventListener("DOMContentLoaded", callback.bind(document));
}

on_ready(function() {
	let topic = "ros_image:/rrbot/camera1/image_raw";
	console.log("Establishing WebRTC connection");
	let conn = WebrtcRos.createConnection();
	conn.onConfigurationNeeded = function()
	{
		console.log("Requesting WebRTC video subscription");
		let config = {};
		config.video = {"id": "subscribed_video", "src": topic};
		conn.addRemoteStream(config).then(function(event) {
			console.log("Connecting WebRTC stream to <video> element");
			document.getElementById("remote-video").srcObject = event.stream;
			event.remove.then(function(event) {
				console.log("Disconnecting WebRTC stream from <video> element");
				document.getElementById("remote-video").srcObject = null;
			});
		});
		conn.sendConfigure();
	}
	conn.connect();
});
