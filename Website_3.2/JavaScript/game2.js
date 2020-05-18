
/* VARIBLES */
 var ctx = myCanvas.getContext("2d"); // Get the drawing context for the canvas
 var FPS = 40;                        // How many frames per second
 var score = 0;                       
 var game_over = false;
 var bug = new MySprite("https://s2js.com/img/etc/ladybug.png");         // The bug
 var bats = [];                                                         // The bats
 
/* MOVEMENT */
function MyKeyDownHandler (MyEvent) { 
   if (MyEvent.keyCode == 37 && bug.x > 0) {bug.x = bug.x - 10};                               // left
   if (MyEvent.keyCode == 39 && bug.x + bug.MyImg.width < myCanvas.width) {bug.x = bug.x+10};  // right
   if (MyEvent.keyCode == 83 && game_over) restart_game();                                     // S to restart 
   }


/* CREATE SPRITE */
 function MySprite (img_url) {
        this.x = 0;
        this.y = 0; 
        this.visible= true;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.MyImg = new Image();
        this.MyImg.src = img_url ;
        }

    MySprite.prototype.Do_Frame_Things = function() {
        if (this.visible) ctx.drawImage(this.MyImg, this.x, this.y);  // draw the thing
        this.x = this.x + this.velocity_x;
        this.y = this.y + this.velocity_y;                            // move the thing
        }       

    MySprite.prototype.GoRandomX = function() {
        this.x = Math.random() * (myCanvas.width - this.MyImg.width); // pick a random x-position, always fully visible
        }


/* IMAGES TOUCHING */
 function ImagesTouching(thing1, thing2) {
          //
          // This function detects whether two MySprites are touching - very useful function
          // 
          if (!thing1.visible  || !thing2.visible) return false;         
          if (thing1.x >= thing2.x + thing2.MyImg.width || thing1.x + thing1.MyImg.width <= thing2.x) return false;   
          if (thing1.y >= thing2.y + thing2.MyImg.height || thing1.y + thing1.MyImg.height <= thing2.y) return false; 
          return true;                                                                                                
          }


 

 /* BATS */
 function AddNewBat() {
        var noobat= new MySprite("https://s2js.com/img/etc/bat.png"); 
        noobat.velocity_y = (Math.random()*2) + 1;    // velocity is between 1 and 3
        noobat.GoRandomX();                           // position randomly
        bats.push(noobat);                            // add the noob to the array 
        setTimeout(AddNewBat, Math.random()*3000);    // never more than 3 secs between bats
        }

 /* Restart The Game */
 function restart_game() {
     // This gets called when the 'S' key is pressed and just sets 
     // some important variables back to the start.
     //
     score = 0;                   // no score
     game_over = false;           // not over yet
     bats = [];                   // no bats
     AddNewBat();                 // get the bats started
     }

 /* TEXT */
 function ShowScore() {
        ctx.fillStyle= "purple";
        ctx.font = "20px Arial";
        ctx.fillText("Bats Doged: " + score, 0, 20); 
        }


 function ShowGameOver() {
        ctx.fillStyle= "red";
        ctx.font = "bold 50px Arial";
        ctx.textAlign="center";
        ctx.fillText("Game Over", myCanvas.width / 2, myCanvas.height / 2);  
        ctx.font = "bold 20px Arial";
        ctx.fillText("Press S to play again", myCanvas.width / 2, (myCanvas.height / 2)+50);
        ctx.textAlign="left";
        ctx.fillText("Good Job!" + score, "Bats Doged" , myCanvas.width / 2, (myCanvas.height / 2)+100);
        ctx.textAlign="left";
        }

////////////////////////////////////////////////////////////* GAME CODE */////////////////////////////////////////////////////////////////////////
 function Do_a_Frame () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);   // clear the background
    ShowScore();                                            // show the score
    bug.y = myCanvas.height - bug.MyImg.height;             // ensure bug always at bottom of canvas
    bug.Do_Frame_Things();                                  // bug does what bugs do 
    if (game_over) ShowGameOver()                           // if game over 
     else {
           for (var i=0; i < bats.length; i++) {            // otherwise for every bat: 
              bats[i].Do_Frame_Things();                          // all the bats do what all the bats do
              if (ImagesTouching(bug, bats[i])) game_over= true;  // check for touching
              if (bats[i].y > myCanvas.height) {                  // if it's gone past the bottom
                 bats.splice(i, 1);                               // delete the bat
                 score++;                                         // bump the score
                 i--;                                             // don't skip the next element
                 }
              }
          }
    }


 
 setInterval(Do_a_Frame, 1000/FPS);                                  // set my frame renderer
 addEventListener("keydown", MyKeyDownHandler);                      // listen for keystrokes  

 restart_game();                                                     // and start

