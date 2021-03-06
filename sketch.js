var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var bullets=70,bullet;
var gameState = "fight";
var bulletsGroup;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
heart1Img = loadImage("assets/heart_1.png")
heart2Img = loadImage("assets/heart_2.png")
heart3Img = loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = .5
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
heart1=createSprite(displayWidth-150,40,20,20)
heart1.addImage("heart1",heart1Img);
heart1.visible=false;
heart1.scale = 0.4

heart2=createSprite(displayWidth-100,40,20,20)
heart2.addImage("heart2",heart2Img);
heart2.visible=false;
heart2.scale = 0.4

heart3=createSprite(displayWidth-150,40,20,20)
heart3.addImage("heart3",heart3Img);

heart3.scale = 0.4
bulletsGroup=new Group();
zombieGroup=new Group();
}

function draw() {
  background(0); 


if (gameState==="fight"){



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("W")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("S")||touches.length>0){
 player.y = player.y+30
}
 if(keyDown("A")||touches.length>0){
  player.x = player.x-30
 }
  if(keyDown("D")||touches.length>0){
    player.x = player.x +30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  bullet=createSprite(displayWidth-1150,player.y-30,20,10);
  bullet.velocityX = 20;
  bulletsGroup.add(bullet);

  player.depth = bullet.depth
  player.depth = player.depth+2

  player.addImage(shooter_shooting)
  bullets -=1;
 

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  
  player.addImage(shooterImg)
 
}

if (bullets ===0){
  gameState = "bullets"
}

if (zombieGroup.isTouching(bulletsGroup)){

  for(var i=0;i<zombieGroup.length; i++)
  {

    if(zombieGroup[i].isTouching(bulletsGroup))
    {
      zombieGroup[i].destroy();
      bulletsGroup.destroyEach();
    }
  
  }
}
if (zombieGroup.isTouching(player)){
  
  for(var i=0;1<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      
    }
  }
}}
enemy();
drawSprites();
if (gameState === "lost")
{
  textSize(100);
  fill("yellow");
  text("You Lost",400,400);
  zombieGroup.destroy();
  player.destroy();

  
}
else if(gameState ==="won"){
  textSize(100);
  fill("yellow");
  text("Your won",400,400);
  zombieGroup.destroy();
  player.destroy();
}
else if(gameState === "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}
}


function enemy(){
if (frameCount%60===0){
  zombie = createSprite(random(2000,1100),random(100,500),40,40);
  zombie.addImage(zombieImg)
  zombie.scale = .15
  zombie.debug = true
  zombie.setCollider("rectangle",0,0,400,400)
  zombie.velocityX = -7
  zombie.lifetime = 400
  zombieGroup.add(zombie)
}


}