var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,10,30)
  ghost.addImage('ghost',ghostImg);
  ghost.scale = 0.5
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisGroup = new Group()
}

function draw() {
  
  background(200);
  spookySound.loop();
  
if(gameState == 'play'){
  if(keyDown('space')){
    ghost.velocityY = -5
  }

if(keyDown('LEFT_ARROW')){
  ghost.x = ghost.x - 2
}

if(keyDown('RIGHT_ARROW')){
  ghost.x = ghost.x + 2
}
spawnDoors()
if(invisGroup.isTouching(ghost)){
  gameState = 'end'
} 
ghost.velocityY = ghost.velocityY + 0.5
if(tower.y > 400){
    tower.y = 300
  }
 drawSprites()
}

  

if(gameState == 'end'){
  fill('black')
  textSize(30)
  text('GAME OVER', 300,300)

}

  



  

}

function spawnDoors(){
  if(frameCount % 200 === 0){
    var doors = createSprite(Math.round(random(120,400)),-50)
    var climbers = createSprite(200,10)
    var invis = createSprite(200,10)
    doors.addImage('doors',doorImg)
    climbers.addImage('climbers',climberImg)
    doors.velocityY = 3
    climbers.velocityY = 3
    climbers.x = doors.x
    invis.velocityY = 3
    invis.visible = false
    invis.x = doors.x

    ghost.depth = doors.depth
    ghost.depth = ghost.depth + 1

    doors.lifetime = 700
    climbers.lifetime = 700
    invis.lifetime = 700

    doorsGroup.add(doors)
    climbersGroup.add(climbers)
    invisGroup.add(invis) 
    
  }

}