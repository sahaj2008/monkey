var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var position
var SurvivalTime
function preload(){
  
  
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(400,400);
  monkey=createSprite(100,260,20,0.5)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1

  ground=createSprite(100,300,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
 
  // create Obstacle and banana groups
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
 
}


function draw() {
background("white")
if(ground.x<0){
ground.x=ground.width/2;
}
  if(keyDown("space")&& monkey.y >= +100 ) {
    monkey.velocityY = -13;
    
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground)
 
  spawnFood();
  spawnObstacles();
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    }
  drawSprites();
  
      
if(obstacleGroup.isTouching(monkey)){
   fill("maroon");
    textSize(50);
    text("Game Over!",50,160);
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
}

  fill("black");
  stroke("black");
  textSize(20);
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);     
    
}   
  

   
  

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
     banana.addImage(bananaImage);
     banana.scale=0.05;
     FoodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,270,10,40);
    obstacle.velocityX = -6;
     obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
     obstacle.lifetime = 300;
     obstacleGroup.add(obstacle);
  }
}



