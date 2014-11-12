#pragma strict

var remoteIP : String = "";
var remotePort : int = 1337;
var speed : int = 10;
var pause : boolean = true;

function connectToServer() {
	Network.Connect(remoteIP, remotePort);
}

function disconnectFromServer() {
	Network.Disconnect();
}

function OnGUI() {
	if (Network.peerType == NetworkPeerType.Disconnected) {
		GUILayout.Label("Not connected to PC.");
		GUILayout.Space(75);
		remoteIP = GUILayout.TextField(remoteIP, 30, GUILayout.Height(50));
		GUILayout.Space(75);
		if (GUILayout.Button("Connect To PC", GUILayout.Width(300), GUILayout.Height(100))) {
			connectToServer();
		}
	} else {
		if (Network.peerType == NetworkPeerType.Connecting) {
			GUILayout.Label("Connecting to PC...");
		} else {
			GUILayout.Label("Connected to PC.");
			GUILayout.Label("IP:Port: " + Network.player.ipAddress + ":" + Network.player.port);
		}
		
		if (GUILayout.Button("Disconnect from PC", GUILayout.Width(300), GUILayout.Height(100))) {
			disconnectFromServer();
		}
	}
}

function Update() {	
	networkView.RPC("DoInput", RPCMode.Server, 1, -Input.acceleration.x * 2);
	networkView.RPC("DoInput", RPCMode.Server, 2, Input.acceleration.y * 2);
}

@RPC
function DoInput(dir : int, amnt : float) {
	var vec : Vector3 = Vector3.zero;
	
	if (dir == 1) {
		vec.z = amnt;
	} else if (dir == 2) {
		vec.x = amnt;
	}
	
	vec *= Time.deltaTime * 10;
	
	transform.Rotate(vec * speed);
}