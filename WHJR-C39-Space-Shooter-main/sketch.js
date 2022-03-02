var p1, p2, asteroid1, asteroid2, asteroid3;
var blast, blastImage, space, spaceImage;
var spaceShip, spaceShipImage, laserImage;
var laser, asteroidGroup, laserGroup;
var explosionSound, laserSound;

var shoot = 0;
var score = 0;
var instruction = 0;
var play = 1;
var end = 2;

var gameState = instruction;
var endline, canvas;


function preload() {
  spaceImage = loadImage("images/space.png");
  spaceShipImage = loadImage("images/spaceship.png");
  laserImage = loadImage("images/laser.png");
  asteroid1 = loadImage("images/as1.png");
  asteroid2 = loadImage("images/as2.png");
  asteroid3 = loadImage("images/as3.png");
  blastImage = loadImage("images/blast.png");
  explosionSound = loadSound("sounds/explosion.mp3");
  laserSound = loadSound("sounds/laser sound.mp3");
}

function setup() {
  canvas = createCanvas(1000, 700);
  space = createSprite(250, 350, 30, 20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score / 10);

  spaceShip = createSprite(250, 600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;

  p1 = createSprite(250, 600);
  p1.setCollider("rectangle", 70, -27, 5, 265, 156);
  p1.visible = false;
  p2 = createSprite(250, 600);
  p2.setCollider("rectangle", -70, -27, 5, 265, 24);
  p2.visible = false;

  asteroidGroup = new Group;
  laserGroup = new Group;

  endline = createSprite(250, 700, 500, 5);
  endline.visible = false;
}

function draw() {
  background(0);

  if (gameState === play) {

    if (space.y > 800) {
      space.y = 300;
    }

    shoot -= 1;

    if (keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x, spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8;
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      shoot = laser.y;
    }

    if (keyDown("right") && spaceShip.x < 1000) {
      spaceShip.x += 10;
      p1.x += 10;
      p2.x += 10;
    }

    if (keyDown("left") && spaceShip.x > 50) {
      spaceShip.x -= 10;
      p1.x -= 10;
      p2.x -= 10;
    }

    if (asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x, spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }

    if (asteroidGroup.isTouching(laserGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score += 1;
    }

    asteroids();
    drawSprites();

    stroke("white");
    fill("white");
    textSize(30);
    text("Score : " + score, 210, 60)

    if (asteroidGroup.isTouching(endline)) {
      asteroidGroup.destroyEach();
      gameState = end;
    }

  }

  else if (gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!", canvas.width / 2 - 400, canvas.height / 3);
    text("The asteroids destroyed the planet", canvas.width / 2 - 400, canvas.height / 3 + 100);
    text("Your final score:" + score, canvas.width / 2 - 400, canvas.height / 3 + 200);
  }

  if (gameState === instruction) {
    stroke("white");
    fill("white");
    textFont("trebuchetMS")
    textSize(50);
    text("------SPACE SHOOTERS------", canvas.width / 2 - 300, canvas.height / 2 - 300);
    text("ENJOY THE GAME!", canvas.width / 2 - 300, canvas.height / 2 + 100);
    stroke("yellow");
    fill("yellow");
    textSize(35);
    textFont("Apple Chancery");
    text("Year 2500 .....", canvas.width / 2 - 300, canvas.height / 2 - 250);
    text(" Some asteroids are coming towords Earth.", canvas.width / 2 - 300, canvas.height / 2 - 210);
    text("    You are a space fighter.", canvas.width / 2 - 300, canvas.height / 2 - 170);
    text("    Help the people and Earth !", canvas.width / 2 - 300, canvas.height / 2 - 130);
    text("    Press 'space' to shoot.", canvas.width / 2 - 300, canvas.height / 2 - 90);
    text("    Use right and left arrows to move.", canvas.width / 2 - 300, canvas.height / 2 - 50);
    text("    Press 's' to start game.", canvas.width / 2, canvas.height / 2 - 10);

    if (keyDown("s")) {
      gameState = play;
    }
  }
}


function asteroids() {
  if (frameCount % 110 === 0) {

    var asteroid = createSprite(Math.round(random(50, 1050)), -20);
    asteroid.velocityY = (6 + score / 10);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.3, 0.5);

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: asteroid.addImage(asteroid1);
        asteroid.setCollider("circle", -80, 10, 160);
        break;
      case 2: asteroid.addImage(asteroid2);
        asteroid.setCollider("circle", 50, 0, 150);
        break;
      case 3: asteroid.addImage(asteroid3);
        asteroid.setCollider("circle", 0, 0, 170)
      default: break;
    }

    asteroidGroup.add(asteroid);
  }
}