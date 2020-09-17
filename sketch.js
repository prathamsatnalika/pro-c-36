//Create variables here
var dog, happyDog,dog_anime,happydog_anime;
var  database;
var foodS, foodStock;
var  milk,milk_anime;
var feed,addFood;
var lastFed,time;


//var hurryup = "Hurry Up! Only some Milk is left"
var hurryup;    

function preload(){
  //load images here
  dog_anime = loadImage("dogImg.png");
  happydog_anime = loadImage("dogImg1.png");
  garden=loadImage("Garden.png");
  washroom=loadImage("WashRoom.png");
  bedroom=loadImage("BedRoom.png");
}




function setup() {
	createCanvas(1100,400);
   
  dog = createSprite(600,200,30,40);
  dog.addImage(dog_anime);
  dog.scale = 0.3;
  
  /*milk = createSprite(200,200,1,1);
  milk.addImage(milk_anime);
  milk.scale = 0.1;
  milk.visible = false;
  */

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  lastFed = database.ref('lastFed');
  lastFed.on("value",(data)=>{
    time = data.val();
  })

  textFont('Georgia')
  feed = createButton("Feed Drago");
  feed.position(960,95);
  feed.mousePressed(feedDog);

  textFont('Georgia')
  addFood = createButton("Add Food");
  addFood.position(860,95);
  addFood.mousePressed(addFoods);

  food = new Food();
}


function draw() {  
background(46,139,87)


food.display();

if(foodS > 5) {

  hurryup =  "Awesome! Drago is happy",720,100
} else {
      hurryup = "Hurry Up! Only some Milk is left",720,100
}

currentTime = time;

if(currentTime===(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime===(lastFed+2)){
update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
update("Bathing");
  foodObj.washroom();
}else{
update("Hungry")
//foodStock.display();
}

if(time === 16) {
 // background(washroom)
}

  drawSprites();

  //add styles here

   textFont('Georgia')
   fill("white");
   textSize(25);

   text("Food Left: "+ foodS,80,100);
   text("Last Fed at: " + time + "   ",80,40);
   text("" + hurryup,720, 100)

}



function readStock(data){
  foodS = data.val();
}

function feedDog(){
  dog.addImage(happydog_anime);

database.ref("/").update({
  Food:foodS-1,
  lastFed:hour()
})
}

function addFoods(){
  database.ref("/").update({
    Food:foodS+1,
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
