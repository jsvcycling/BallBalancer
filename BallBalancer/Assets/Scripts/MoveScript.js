#pragma strict

var ballObj : GameObject;
var gameCtrl : ServerScript;
var speed = 10.0f;
var winTxt : GameObject;
var loseTxt : GameObject;

private var ballDefaultPos : Vector3;
private var obj : GameObject;

function Start () {
	ballDefaultPos = Vector3(5f, 1.1f, 2.25f);
	ballObj = GameObject.FindGameObjectWithTag("Ball");
	obj = GameObject.FindGameObjectWithTag("Floor");
	winTxt = GameObject.FindGameObjectWithTag("WinText");
	loseTxt = GameObject.FindGameObjectWithTag("LoseText");
}

function Update () {
	if (gameCtrl.acceptInput) {
		var dir : Vector3 = Vector3.zero;
		
		if (Input.GetKey(KeyCode.LeftArrow))
			dir.z += 1;
		else if (Input.GetKey(KeyCode.RightArrow))
			dir.z -= 1;
			
		if (Input.GetKey(KeyCode.UpArrow))
			dir.x += 1;
		else if (Input.GetKey(KeyCode.DownArrow))
			dir.x -= 1;
		
		if (dir.magnitude > 1)
			dir.Normalize();
			
		dir *= Time.deltaTime * 10;
		
		obj.transform.Rotate(dir * speed);
	}
	
	if (Input.GetKey(KeyCode.R)) {
		obj.transform.rotation = Quaternion.AngleAxis(0f, Vector3.zero);
		ballObj.transform.position = ballDefaultPos;
		ballObj.transform.rotation = Quaternion.AngleAxis(0f, Vector3.zero);
		ballObj.rigidbody.velocity = Vector3.zero;
		ballObj.rigidbody.angularVelocity = Vector3.zero;
		gameCtrl.acceptInput = true;
		winTxt.renderer.enabled = false;
		loseTxt.renderer.enabled = false;
	}
	
	if (Input.GetKey(KeyCode.Q)) {
		Application.Quit();
	}
	
	if (Input.GetKey(KeyCode.Alpha1)) {
		Application.LoadLevel("Level_1");
	} else if (Input.GetKey(KeyCode.Alpha2)) {
		Application.LoadLevel("Level_2");
	} else if (Input.GetKey(KeyCode.Alpha3)) {
		Application.LoadLevel("Level_3");
	} else if (Input.GetKey(KeyCode.Alpha4)) {
		Application.LoadLevel("Level_4");
	} else if (Input.GetKey(KeyCode.Alpha5)) {
		Application.LoadLevel("Level_5");
	}
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