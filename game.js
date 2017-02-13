window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPlayer;

var drawBtn;
var clearBtn;

var player;
var enemy;

var isPlaying;

var requestAnimatFrame = 	window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame	||
							window.oRequestAnimationFrame ||
							window.msRequestAnimationFrame;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "img/bg.png";

var tiles = new Image();
tiles.src = "img/tiles.png";

function init(){
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	pl = document.getElementById("player");
	ctxPlayer = pl.getContext("2d");

	map.width = gameWidth;
	map.height = gameHeight;

	pl.width = gameWidth;
	pl.height = gameHeight;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);

	player = new Player();
	enemy = new Enemy();

	drawBg();
	
	startLoop();
}

function loop(){
	if(isPlaying){
		draw();
		update();
		requestAnimatFrame(loop);
	}
}

function startLoop(){
	isPlaying = true;
	loop();
}

function stopLoop(){
	isPlaying = false;
}

function draw(){
	player.draw();
	enemy.draw();
}

function update(){
	console.log("loop");
}

// Objects
function Player(){
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.width = 120;
	this.height = 85;

	this.speed = 5;
}

function Enemy(){
	this.srcX = 0;
	this.srcY = 95;
	this.drawX = 700;
	this.drawY = 20;
	this.width = 120;
	this.height = 85;

	this.speed = 8;
}

Enemy.prototype.draw = function() {
	// body...
	ctxMap.drawImage(
		tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.draw = function() {
	// body...
	ctxMap.drawImage(
		tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
};

function drawRect(){
	ctxMap.fillStyle = "#3D3D3D";
	ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect(){
	ctxMap.clearRect(0, 0, 800, 500);
}

function drawBg(){
	ctxMap.drawImage(background, 0, 0, gameWidth, gameHeight,
	0, 0, gameWidth, gameHeight);
}
