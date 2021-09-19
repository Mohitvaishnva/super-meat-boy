    var PLAY = 1;
    var END = 0;
    var gameState = PLAY;
    var playerstop;
    var player , playerrightside;
    var ground, invisibleGround, groundImage;
    var coin,coinImage;
    var cloud1Image,cloud3Image,cloud2Image;
    var cloudsGroup, cloudImage;
    var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
    var background1,background2,background3,background4;
    var score=0;
    var coin=0;
    var gameOver, restart;
    var treasureImage;
    var pigeonimage;
    var fireimage ,obstacle;
    var fire;
    var fairyImage;
    var fairysound,coinsound,backgroundsound,firesound;
    var jumpsound,oversound,collectsound;
    var pigeonoverImage;
    var dragonImage;
    var groundsound;
   
    function preload(){
      playerrightside =   loadAnimation("images/boy4.png","images/boy5.png","images/boy6.png")
      playerleftside  =   loadAnimation("images/boy7.png","images/boy8.png","images/boy9.png")
      pigeonimage = loadAnimation("images/pigeon1.png","images/pigeon2.png","images/pigeon3.png","images/pigeon4.png","images/pigeon5.png")
      playerstop      = loadAnimation("images/boy6.png")
      fireimage = loadAnimation("images/fire1.png","images/fire2.png","images/fire3.png","images/fire4.png","images/fire5.png","images/fire6.png")
      coinImage       = loadImage("images/coin3.png")
      fairyImage = loadAnimation("images/fairyImage1.png","images/fairyImage2.png")
      dragonImage = loadAnimation("images/dragon1.png","images/dragon2.png","images/dragon3.png")
    background1 = loadImage("images/background.jpg")
    background2 = loadImage("images/background21.jpg")
    background3 = loadImage("images/background22.jpg")
    background4 = loadImage("images/background24.jpg")
    treasureImage   = loadImage("images/coinssss.png")
    groundImage = loadImage("images/ground25.jpg");
    pigeonoverImage = loadAnimation("images/pigeon4.png")
      cloud3Image = loadImage("images/cloud1.png");
      cloud1Image = loadImage("images/cloud2.png");
      cloud2Image = loadImage("images/cloud3.png");


      obstacle1 = loadImage("images/obstacle1.png");
      obstacle2 = loadImage("images/obstacle1.png");
      obstacle3 = loadImage("images/obstacle1.png");
      obstacle4 = loadImage("images/obstacle2.png");
      obstacle5 = loadImage("images/obstacle2.png");
      obstacle6 = loadImage("images/obstacle2.png");
      
      gameOverImg = loadImage("images/gameOver.png");
      restartImg  = loadImage("images/restart.png");
      coinsound = loadSound("images/coinsound.wav");
      firesound = loadSound("images/firesound.mp3")   
      fairysound = loadSound("images/fairysound.wav")
      backgroundsound = loadSound("images/groundsound.wav")
      jumpsound = loadSound("images/jump.wav")
      collectsound = loadSound("images/collect.wav")
      oversound = loadSound("images/over.wav")
      groundsound = loadSound("images/sound1.mp3")
    }

    function setup() {
      createCanvas(windowWidth,windowHeight);
      
      player  = createSprite(50,displayHeight-400,20,50);
      
      player .addAnimation("running", playerrightside);
      player .addAnimation("stop", playerstop);
      player .scale = 0.5;
       
    
      ground = createSprite(width/2,height,width,2);
      ground.addImage("ground",groundImage);
      groundsound.play();
      ground.scale =2;
      ground.x = width/2
      ground.velocityX = -(6 + 3*score/100);
    
      gameOver = createSprite(displayWidth/2,displayHeight/2-100);
      gameOver.addImage(gameOverImg);
      
      restart = createSprite(displayWidth/2,displayHeight/2-50);
      restart.addImage(restartImg);
      
      gameOver.scale = 1;
      restart.scale = 1;

      gameOver.visible = false;
      restart.visible = false;
      
      invisibleGround = createSprite(200,displayHeight-25,400,10);
      invisibleGround.visible = false;
      treasuresGroup =new Group();
      cloudsGroup = new Group();
      obstaclesGroup = new Group();
      coinsGroup = new Group();
      firesGroup = new Group();
      pigeonsGroup = new Group();
      fairysGroup = new Group();
      dragonsGroup = new Group();
      score = 0;
    }

    function draw() {
      
      background("skyblue");
      textSize(45)
      text("Score: "+ score, 20,50);
      text("Coins: "+ coin, 20,100);
      
      
      if (gameState===PLAY){
        ground.velocityX = -(6 + 3*score/100);
    
    player.bounceOff(treasuresGroup);
    
        if (ground.x < 750){
          ground.x = ground.width;
        }
      
        score = score + Math.round(getFrameRate()/60);
      
        if(keyDown("space") && player .y >= 400) {
          jumpsound.play();
          player .velocityY = -20;
        }
      
      player .velocityY = player .velocityY + 0.8
      
                                                              
        player .collide(invisibleGround);

        if(coinsGroup.isTouching(player)){
        coinsound.play();
          coinsGroup.destroyEach();
          coin+=1;
          
        }
        if(fairysGroup.isTouching(player)){
          fairysound.play();
          fairysGroup.destroyEach();
          coin+=100;   
        }
      
        if(player.isTouching(treasuresGroup)){
        treasuresGroup.destroyEach();
        collectsound.play();
        coin+=50;
        }
        
        if(player.isTouching(firesGroup)){ 
          firesGroup.destroyEach();
          firesound.play();
        }
        spawndragons();
        spawnClouds();
        spawnObstacles();
        spawnCoins();
        keyPressed();
        spawntreasures();
        spawnpigeon();                                                                                                
      
        spawnfairy();
    
      if(obstaclesGroup.isTouching(player )){
        oversound.play();
    gameState =END
        }
        if(dragonsGroup.isTouching(player )){
          oversound.play();
        gameState =END 
        }

      }
      else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        
        
        ground.velocityX = 0;
        player .velocityY = 0;
        player.changeAnimation("stop");
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        coinsGroup.setVelocityXEach(0);
        firesGroup.setVelocityXEach(0);
        pigeonsGroup.setVelocityXEach(0);
        treasuresGroup.setVelocityXEach(0);
        fairysGroup.setVelocityXEach(0);
        dragonsGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        treasuresGroup.setLifetimeEach(-1);
        treasuresGroup.setLifetimeEach(-1);
        fairysGroup.setLifetimeEach(-1);
        groundsound.stop();
        if(mousePressedOver(restart)) {
        groundsound.play();
          reset();
        }
      }
      
      
      drawSprites();
    }

    function spawnClouds() {
      if (frameCount % 120 === 0) {
        var cloud = createSprite(width,120,40,10);
        cloud.y = Math.round(random(50,200));
      var A = Math.round(random(1,3))
      switch(A){
        case 1 : cloud.addImage(cloud1Image)
      
          break;
          case 2 : cloud.addImage(cloud2Image)
          
          break;
          case 3 : cloud.addImage(cloud3Image)
        
          break;
      }
        cloud.scale = 1.9;
        cloud.velocityX = -3;
        
        cloud.lifetime = 800;
        
        cloud.depth = player .depth;
        player .depth = player .depth + 1;
        
        cloudsGroup.add(cloud);
      }
      
    }

    function spawnObstacles() {
      if(frameCount % 150 === 0) {
        obstacle = createSprite(width,displayHeight-90,5,5);
        obstacle.velocityX = -(6 + 3*score/100);
        
        var rand = Math.round(random(1,6));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                  break;
          case 3: obstacle.addImage(obstacle3);
                  break;
          case 4: obstacle.addImage(obstacle4);
                  break;
          case 5: obstacle.addImage(obstacle5);
                  break;
          case 6: obstacle.addImage(obstacle6);
                  break;
          default: break;
        }
        
        obstacle.scale = 0.2;
        obstacle.lifetime = 800;
        obstaclesGroup.add(obstacle);
      }
    }

    function reset(){
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
      if (ground.x < 200){
        ground.x = ground.width/2;
      }
      pigeonsGroup.destroyEach();
      firesGroup.destroyEach();
      treasuresGroup.destroyEach();
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      coinsGroup.destroyEach();
      fairysGroup.destroyEach();
      dragonsGroup.destroyEach();
      player .changeAnimation("running",playerrightside)
      
      score = 0;
      
    }

    function spawnCoins() {
      if (frameCount % 210 === 0) {
        var coin = createSprite(width,200);
        coin.y = Math.round(random(100,500));
        coin.addImage(coinImage);
        coin.scale = 0.4;
        coin.velocityX = -(3+ score/100);
        
        coin.depth = player .depth;
        player .depth = player .depth + 1;
        
        coinsGroup.add(coin);
      }
      
    }

    function spawnbackground() {
      if (frameCount % 10 === 0) {
        var ground = createSprite(750,300,2050,2050);
        ground.y = Math.round(random(50,200));
        var K = Math.round(random(1,4))

      switch(K){
        case 1 : ground.addImage(background1)
          break;
          case 2 : ground.addImage(background2)
          
          break;
          case 3 : ground.addImage(background3)
        
          break;
          case 4 : ground.addImage(background4)
        
          break;
      }
        
      }
      
    }

    function keyPressed() {

      if(keyDown("LEFT_ARROW")){
        player .addAnimation("running", playerleftside);

        player.X=player-4;
        player.velocityY=0;
        }
        
        if(keyDown("RIGHT_ARROW")){
          player .addAnimation("running", playerrightside);

        player.X=player+4;
        player.velocityY=0;
        }
      }
      

    function spawntreasures() {
      if (frameCount % 1000 === 0) {
        var treasure = createSprite(width,displayHeight-120,5,5);
      treasure.y = Math.round(random(50,height-250));
        treasure.addImage(treasureImage);
        treasure.scale = 0.5;
        treasure.velocityX = -(3+ score/100);
        
        
        treasure.depth = player .depth;
        player .depth = player .depth + 1;
        
        treasuresGroup.add(treasure)
      }
      
    }
    function spawnpigeon(){
      if(frameCount%200 ===0){
        var pigeon = createSprite(width,Math.round(random(10,100)),50,50);
        pigeon.addAnimation("pigeon",pigeonimage);
        pigeon.velocityX = -(3+ score/100);
        pigeon.scale = 0.5;
        pigeonsGroup.add(pigeon)
        
      }
    }

    function destroy(sprite){
      sprite = null;

    }

    function spawnfairy(){
      if(frameCount%1500 ===0){
        
        var fairy = createSprite(width,200);
        fairy.y = Math.round(random(100,500));
        fairy.addAnimation("fire",fairyImage);
        fairy.velocityX = -(3+ score/100);
        fairy.scale = 0.3;
      fairysGroup.add(fairy) 
      }
    }

    function spawndragons() {

      if (frameCount % 500 === 0) {
      
        dragon = createSprite(width,displayHeight-90,5,5);
      dragon.y = Math.round(random(50,height-200));
      dragon .addAnimation("dragon", dragonImage);
      dragon.scale = 4;
      dragon.velocityX = -(7+ score/100);
        
        
        dragon.depth = player .depth;
        player .depth = player .depth + 1;
        
        dragonsGroup.add(dragon)

      }
      
      }