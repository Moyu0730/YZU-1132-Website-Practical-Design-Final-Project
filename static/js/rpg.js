let mapArray, ctx, currentImgMain, imgMain, currentMapIndex;
const gridFullWidth = $("#canvas-rpg").width();
const gridFullHeight = $("#canvas-rpg").height();
const gridWidth = $("#canvas-rpg").width() / 10;
const gridHeight = $("#canvas-rpg").height() / 10;
// tasks: change it to current img
var sources = {
    Mountain: '../static/img/obstacle.png',     // obstacle
    Enemy: '../static/img/npc.png',           // npc
    Tomato: '../static/img/cup.png',       // coin
    Final: '../static/img/fish.png',        // final stop
};

var images = {};
//face: 0 - down, 1 - up, 2 - left, 3 - right
var playerBlock = {
    x:0,
    y:0,
    face:0,
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
    return { x: -1, y: -1 }; // Return an invalid position if not found
}

// Load all images first, then draw the map and main character
function drawMapObjects(){
    for(let x in mapArray){
        for(let y in mapArray[x]){
            if(mapArray[x][y] == 2){            // final 
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Final, 0, 0, 165, 165 , y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }            
            if(mapArray[x][y] == 3){            // npc
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Enemy, 0, -10, 160, 150, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            } else if(mapArray[x][y] == 4){     // coin
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Tomato, 0, -30, 180, 180, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            } else if(mapArray[x][y] == 5){     // obstacle
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Mountain, -10, -10, 165, 140, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
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
    sleep(300);
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
    playerBlock.face = 0; // face down
    currentImgMain.x = playerBlock.y * gridWidth;
    currentImgMain.y = playerBlock.x * gridHeight;

    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
    };

    // loading calendar.js
    getScripts(["./static/js/calendar.js"], function() {
        console.log("Map scripts loaded successfully.");
    });
    drawMapObjects();
    init_calendar();
    add_event("Game Started");
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
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
                break;
            case 1: // start
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
                break;
            case 4: // coin
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
                add_event("Coin Collected")
                break;
            case 2: // Final Stop
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                switchToNextMap();
                add_event("Stop Reached");
                add_day();
                break;
            case 3: // npc
                add_event("NPC Encountered");
                break;
            case 5: // obstacle
                // add_event("Obstacle Encountered");
                break;
        }
    }else{
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
});

function getScripts(scripts, callback) {

    $.ajaxSetup({
    cache: true
    });
    var progress = 0;
    scripts.forEach(function(script) { 
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        }); 
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}