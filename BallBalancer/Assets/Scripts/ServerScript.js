#pragma strict

var listenPort : int = 1337;
var maxClients : int = 1;
var floorObject : GameObject;
var ballObject : GameObject;
var speed : int = 10;

var acceptInput : boolean;

var loseTxt : GameObject;

function Start() {
	acceptInput = true;
	floorObject = GameObject.FindGameObjectWithTag("Floor");
	ballObject = GameObject.FindGameObjectWithTag("Ball");
	loseTxt = GameObject.FindGameObjectWithTag("LoseText");
}

function Update() {
	if (ballObject.transform.position.y < -25) {
		acceptInput = false;
		loseTxt.renderer.enabled = true;
	}
}

function StartServer() {
	Network.InitializeServer(maxClients, listenPort, false);
}

function StopServer() {
	Network.Disconnect();
}

function OnGUI() {
	if (Network.peerType == NetworkPeerType.Disconnected) {
		GUILayout.Label("Network server is not running.");
		if (GUILayout.Button("Start Server")) {
			StartServer();
		}
	} else {
		if (Network.peerType == NetworkPeerType.Connecting) {
			GUILayout.Label("Network server is starting up...");
		} else {
			GUILayout.Label("Network server is running.");
			ShowServerInfo();
			ShowClientInfo();
		}
		
		if (GUILayout.Button("Stop Server")) {
			StopServer();
		}
	}
}

function ShowServerInfo() {
	GUILayout.Label("IP: " + Network.player.ipAddress + " Port: " + Network.player.port);
}

function ShowClientInfo() {
	GUILayout.Label("Clients (IP:Port): " + Network.connections.Length + "/" + maxClients);
	
	for (var p: NetworkPlayer in Network.connections) {
		GUILayout.Label("    " + p.ipAddress + ":" + p.port);
	}
}

@RPC
function DoInput(dir : int, amnt : float) {
	if (acceptInput) {
		var vec : Vector3 = Vector3.zero;
		
		if (dir == 1) {
			vec.z = amnt / 2;
		} else if (dir == 2) {
			vec.x = amnt / 2;
		} else if (dir == 3) {
			vec.y = amnt / 2;
		}
		
		vec *= Time.deltaTime * 10;
		
		floorObject.transform.Rotate(vec * speed);
	}
}