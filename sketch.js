var trex,trex_running;
var ground,groundimg 
var invisibleground;
var cloud,cloudgroup,cloudImg
var score=0
var obstacle,ob1,ob2,ob3,ob4,ob5,ob6,obstaclegroup;
var PLAY=1
var END=0
var gamestate=PLAY
var trexcollided
var gameOverimg,gameOver,restart,restartimg
var jumpSound,dieSound,pointSound
    
function preload(){   trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimg=loadImage("ground2.png")
  cloudImg=loadImage("cloud.png")
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")  
  trexcollided=loadAnimation("trex_collided.png")
  gameOverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart 2.png")
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  pointSound=loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200)
  obstaclegroup=new Group();
  cloudgroup=new Group();
  trex=createSprite(50,160,20,50)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trexcollided)
  trex.scale=0.6
  //trex.debug=true  
  trex.setCollider("circle",0,0,45)
  
  
  ground=createSprite(200,180,700,20) 
  ground.addImage("ground",groundimg)
  
  invisibleground=createSprite(200,190,700,10)
  invisibleground.visible=false
  edges=createEdgeSprites()
console.log("Hello "+"People Of The World!")
gameOver=createSprite(300,100)
gameOver.addImage(gameOverimg)
gameOver.scale=0.7
restart=createSprite(300,140)
restart.addImage(restartimg)
restart.scale=0.03
}

function draw(){
  background("white")
  textSize(20)
  text("Score="+score,450,50)
  
  //console.log(trex.y)
  if(gamestate===PLAY){
  gameOver.visible=false
  restart.visible=false
  ground.velocityX=-2-score/200 
  score=score+Math.round(frameCount/60)
    if(score>0 && score%500===0){
      pointSound.play()
    }
  if(keyDown("space") && trex.y>=95){
    trex.velocityY=-8
    jumpSound.play()
  }
  if(ground.x<0){
    ground.x=ground.width/2 
  }
  
  trex.velocityY=trex.velocityY+0.5
  spawnclouds();
  spawnobstacles();
  if(obstaclegroup.isTouching(trex)){
    gamestate=END
    dieSound.play()
  }
  }
  else if(gamestate===END){
  gameOver.visible=true
  restart.visible=true
  ground.velocityX=0
  trex.changeAnimation("collided",trexcollided)
  obstaclegroup.setVelocityXEach(0)
  cloudgroup.setVelocityXEach(0)
  obstaclegroup.setLifetimeEach(-1)
  cloudgroup.setLifetimeEach(-1)
     if(mousePressedOver(restart)){
    reset()
  }
  }

  trex.collide(invisibleground)
  
  drawSprites()
}
function spawnobstacles(){
if(frameCount%60===0){

obstacle=createSprite(600,165,10,40)
obstacle.velocityX=-6-score/200
var r=Math.round(random(1,6))
switch(r){
case 1:obstacle.addImage(ob1)
break;
case 2:obstacle.addImage(ob2)
break;
case 3:obstacle.addImage(ob3)
break;
case 4:obstacle.addImage(ob4)
break;
case 5:obstacle.addImage(ob5)
break;
case 6:obstacle.addImage(ob6)
break;
}
obstacle.scale=0.6  
obstacle.lifetime=150
obstaclegroup.add(obstacle);
}
}
function spawnclouds(){
if(frameCount%60===0){
  cloud=createSprite(600,100,40,10)
  cloud.y=Math.round(random(10,60))
  cloud.addImage(cloudImg)
  cloud.scale=0.8
  cloud.velocityX=-3;
  cloud.lifetime=200
  cloud.depth=trex.depth
  trex.depth=trex.depth+1
  cloudgroup.add(cloud);}
}

function reset(){
  gamestate=PLAY
  gameOver.visible=false
  restart.visible=false
  obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
  trex.changeAnimation("running",trex_running)
  score=0
}