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
    x: 0,
    y: 0
};



function loadImages(sources, callback) {
    var loadedImages = 0;
    var numImages = 0;
    for (var i in sources) numImages++;
    for (var i in sources) {
        images[i] = new Image();
        images[i].onload = function() {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[i].src = sources[i];
        console.log("Loading image: " + i + " from " + sources[i]);
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
    return { x: 0, y: 0 };
}

function drawMapObjects() {
    for (let x in mapArray) {
        for (let y in mapArray[x]) {
            if (mapArray[x][y] == 4 || mapArray[x][y] == 3 || mapArray[x][y] == 5) {
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Mountain, 32, 65, 32, 32, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }
        }
    }
}

function switchToNextMap() {
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * mapList.length);
    } while (nextIndex == currentMapIndex);
    
    currentMapIndex = nextIndex;
    mapArray = mapList[currentMapIndex];
    playerBlock = findPlayerStart(mapArray);
    currentImgMain.x = playerBlock.y * gridWidth;
    currentImgMain.y = playerBlock.x * gridHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawMapObjects();
    ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
}

$(function() {
    console.log("jQuery loaded:", typeof $ !== "undefined");
    console.log("talkBox exists:", $("#talkBox").length);

    ctx = $("#canvas-rpg")[0].getContext("2d");
    ctx.canvas.width = $("#canvas-rpg").width();
    ctx.canvas.height = $("#canvas-rpg").height();

    currentMapIndex = Math.floor(Math.random() * mapList.length);
    mapArray = mapList[currentMapIndex];

    imgMain = new Image();
    imgMain.src = "../static/img/spriteSheet.png";
    currentImgMain = { x: 0, y: 0 };

    playerBlock = findPlayerStart(mapArray);
    currentImgMain.x = playerBlock.y * gridWidth;
    currentImgMain.y = playerBlock.x * gridHeight;

    imgMain.onload = function() {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
    };

    drawMapObjects();
});

$(document).on("keydown", function(event) {
    event.preventDefault();
    console.log("Pressed key:", event.code);

    let targetBlock = { x: -1, y: -1 };
    let nextBlock = { x: playerBlock.x, y: playerBlock.y };
    let cutImagePositionX;

    switch(event.code) {
        case "ArrowLeft":
            nextBlock.y--;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            nextBlock.x--;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            nextBlock.y++;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            nextBlock.x++;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if (nextBlock.x >= 0 && nextBlock.x < mapArray.length && nextBlock.y >= 0 && nextBlock.y < mapArray[0].length) {
        targetBlock.x = nextBlock.x;
        targetBlock.y = nextBlock.y;
    }

    console.log("targetBlock:", targetBlock);
    console.log("mapValue:", targetBlock.x !== -1 && targetBlock.y !== -1 ? mapArray[targetBlock.x][targetBlock.y] : "out of bounds");

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);

    if (targetBlock.x !== -1 && targetBlock.y !== -1) {
        let mapValue = mapArray[targetBlock.x][targetBlock.y];
        switch(mapValue) {
            case 0:
            case 1:
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                break;
            case 4:
                appendToTalkBox("Get money!");
                mapArray[targetBlock.x][targetBlock.y] = 0;
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                drawMapObjects(); 
                break;
            case 5: // Mountain
                appendToTalkBox("Oh no! Mountain!");
                break;
            case 3: // NPC
                $.post('/call_llm3', { context: "npc" })
                    .done(data => appendToTalkBox(data))
                    .fail(error => appendToTalkBox("ERROR：" + error.statusText));
                break;
            case 2: // Final stop
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                $.post('/call_llm2', { context: "finish" })
                    .done(data => appendToTalkBox(data))
                    .fail(error => appendToTalkBox("ERROR：" + error.statusText));
                switchToNextMap();
                break;
            default:
                appendToTalkBox("Unknown!");
                break;
        }
    } else {
        appendToTalkBox("Boundary!");
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
});