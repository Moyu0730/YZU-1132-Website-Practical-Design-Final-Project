let mapArray, ctx, currentImgMain, imgMain, currentMapIndex;
const gridFullWidth = $("#canvas-rpg").width();
const gridFullHeight = $("#canvas-rpg").height();
const gridWidth = $("#canvas-rpg").width() / 10;
const gridHeight = $("#canvas-rpg").height() / 10;
var sources = {
    Mountain: '../static/img/material.png',
    Enemy: '../static/img/Enemy.png',
    Tomato: '../static/img/material.png'
};

var images = {};
var playerBlock = {
    x:0,
    y:0
};

function loadImages(sources, callback) {
    var loadedImages = 0;
    var numImages = 0;

    // get num of sources
    for(var i in sources) numImages++;

    for(var i in sources) {
        images[i] = new Image();
        images[i].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[i].src = sources[i];
    }

    for(var i in sources) {
        console.log("Loading image: " + i + " from " + sources[i] + " - " + images[i].src);
    }
}

function findPlayerStart(map) {
    for (let x in map) {
        for (let y in map[x]) {
            if (map[x][y] == 1) {
                return { x: Number(x), y: Number(y) };
            }
        }
    }

}

// Load all images first, then draw the map and main character
function drawMapObjects(){
    for(let x in mapArray){
        for(let y in mapArray[x]){
            if(mapArray[x][y] == 4){
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Mountain, 32, 65, 32, 32, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }else if(mapArray[x][y] == 3){
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Mountain, 32, 65, 32, 32, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }else if(mapArray[x][y] == 5){
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Mountain, 32, 65, 32, 32, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }
        }
    }
}

function switchToNextMap(){
    let nextIndex = 0;
    do{
        nextIndex = Math.floor(Math.random() * 5);
    } while(nextIndex == currentMapIndex);
    
    currentMapIndex = nextIndex;
    mapArray = mapList[currentMapIndex];

    playerBlock = findPlayerStart(mapArray);
    currentImgMain.x = playerBlock.y * gridWidth;
    currentImgMain.y = playerBlock.x * gridHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawMapObjects();

    ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
}

// Make sure jQuery is loaded before this script in your HTML file
$(function(){
    ctx = $("#canvas-rpg")[0].getContext("2d");
    ctx.canvas.width = $("#canvas-rpg").width();
    ctx.canvas.height = $("#canvas-rpg").height();

    currentMapIndex = Math.floor(Math.random()*5);
    mapArray = mapList[currentMapIndex];

    imgMain = new Image();
    imgMain.src = "../static/img/spriteSheet.png";    //modify character
    currentImgMain = {
        x: 0,
        y: 0
    };

    playerBlock = findPlayerStart(mapArray);
    currentImgMain.x = playerBlock.y * gridWidth;
    currentImgMain.y = playerBlock.x * gridHeight;

    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
    };

    drawMapObjects();
});

// Click Event
$(document).on("keydown", function(event){
    let targetBlock,cutImagePositionX,nextBlock;
    targetBlock = {
        x:-1,
        y:-1
    };
    nextBlock = {
        x : playerBlock.x,
        y : playerBlock.y
    };

    event.preventDefault();

    switch(event.code){
        case "ArrowLeft":
            nextBlock.x = nextBlock.x;
            nextBlock.y--;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            nextBlock.x--;
            nextBlock.y = nextBlock.y;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            nextBlock.x = nextBlock.x;
            nextBlock.y++;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            nextBlock.x++;
            nextBlock.y = nextBlock.y;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if(nextBlock.x < 10 && nextBlock.x >=0 && nextBlock.y < 10 && nextBlock.y >=0){
        targetBlock.x = nextBlock.x;
        targetBlock.y = nextBlock.y;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: // available
            case 1: // start
            case 4: // coin
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                break;
            case 2: // Final Stop
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                switchToNextMap();
                break;
            case 3: // npc
            case 5: // obstacle
                break;
        }
    }else{
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
});
