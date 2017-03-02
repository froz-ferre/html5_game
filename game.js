window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPlayer;

var enemyCv;
var ctxEnemy;

var stats;
var ctxStats;

var drawBtn;
var clearBtn;

var player;
var enemies = [] ;

var isPlaying;
var health;

//For creating enemies
var spawnInterval;
var spawnTime = 6000;	// 6 sec = 6000 Msec
var spawnAmount = 3;


var requestAnimatFrame = 	window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame	||
							window.oRequestAnimationFrame ||
							window.msRequestAnimationFrame;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "img/bg.png";

var background1 = new Image();
background1.src = "img/bg.png";

var tiles = new Image();
tiles.src = "img/tiles.png";

function init(){
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	pl = document.getElementById("player");
	ctxPl = pl.getContext("2d");

	enemyCv = document.getElementById("enemy");
	ctxEnemy = enemyCv.getContext("2d");

	stats = document.getElementById("stats");
	ctxStats = stats.getContext("2d");


	map.width = gameWidth;
	map.height = gameHeight;

	pl.width = gameWidth;
	pl.height = gameHeight;

	enemyCv.width = gameWidth;
	enemyCv.height = gameHeight;

	stats.width = gameWidth;
	stats.gameHeight = gameHeight;

	ctxStats.fillStyle = "#FFFFFF";
	ctxStats.font = "bold 15pt Arial";

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);

	player = new Player();
	health = 100;

	startLoop();

	//spawnEnemy(5);

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
}

function spawnEnemy(count){
	for (var i = 0; i < count; i++) {
		enemies[i] = new Enemy();	
	}
}

function startCreatingEnemies(){
	stopCreatingEnemies();
	spawnInterval = setInterval(function(){spawnEnemy(spawnAmount)}, spawnTime)
}

function stopCreatingEnemies(){
	clearInterval(spawnInterval);
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
	startCreatingEnemies();
}

function stopLoop(){
	isPlaying = false;
}

function draw(){
	player.draw();
	clearCtxEnemy();
	for (var i = 0; i < enemies.length; i++){
		enemies[i].draw();
	}
}

function update(){
	drawBg();
	updateStats();
	player.update();
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update();
	}
}

// Objects
function Player(){
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 10;
	this.drawY = 200;
	this.width = 120;
	this.height = 85;
	this.speed = 3;

	//for keyboard
	this.isUp = false;
	this.isDown = false;
	this.isLeft = false;
	this.isRight = false;
}

function Enemy(){
	this.srcX = 0;
	this.srcY = 95;
	this.drawX = Math.floor(Math.random() * gameWidth) + gameWidth;
	this.drawY = Math.floor(Math.random() * (gameHeight - 85));
	this.width = 120;
	this.height = 85;

	this.speed = 8;
}

Enemy.prototype.draw = function() {
	// body...
	ctxEnemy.drawImage(
		tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
};

Enemy.prototype.update = function() {
	// body...
	this.drawX -= 7;
	if(this.drawX + this.width < 0)
		this.destroy();
};

Enemy.prototype.destroy = function() {
	enemies.splice(enemies.indexOf(this), 1);
}

Player.prototype.draw = function() {
	// body...
	clearCtxPlayer();
	ctxPl.drawImage(
		tiles, this.srcX, this.srcY, this.width, this.height,
		this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.chooseDir = function() {
	// body...
	if(this.isUp)
		this.drawY -= this.speed;
	if(this.isDown)
		this.drawY += this.speed;
	if(this.isRight)
		this.drawX += this.speed;
	if(this.isLeft)
		this.drawX -= this.speed;
};

function checkKeyDown(e){
	var keyID = e.keyCode || e.wich;
	var keyChar = String.fromCharCode(keyID);

	if (keyChar == "W"){
		player.isUp = true;
		e.preventDefault(); 
	}
	if (keyChar == "S"){
		player.isDown = true;
		e.preventDefault(); 
	}
	if (keyChar == "A"){
		player.isLeft = true;
		e.preventDefault(); 
	}
	if (keyChar == "D"){
		player.isRight = true;
		e.preventDefault(); 
	}
}

function checkKeyUp(e){
	var keyID = e.keyCode || e.wich;
	var keyChar = String.fromCharCode(keyID);

	if (keyChar == "W"){
		player.isUp = false;
		e.preventDefault(); 
	}
	if (keyChar == "S"){
		player.isDown = false;
		e.preventDefault(); 
	}
	if (keyChar == "A"){
		player.isLeft = false;
		e.preventDefault(); 
	}
	if (keyChar == "D"){
		player.isRight = false;
		e.preventDefault(); 
	}
}

Player.prototype.update = function() {
	// body...
	if (this.drawX < 0)
		this.drawX = 0;

	if (this.drawX + this.width > gameWidth)
		this.drawX = gameWidth - this.width;

	if (this.drawY < 0)
		this.drawY = 0;

	if (this.drawY + this.height > gameHeight)
		this.drawY = gameHeight - this.height;

	for (var i = 0; i < enemies.length; i++){
		if (this.drawX > enemies[i].drawX && 
			this.drawY > enemies[i].drawY &&
			this.drawX < enemies[i].drawX + enemies[i].width &&
			this.drawY < enemies[i].drawY + enemies[i].height){
			health--;
		}
	}	

	this.chooseDir();
};

function drawRect(){
	ctxMap.fillStyle = "#3D3D3D";
	ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect(){
	ctxMap.clearRect(0, 0, 800, 500);
}

function clearCtxPlayer(){
	ctxPl.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxEnemy(){
	ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);
}
 
function updateStats(){
	ctxStats.clearRect(0, 0, gameWidth, gameHeight);
	ctxStats.fillText("Health: "+health, 10, 20);
}

function drawBg(){
	ctxMap.drawImage(background, 0, 0, gameWidth, gameHeight,
	0, 0, gameWidth, gameHeight);
}
