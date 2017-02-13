window.onload = init;

var map;
var ctxMap;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "bg.png";

function init(){
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	map.width = gameWidth;
	map.height = gameHeight;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);

	drawBg();
}
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