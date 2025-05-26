let mapArray, ctx, currentImgMain, imgMain;
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

// Make sure jQuery is loaded before this script in your HTML file
$(function(){
    // 0 : available, 1 : start, 2 : final stop, 3: npc, 4: coin, 5: obstacle
    mapArray = [
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
        [3, 0, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [2, 0, 0, 0, 0, 4, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    ctx = $("#canvas-rpg")[0].getContext("2d");
    ctx.canvas.width = $("#canvas-rpg").width();
    ctx.canvas.height = $("#canvas-rpg").height();

    imgMain = new Image();
    imgMain.src = "../static/img/spriteSheet.png";
    currentImgMain = {
        x: 0,
        y: 0
    };

    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
    };


    // Load all images first, then draw the map and main character
    for(let x in mapArray){
        for(let y in mapArray[x]){
            if(mapArray[x][y] == 1){
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Mountain, 32, 65, 32, 32, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }else if(mapArray[x][y] == 3){
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Mountain, 32, 65, 32, 32, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }else if(mapArray[x][y] == 4){
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Mountain, 32, 65, 32, 32, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }
        }
    }
});

// Click Event
$(document).on("keydown", function(event){
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        x:-1,
        y:-1
    };
    targetBlock = {
        x:-1,
        y:-1
    };
    event.preventDefault();
    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridWidth;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridHeight;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridWidth;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridHeight;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if(targetImg.x <= gridFullHeight && targetImg.x >=0 && targetImg.y <= gridFullWidth && targetImg.y >=0){
        targetBlock.x = targetImg.y / gridHeight;
        targetBlock.y = targetImg.x / gridWidth;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                break;
            case 2: // Final Stop
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: //Enemy
                break;
            case 4: // Tomato
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
        }
    }else{
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
});