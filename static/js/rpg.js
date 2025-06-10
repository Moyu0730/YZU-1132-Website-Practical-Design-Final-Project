// Const Variables
const gridFullWidth = $("#canvas-rpg").width();
const gridFullHeight = $("#canvas-rpg").height();
const gridWidth = $("#canvas-rpg").width() / 10;
const gridHeight = $("#canvas-rpg").height() / 10;

// Material Variables
var mapList;
var sources = {
    Obstacle: '../static/img/obstacle.png',
    NPC: '../static/img/npc.png',
    Coin: '../static/img/cup.png',
    Final: '../static/img/fish.png',
};

// Global Variables
var mapArray, ctx, currentImgMain, imgPlayer, currentMapIndex;
var images = {};
var playerBlock = {
    x: 0,
    y: 0,
    face: 0, //face: 0 - down, 1 - up, 2 - left, 3 - right
};

/********** API Handler **********/
async function get_map(){
    console.log("get_map() Called");

    try{
        const response = await fetch('/api/rpg/get_map', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if( !response.ok ) throw new Error('Network response was not ok');

        mapList = await response.json();
        // console.log("Map List:", mapList);
    }catch( error ){
        console.error('There was a problem with the fetch operation:', error);
    }
}

/******************** Initialize ********************/
$(async function() {
    console.log("Initialize Called");
    ctx = $("#canvas-rpg")[0].getContext("2d");
    ctx.canvas.width = $("#canvas-rpg").width();
    ctx.canvas.height = $("#canvas-rpg").height();

    await get_map();
    currentMapIndex = Math.floor(Math.random() * mapList.length);
    mapArray = mapList[currentMapIndex];
    console.log("Initialize Current Map Array:", mapArray);
    
    imgPlayer = new Image();
    imgPlayer.src = "../static/img/spriteSheet.png";
    currentImgMain = { x: 0, y: 0 };

    playerBlock = findPlayerStart(mapArray);
    playerBlock.face = 0; // face down
    currentImgMain.x = playerBlock.y * gridWidth;
    currentImgMain.y = playerBlock.x * gridHeight;

    imgPlayer.onload = function() {
        ctx.drawImage(imgPlayer, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
    };

    drawMapObjects();
    init_calendar();
    add_event("Game Started");
});

// Function to switch to the next map
function switchToNextMap() {
    console.log("switchToNextMap() Called");
    let nextIndex;

    do{
        nextIndex = Math.floor( Math.random() * mapList.length );
    }while( nextIndex == currentMapIndex );
    
    currentMapIndex = nextIndex;
    mapArray = mapList[currentMapIndex];
    playerBlock = findPlayerStart(mapArray);
    currentImgMain.x = playerBlock.y * gridWidth;
    currentImgMain.y = playerBlock.x * gridHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawMapObjects();
}

function loadImages( sources, callback ){
    console.log("loadImages() Called");

    var loadedImages = 0;
    var numImages = 0;

    for( var i in sources ) numImages++;
    for( var i in sources ){
        images[i] = new Image();

        images[i].onload = function(){
            if( ++loadedImages >= numImages ){
                callback(images);
            }
        };

        images[i].src = sources[i];
    }
}

function findPlayerStart( map ){
    console.log("findPlayerStart() Called");

    for( let x in map ){
        for( let y in map[x] ){
            if( map[x][y] == 1 ) return { x: Number(x), y: Number(y) };
        }
    }

    return { x: -1, y: -1 }; // Return an invalid position if not found
}

// Load all images first, then draw the map and main character
function drawMapObjects(){
    console.log("drawMapObjects() Called");
    console.log("Current Map Array:", mapArray);

    for( let x in mapArray ){
        for( let y in mapArray[x] ){
            console.log("Drawing at position:", x, y, "Value:", mapArray[x][y]);

            if( mapArray[x][y] == 2 ){    // final 
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Final, 0, 0, 165, 165 , y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }if(mapArray[x][y] == 3){    // npc
                loadImages(sources, function(images) {
                    ctx.drawImage(images.NPC, 0, -10, 160, 150, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }else if(mapArray[x][y] == 4){ // coin
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Coin, 0, -30, 180, 180, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            } else if(mapArray[x][y] == 5){ // obstacle
                loadImages(sources, function(images) {
                    ctx.drawImage(images.Obstacle, -10, -10, 165, 140, y * gridWidth, x * gridHeight, gridWidth, gridHeight);
                });
            }
        }
    }
}

// Function to switch to the next map
function switchToNextMap() {
    console.log("switchToNextMap() Called");

    let nextIndex;

    do{
        nextIndex = Math.floor( Math.random() * mapList.length );
    }while( nextIndex == currentMapIndex );
    
    currentMapIndex = nextIndex;
    mapArray = mapList[currentMapIndex];
    playerBlock = findPlayerStart(mapArray);
    currentImgMain.x = playerBlock.y * gridWidth;
    currentImgMain.y = playerBlock.x * gridHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawMapObjects();
}

/********** Keydown Event Handler **********/
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

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);

    if( targetBlock.x != -1 && targetBlock.y != -1 ){
        console.log("Target Block Value:", mapArray[targetBlock.x][targetBlock.y]);

        switch( mapArray[targetBlock.x][targetBlock.y] ){
            case 0: // available
            case 1: // available (player start)
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
                break;
            case 2: // Final stop
                ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
                switchToNextMap();
                add_day();
                break;
            case 3: // NPC
                $.post('/call_llm3', { context: "npc" })
                    .done(data => add_event(data))
                    .fail(error => add_event("ERROR : " + error.statusText));
                break;
            case 4: // coin
                currentImgMain.x = targetBlock.y * gridWidth;
                currentImgMain.y = targetBlock.x * gridHeight;
                playerBlock.x = targetBlock.x;
                playerBlock.y = targetBlock.y;
                ctx.clearRect(currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
                mapArray[targetBlock.x][targetBlock.y] = 0; // Remove coin from map
                add_event("Coin Collected")
                break;
            case 5: // Obstacle
                break;
            default:
                add_event("Unknown!");
        }
    }
    
    ctx.drawImage(imgPlayer, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridWidth, gridHeight);
});