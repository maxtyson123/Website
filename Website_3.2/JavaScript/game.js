/VARIBLES/
var ctx = myCanvas.getContext("2d");
 var bug_x = 0;
 var bug_y = 0;
 var melon_x = 0;
 var melon_y = 0;
 var score = 0;
 var time = 20
 
/*IMAGES*/ 
 
 var BugImg = new Image();
 BugImg.src = "../Images/l.png";


 var MelonImg = new Image();
 MelonImg.src = "../Images/watermelon.png";
 
/*MOVEMENT*/
function MyKeyDownHandler (MyEvent) { 
   if (MyEvent.keyCode == 37 && bug_x > 0) {bug_x = bug_x - 15};  
   if (MyEvent.keyCode == 39 && bug_x+BugImg.width < myCanvas.width) {bug_x = bug_x+15};
   if (MyEvent.keyCode == 83) restart_game();
   }

 addEventListener("keydown", MyKeyDownHandler); 


/*FALLING CODE*/
function ImagesTouching(x1, y1, img1, x2, y2, img2) {
          if (x1 >= x2+img2.width || x1+img1.width <= x2) return false;   // too far to the side
          if (y1 >= y2+img2.height || y1+img1.height <= y2) return false; // too far above/below
          return true;                                                    // otherwise, overlap   
          }
/////////////////////////////////////*GAME CODE*//////////////////////////////////////////////////////////////
function Do_a_Frame () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    
    /*TEXT*/
ctx.fillStyle= "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 0, 20);
    ctx.fillStyle= "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Time: " + Math.round(time), 0, 40);
  

    /* BUG */
    bug_y = myCanvas.height - BugImg.height;
    ctx.drawImage(BugImg, bug_x, bug_y);
    
    /* TIME */
    if (time <= 0) {
          ctx.fillStyle= "red";
          ctx.font = "bold 50px Arial";
          ctx.textAlign="center";
          ctx.fillText("Game Over", myCanvas.width / 2, myCanvas.height / 2);
          ctx.textAlign="left";
          }
    else {
          time = time - 1/50;
          
       /* MELLON*/
          melon_y = melon_y + 3;
          if (melon_y > myCanvas.height) {
              melon_y= 0;
              melon_x= Math.random() * (myCanvas.width - MelonImg.width);
              }   
          }
    ctx.drawImage(MelonImg, melon_x, melon_y);

    /*POINTS*/
    if (ImagesTouching(bug_x, bug_y, BugImg, melon_x, melon_y, MelonImg)) {
        score= score + 1;
        melon_x= -MelonImg.width;
        }
    /*RESTART*/
    function restart_game() {
     time = 20;
     score = 0;
     melon_speed = 3;
     }
    }
 setInterval(Do_a_Frame, 20);



