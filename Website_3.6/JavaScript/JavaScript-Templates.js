/////////* fill cricle *//////////////
function fillCircle (x, y, radius, colour) {
  ctx.beginPath();
  ctx.fillStyle= colour;
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  }

/////////* Custom  Loop */////////////////
for (var corner= 0; corner < /* up to*/; corner++) {
    ctx.strokeRect(corner, corner, 50, 50);
    }

////////* For Ever Loop*//////////////////

function MyTimer () {
 /* code in side loop here*/
 ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  y_pos = y_pos + 5;
  ctx.strokeRect(120, y_pos, 60, 60);
  }
/* code inside loop ends*/
setInterval(MyTimer,/*Time*/);

//////* Loop with "If" *////////////////
for (var corner= 0; corner < /* up to*/; corner++) {
    if (corner < 50) {
        ctx.strokeStyle= "green";
        }
    else {
        ctx.strokeStyle= "red";
        }
    ctx.strokeRect(corner, corner, 50, 50);
    }
	
////////////* Rndom Num Gen *///////////////
	function RandInt(/*up to*/) { 
   n = Math.floor(Math.random() */*up to*/);  
   return(n);  
   }  
   
  /////////////* Image As Sprite *//////////
  var MyImg = new Image();
	MyImg.src = "../Images/Platformer.png";
ctx.drawImage(MyImg, 130, 130);

////////* Move Movent Of charater *//////////
function MyKeyUpHandler (MyEvent) { 
   if (MyEvent.keyCode == 37) {hero.velocity_x=  0};    // not left
   if (MyEvent.keyCode == 38) {hero.velocity_y=  0};    // not up
   if (MyEvent.keyCode == 39) {hero.velocity_x=  0};    // not right
   if (MyEvent.keyCode == 40) {hero.velocity_y=  0};    // not down
   }

function MyKeyDownHandler (MyEvent) { 
   if (MyEvent.keyCode == 37) {hero.velocity_x=  -3};  // left
   if (MyEvent.keyCode == 38) {hero.velocity_y=  -3};  // up
   if (MyEvent.keyCode == 39) {hero.velocity_x=   3};  // right
   if (MyEvent.keyCode == 40) {hero.velocity_y=   3};  // down
   MyEvent.preventDefault()
   }

    MySprite.prototype.Do_Frame_Things = function() {
        // if the x-velocity is to the left, only apply the velocity if the sprite is not off-screen to the left<
        if ((this.velocity_x < 0) && (this.x > 0))  this.x = this.x + this.velocity_x;

        // if the x-velocity is to the right, only apply the velocity if the sprite is not off-screen to the right<
        if ((this.velocity_x > 0) && (this.x + this.MyImg.width < myCanvas.width )) this.x = this.x + this.velocity_x;

        // if the y-velocity is upward, only apply the velocity if the sprite is not off-screen at the top
        if ((this.velocity_y < 0) && (this.y > 0))  this.y = this.y + this.velocity_y;

        // if the y-velocity is downward, only apply the velocity if the sprite is not off-screen at the bottom
        if ((this.velocity_y > 0) && (this.y + this.MyImg.height< myCanvas.height)) this.y = this.y + this.velocity_y;

        if (this.visible) ctx.drawImage(this.MyImg, this.x, this.y);  // draw the thing
        }       

addEventListener("keydown", MyKeyDownHandler);          // listen for keystrokes  
addEventListener("keyup", MyKeyUpHandler);              // listen for keys released


////////////* Do A Frame *//////////////////////

 function Do_a_Frame () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.drawImage(BugImg, bug_x, bug_y);
    }

 setInterval(Do_a_Frame, 25);

////////////* Score*//////////////////////

ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.fillStyle= "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 0, 20);

////////////* JOIN TEXT *//////////////////////
    var name = prompt("What's your name ?");
    var food = prompt("And what's your favourite food ?");
    
    alert("Well, hello " + name + ", let's eat some " + food);
 

////////////*Mouse (WHERE?)  *//////////////////////
function MyMouseMoveHandler(MyEvent) {
   ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); 
   ctx.fillText("X=" + MyEvent.clientX, 0, 20);
   ctx.fillText("Y=" + MyEvent.clientY, 0, 40);
   }

document.addEventListener("mousemove", MyMouseMoveHandler); 

////////////*MOuse (Draw On CLick) *//////////////////////
function Leave_a_Mark(MyWhere) {
   var rect = myCanvas.getBoundingClientRect();
   ctx.beginPath();
   ctx.arc(MyWhere.clientX - rect.left, MyWhere.clientY - rect.top, 5, 0, Math.PI * 2);
   ctx.fill();
   }


function MyTouchMoveHandler(MyEvent) {
   for (var i=0; i < MyEvent.touches.length; i++) {
        Leave_a_Mark(MyEvent.touches[i]);
        }
   MyEvent.preventDefault()
   }
var mouse_is_down = false;

function MyMouseDownHandler(MyEvent) {
   if (MyEvent.which == 1) mouse_is_down= true;
   }

function MyMouseUpHandler(MyEvent) {
   if (MyEvent.which == 1) mouse_is_down= false;
   }

function MyMouseMoveHandler(MyEvent) {
   if (mouse_is_down) Leave_a_Mark(MyEvent);
   }


myCanvas.addEventListener("mousedown", MyMouseDownHandler);   
myCanvas.addEventListener("mouseup", MyMouseUpHandler);   
myCanvas.addEventListener("touchmove", MyTouchMoveHandler);
myCanvas.addEventListener("mousemove", MyMouseMoveHandler);   

////////////* Test For Images Touching *//////////////////////

function ImagesTouching(thing1, thing2) {
          //
          // This function detects whether two MySprites are touching - very useful function
          // 
          if (!thing1.visible  || !thing2.visible) return false;         
          if (thing1.x >= thing2.x + thing2.MyImg.width || thing1.x + thing1.MyImg.width <= thing2.x) return false;   
          if (thing1.y >= thing2.y + thing2.MyImg.height || thing1.y + thing1.MyImg.height <= thing2.y) return false; 
          return true;                                                                                                
          }

////////////*Genarte Sprite  *//////////////////////


 function MySprite (img_url, width) {                // This function creates a MySprite  
    this.x = 0;
    this.y = 0;                                      // Where is it? Start it at x=0, y=0
    this.costume = 0;                                // Which costume is displayed ? 
    this.costume_width = width;                      // How wide is each costume
    this.visible= true;
    this.velocity_x = 0;                             // How fast is it moving? 
    this.velocity_y = 0;
    this.MyImg = new Image();                        // Store the image in an Image object 
    this.MyImg.src = img_url ;                       // Load the image from a url
    this.angle = 0;                                  // How many degrees we are rotated
    this.flipV = false;                              // Are we flipped vertically 
    this.flipH = false;                              // Are we flipped horizontally

    this.animation_rate = 0;                         // change costume every this many frames 
    this.animation_first_costume = 0;                // what costume the animation starts on
    this.animation_final_costume = null;             // what costume the animation finish on
    this.animation_counter = 0;                      // how many frames since last change
    this.animation_continuous = true;                // does it auto-repeat or just stop 
    }

////////////*Costume  *//////////////////////
ctx.save();                                                  // Save the drawing context state

    if (!this.costume_width)
         this.costume_width = this.MyImg.width;                  // If no costumes, width is full image
    var num_costumes = this.MyImg.width / this.costume_width; // How many costumes provided?
    if (!this.animation_final_costume && num_costumes) 
         this.animation_final_costume = num_costumes-1;         // if final not set, use them all 

    this.h = this.MyImg.height;                                  // height of the image file
    this.w = this.costume_width;                                 // width of a costume

    ctx.translate(this.x + this.w/2, this.y + this.h/2);         // positioning
    ctx.rotate(this.angle * Math.PI / 180);                      // rotating
    if (this.flipV) ctx.scale(1,-1);                             // flipping
    if (this.flipH) ctx.scale(-1,1);
                    
    if (this.visible) ctx.drawImage(this.MyImg, this.costume * this.w, 0, this.w, 
                                    this.h, -this.w/2, -this.h/2, this.w, this.h);

    this.x = this.x + this.velocity_x;
    this.y = this.y + this.velocity_y;                            // move the thing

    if (this.animation_rate > 0) {
        this.animation_counter++;                                                              // count frames 
        if (this.animation_counter > this.animation_rate) {                                // is it time for the next costume?
            this.animation_counter = 0;                                                       // reset the counter
            this.costume++;                                                                     // select the next costume
            if (this.costume >  this.animation_final_costume)                              // check if past last costume
               if (this.animation_continuous) this.costume = this.animation_first_costume  // if continuous, loop back
                   else this.costume = this.animation_final_costume;                       // otherwise just stay on the last costume 
            }  // time for next costume
        } // we are animating

    ctx.restore();                                                // unwarp the context
    }

////////////*Create A Obstacle  *//////////////////////

function add_obstacle(x, y) {
   var n = new MySprite("https://www.s2js.com/img/etc/obstacle.png") ;
   n.x = x;
   n.y = y;
   obstacles.push(n);
   } 

add_obstacle(150, 150) ;
add_obstacle(175, 200) ;
add_obstacle(-30, 100) ;
add_obstacle(50, -30) ;



    
////////////* Touching Obstacle?  *//////////////////////

function is_touching_an_obstacle (thing) {
   for (var i=0; i < obstacles.length; i++)  
      if (ImagesTouching(thing, obstacles[i])) return true;
   return false;
   }

function handle_keys_that_are_pressed() {
    var prev_x = hero.x;
    var prev_y = hero.y;
    if (keys[37]) {         // Left
                   hero.x -= hero_speed;
                   }
    if (keys[39]) {         // Right
                   hero.x += hero_speed;
                   }
    if (keys[38]) {         // Up 
                   hero.y -= hero_speed;
                   }
    if (keys[40]) {         // Down
                   hero.y += hero_speed;
                   }
    if (is_touching_an_obstacle(hero)) {
       hero.x = prev_x;                         // moved into an obstacle so undo the move
       hero.y = prev_y;
       }


////////////*Scroling Canvas w/ movement  *//////////////////////
var viewport_offset_x = 0;           // how much the viewport has moved 
 var viewport_offset_y = 0;
 var viewport_margin = 10;            // how close the hero can get to the edge before we scroll
 var margin_overlap_to_eat = 20;      // how close the hero needs to overlap the fruit to eat it

function handle_keys_that_are_pressed() {
    var prev_x = hero.x;
    var prev_y = hero.y;
    if (keys[37]) {         // Left
                   hero.x -= hero_speed;
                   if (hero.x < viewport_margin-viewport_offset_x)
                       viewport_offset_x += (viewport_margin - viewport_offset_x - hero.x); 
                   }
    if (keys[39]) {         // Right
                   hero.x += hero_speed;
                   if (hero.x + hero.w > myCanvas.width - viewport_margin - viewport_offset_x) 
                       viewport_offset_x += (myCanvas.width - viewport_margin - viewport_offset_x - hero.x - hero.w); 
                  }
    if (keys[38]) {         // Up 
                   hero.y -= hero_speed;
                   if (hero.y < viewport_margin-viewport_offset_y) 
                       viewport_offset_y += (viewport_margin - viewport_offset_y - hero.y); 
                  }
    if (keys[40]) {         // Down
                   hero.y += hero_speed;
                   if (hero.y + hero.h > myCanvas.height - viewport_margin - viewport_offset_y) 
                       viewport_offset_y += (myCanvas.height - viewport_margin - viewport_offset_y - hero.y - hero.h); 
                   }


////////////*  *//////////////////////



////////////*  *//////////////////////



////////////*  *//////////////////////



////////////*  *//////////////////////



////////////*  *//////////////////////



////////////*  *//////////////////////


