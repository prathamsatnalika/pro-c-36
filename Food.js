class Food{
    constructor(){
         this.lastFed = null;
         this.foodStock = 0;
         this.milk = loadImage("Milk.png");
         
    }

    lastFed  = database.ref('lastFed');
   
   
    getFoodStock(){
      var foodref = database.ref("Food")
      foodref.on("value",(data)=>{
        this.foodStock = data.val();
      });
      
    }

    deductFood(){
    this.foodStock -= 1;
    }

    updateFoodStock(update){
      database.ref('/').update({
       Food:update,
      })
    }
     display(){
    var x = 80,y = 120;

     imageMode(CENTER);

    if(foodS != 0){
     for(var i = 0;i<foodS;i++){
       if(i%10 == 0){
       x =80;
       y = y+50;
       }
       image(this.milk,x,y,50,50);
       x = x+30;

     }
    }



     }

     bedroom(){
      background(bedroom,550,550);  
  }
    
  garden(){
      background(garden,550,550);  
  } 

  washroom(){
      background(washroom,550,550); 
  }
   
}