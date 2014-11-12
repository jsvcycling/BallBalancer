#pragma strict

var gameCtrl : ServerScript;
var winTxt : GameObject;

function Start () {
	winTxt = GameObject.FindGameObjectWithTag("WinText");
}

function Update () {
	
}

function OnTriggerEnter(col : Collider) {
	if (col.tag == "Ball") {
		gameCtrl.acceptInput = false;
		winTxt.renderer.enabled = true;
	}
}