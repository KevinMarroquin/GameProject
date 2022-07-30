
class Button{
    constructor(x, y, width, height, r, g, b) {
        this.xPos = x;
        this.yPos = y;
        this.width = width;
        this.height = height;
        this.red = r;
        this.green = g;
        this.blue = b;
    }
}

class Enemy{
    constructor(x, y, width, height, speed, image) {
        //enemy position
        this.XPos = x;
        this.YPos = y;

        //enemy size
        this.width = width;
        this.height = height;

        //enemy color
        this.speed = speed;
        this.animal = image;
    }
}

let myXPos = 400;  
let myYPos = 400;


// Boarders/ hitboxes
let myLeft, myRight, myTop, myBottom; //Your charater's boarders
let enemyLeft, enemyRight, enemyTop, enemyBottom; //enemy's boarders

let lost;

//Homescreen buttons
let button1;
let button2;
let button3;

let state = 1;

let endScreen = 0;
// Score & time

let score = -2;

let timerTime = 3;

//Images 
let animals = [];
let enemyArray = [];

let house;
let house1;
let house2;
let backgroundImage;
let human;
let humanFlip;

let characterOrientation;

// Sounds
let meow;
let bark;
let grunt;
let scream;
let rain;
let hit;
let go;
let song;
let click;
let gameover;

// Cloud
function cloud (x, y, size, color) {
    fill(color);
    circle (x - size/2, y - 10, size);
    circle (x, y, size);
    circle (x + size/2, y - 10, size);
}
//Countdown timer
function timeIt() {
    if (state == 1) {
        timerTime = 3
    }
    else if (timerTime > 0) {
        click.play();
        timerTime--;
    }
    else if (timerTime == 0) {
        go.play();
        timerTime--;
    }
}

// Score timer
function scoreIt() {
    if (state != 1 && timerTime <= 0 && endScreen == 0) {
        score++;
    }
    else if (endScreen == 1) {
        
    }
}

//sound intervals

function playSong () {
    if (state !=1 && endScreen == 0) {
        song.play();
    }
    else {

    }
}
function playRain () {
    if (state == 1 || endScreen == 1) {
    rain.play();
    }
    else if (state != 1 && state!= 5) {
        rain.pause();
    }
}

function playMeow () {
    if (endScreen == 0 && state != 1) {
        meow.play();
    }
}

function playBark () {
    if (endScreen == 0 && state != 1) {
        bark.play();
    }
}

function playScream () {
    if (endScreen == 0 && state != 1) {
        scream.play();
    }
}

function playGrunt () {
    if (endScreen == 0 && state != 1) {
        grunt.play();
    }
}

function preload() {
    //images
    for (let i = 0; i < 4; i++) {
        animals[i] = loadImage("images/animal" + i + ".png");
    }
    house = loadImage("images/house.png")
    house1 = loadImage("images/house1.png")
    house2 = loadImage("images/house2.png")
    human = loadImage("images/screaming_man.png");
    humanFlip = loadImage("images/screaming_flip.png");
    backgroundImage = loadImage("images/background.png");

    //sounds
    rain = loadSound("sounds/rain.mp3");
    bark = loadSound("sounds/bark.mp3");
    meow = loadSound("sounds/meow.mp3");
    scream = loadSound("sounds/scream.mp3");
    grunt = loadSound("sounds/grunt.mp3");
    hit = loadSound("sounds/hit.mp3");
    go = loadSound("sounds/go.mp3");
    song = loadSound("sounds/song.mp3");
    click = loadSound("sounds/click.mp3");
    gameover = loadSound("sounds/gameover.mp3");
}


// }
function setup() {
    createCanvas(500, 500);
    background(0);
    
    //sounds
    rain.play();
    setInterval(timeIt, 1000);
    setInterval(scoreIt, 1000);
    setInterval(playRain, 70000);
    setInterval(playMeow, 9000);
    setInterval(playBark, 12000);
    setInterval(playGrunt, 15000);
    setInterval(playScream, 19000);
    setInterval(playSong,130000)

    noStroke();

    rectMode(CENTER);
    imageMode(CENTER);
    textAlign(CENTER);

    characterOrientation = human; 

    //Homescreen buttons
    button1 = new Button(250, 200, 75, 25, 0, 0, 255);
    button2 = new Button(250, 250, 75, 25, 0, 0, 255);
    button3 = new Button(250, 300, 75, 25, 0, 0, 255);

    //Enemies
    for (let i = 0; i < 6; i++) {
        let currentEnemy = new Enemy(random(0, 500), random (0, - 1000), 40, 40, random(2, 4), random(animals))
        enemyArray.push(currentEnemy);
    }
}


function draw() {
    background(56, 91,181);

    // Homescreen
    if ( state == 1) {
        fill (button1.red, button1.green, button1.blue);
        rect (button1.xPos, button1.yPos, button1.width, button1.height, button1.opacity);

        fill (button2.red, button2.green, button2.blue);
        rect (button2.xPos, button2.yPos, button2.width, button2.height, button2.opacity);

        fill (button3.red, button3.green, button3.blue);
        rect (button3.xPos, button3.yPos, button3.width, button3.height, button3.opacity);

        fill(255);
        text("Easy", button1.xPos, button1.yPos + 7, button1.width, button1.height);
        text("Medium", button2.xPos, button2.yPos + 7, button2.width, button2.height);
        text("Hard", button3.xPos, button3.yPos + 7, button3.width, button3.height);
        
    }

    // Easy mode
    if ( state == 2) {

        // Background
        image(backgroundImage, 250, 250, 500, 500)
        fill(172);
        rect(250, 350, 500, 50);
        fill(100);
        rect(250, 380, 500, 10);
        image(house1, 0, 280, 150, 150);
        image(house2, 160, 280, 150, 150);
        image(house, 320, 280, 150, 150);
        image(house1,480, 280, 150, 150);

        //clouds
        cloud(0, 0, 70, 70);
        cloud(200, 0, 70, 30);
        cloud(400, 0, 70, 90);
        cloud(450, 0, 70, 100);
        cloud(300, 10, 70, 150);
        cloud(100, 10, 70, 120);

        // Arrow key controls & Character Orientation
        image(characterOrientation, myXPos, myYPos, 50, 50);

        if (keyIsDown(LEFT_ARROW)) { 
            myXPos -= 3;
            characterOrientation = humanFlip;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            myXPos += 3;
            characterOrientation = human;
        }
        //Timer

        if (timerTime >= 0) {
            fill(255);
            textSize(100);
            text(timerTime, 250, 250);
        }

        if (timerTime < 0) {
            //Falling enemies
            for (let i = 0; i < enemyArray.length; i++) {

                //image determination of enemies
                image(enemyArray[i].animal, enemyArray[i].XPos, enemyArray[i].YPos, enemyArray[i].width, enemyArray[i].height);
                enemyArray[i].YPos += enemyArray[i].speed;

                if (enemyArray[i].YPos > 525) {
                    enemyArray[i].YPos = random(- 25, -250);
                    enemyArray[i].XPos = random(500);
                }

                // Character borders
                myLeft = myXPos - 25;
                myRight = myXPos + 25;
                myTop = myYPos - 25;
                myBottom = myYPos + 25;

                // Restrictions so that the character can't go off the screen
                if (myLeft < 0 ) {
                    myXPos = 25;
                }

                if (myRight > 500) {
                    myXPos = 475;
                }
            
                // hit detection
                enemyLeft = enemyArray[i].XPos - (enemyArray[i].width / 2);
                enemyRight = enemyArray[i].XPos + (enemyArray[i].width / 2);
                enemyTop = enemyArray[i].YPos - (enemyArray[i].height / 2);
                enemyBottom = enemyArray[i].YPos + (enemyArray[i].height / 2);

                if (myLeft > enemyRight || myRight < enemyLeft || myBottom < enemyTop || myTop > enemyBottom){
            
                }

                //Game Over
                else {
                    gameover.play();
                    grunt.play();
                    endScreen = 1;
                    restart = state
                    state = 0;
                }

                //Score
                fill(255);
                textSize(20);
                text("Score: " + score, 50, 30);
            }
        } 
    }

    // Medium mode
    if (state == 3) {
        // Background
        image(backgroundImage, 250, 250, 500, 500)
        fill(172);
        rect(250, 350, 500, 50);
        fill(100);
        rect(250, 380, 500, 10);
        image(house1, 0, 280, 150, 150);
        image(house2, 160, 280, 150, 150);
        image(house, 320, 280, 150, 150);
        image(house1,480, 280, 150, 150);

        //clouds
        cloud(0, 0, 70, 70);
        cloud(200, 0, 70, 30);
        cloud(400, 0, 70, 90);
        cloud(450, 0, 70, 100);
        cloud(300, 10, 70, 150);
        cloud(100, 10, 70, 120);

        // Arrow key controls & Character Orientation
        image(characterOrientation, myXPos, myYPos, 50, 50);

        if (keyIsDown(LEFT_ARROW)) { 
            myXPos -= 3;
            characterOrientation = humanFlip;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            myXPos += 3;
            characterOrientation = human;
        }
        //Timer

        if (timerTime >= 0) {
            fill(255);
            textSize(100);
            text(timerTime, 250, 250);
        }

        if (timerTime < 0) {

            //Falling enemies
            for (let i = 0; i < enemyArray.length; i++) {

                //image determination of enemies
                image(enemyArray[i].animal, enemyArray[i].XPos, enemyArray[i].YPos, enemyArray[i].width, enemyArray[i].height);
                enemyArray[i].YPos += enemyArray[i].speed;

                if (enemyArray[i].YPos > 525) {
                    enemyArray[i].YPos = random(- 25, -250);
                    enemyArray[i].XPos = random(500);
                }

                // Character borders
                myLeft = myXPos - 25;
                myRight = myXPos + 25;
                myTop = myYPos - 25;
                myBottom = myYPos + 25;

                // Restrictions so that the character can't go off the screen
                if (myLeft < 0 ) {
                    myXPos = 25;
                }

                if (myRight > 500) {
                    myXPos = 475;
                }
            
                // hit detection
                enemyLeft = enemyArray[i].XPos - (enemyArray[i].width / 2);
                enemyRight = enemyArray[i].XPos + (enemyArray[i].width / 2);
                enemyTop = enemyArray[i].YPos - (enemyArray[i].height / 2);
                enemyBottom = enemyArray[i].YPos + (enemyArray[i].height / 2);

                if (myLeft > enemyRight || myRight < enemyLeft || myBottom < enemyTop || myTop > enemyBottom){
            
                }
        
                else {
                    gameover.play();
                    grunt.play();
                    endScreen = 1;
                    restart = state
                    state = 0;
                }

                //Score
                fill(255);
                textSize(20);
                text("Score: " + score, 50, 30);
            }
        } 
    }
    //Hard mode
    if (state == 4) {
        // Background
        image(backgroundImage, 250, 250, 500, 500)
        fill(172);
        rect(250, 350, 500, 50);
        fill(100);
        rect(250, 380, 500, 10);
        image(house1, 0, 280, 150, 150);
        image(house2, 160, 280, 150, 150);
        image(house, 320, 280, 150, 150);
        image(house1,480, 280, 150, 150);

        //clouds
        cloud(0, 0, 70, 70);
        cloud(200, 0, 70, 30);
        cloud(400, 0, 70, 90);
        cloud(450, 0, 70, 100);
        cloud(300, 10, 70, 150);
        cloud(100, 10, 70, 120);

        // Arrow key controls & Character Orientation
        image(characterOrientation, myXPos, myYPos, 50, 50);

        if (keyIsDown(LEFT_ARROW)) { 
            myXPos -= 3;
            characterOrientation = humanFlip;
        }
    
        if (keyIsDown(RIGHT_ARROW)) {
            myXPos += 3;
            characterOrientation = human;
        }
        //Timer
    
        if (timerTime >= 0) {
            fill(255);
            textSize(100);
            text(timerTime, 250, 250);
        }
    
        if (timerTime < 0) {
        
            //Falling enemies
            for (let i = 0; i < enemyArray.length; i++) {
    
                //image determination of enemies
                image(enemyArray[i].animal, enemyArray[i].XPos, enemyArray[i].YPos, enemyArray[i].width, enemyArray[i].height);
                enemyArray[i].YPos += enemyArray[i].speed;

                if (enemyArray[i].YPos > 525) {
                    enemyArray[i].YPos = random(- 25, -250);
                    enemyArray[i].XPos = random(500);
                }
    
                // Character borders
                myLeft = myXPos - 25;
                myRight = myXPos + 25;
                myTop = myYPos - 25;
                myBottom = myYPos + 25;
    
                // Restrictions so that the character can't go off the screen
                if (myLeft < 0 ) {
                    myXPos = 25;
                }
    
                if (myRight > 500) {
                    myXPos = 475;
                }
                
                // hit detection
                enemyLeft = enemyArray[i].XPos - (enemyArray[i].width / 2);
                enemyRight = enemyArray[i].XPos + (enemyArray[i].width / 2);
                enemyTop = enemyArray[i].YPos - (enemyArray[i].height / 2);
                enemyBottom = enemyArray[i].YPos + (enemyArray[i].height / 2);
    
                if (myLeft > enemyRight || myRight < enemyLeft || myBottom < enemyTop || myTop > enemyBottom){
                
                    }
            
                //Game Over
                else {
                    gameover.play();
                    grunt.play();
                    endScreen = 1;
                    restart = state
                    state = 0;
                }
                //Score
                fill(255);
                textSize(20);
                text("Score: " + score, 50, 30);
            }
        } 
    }
    // Game Over screen
    if (endScreen == 1) {
        background(56, 91, 181);
        song.pause();
        textSize(100);
        text("Game", 250, 150);
        text("Over", 250, 250);

        fill(random(100, 256), random(100, 256), random(100, 256));
        textSize(20);
        text("Score: " + score, 250, 350);

        fill(0);
        rect(250, 375, 110, 25);
        fill(255, 220, 70);
        text("Main menu", 250, 380)

        fill(0);
        rect(250, 402, 80, 22 )
        fill(255, 0, 0);
        text("Restart", 250, 410 )
    }
}

function mouseClicked() {
    if (state == 1) {
        if (mouseX > button1.xPos - button1.width / 2 && mouseX < button1.xPos + button1.width / 2 && mouseY > button1.yPos - button1.height / 2 && mouseY < button1.yPos + button1.height / 2) {
            click.play();
            rain.pause();
            song.play();
            state = 2;
        }
        if (mouseX > button2.xPos - button2.width / 2 && mouseX < button2.xPos + button2.width / 2 && mouseY > button2.yPos - button2.height / 2 && mouseY < button2.yPos + button2.height / 2) {
            click.play();
            rain.pause();
            song.play();
            state = 3;
        }
        if (mouseX > button3.xPos - button3.width / 2 && mouseX < button3.xPos + button3.width / 2 && mouseY > button3.yPos - button3.height / 2 && mouseY < button3.yPos + button3.height / 2) {
            click.play();
            rain.pause();
            song.play();
            state = 4;
        }
    }

    if (endScreen == 1) {
        if (mouseX > 195 && mouseX < 305 && mouseY > 362.5 && mouseY < 412.5) {
            state = 1;
            endScreen = 0;
            lost = 0;
        }
        if (mouseX > 210 && mouseX < 290 && mouseY > 391 && mouseY < 413) {
            endScreen = 0;
            state = restart;
            lost = 0
            
        }
    }
}