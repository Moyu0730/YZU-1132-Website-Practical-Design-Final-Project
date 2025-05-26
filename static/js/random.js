// generate a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


                        /*
                           .......example usage...........
                            console.log(getRandomInt(1, 100));
                                                                */