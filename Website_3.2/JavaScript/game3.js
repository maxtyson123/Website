 var ctx = myCanvas.getContext("2d");
ctx.fillStyle= "red";
        ctx.font = "bold 50px Arial";
        ctx.textAlign="center";
        ctx.fillText("EROR 404", myCanvas.width / 2, myCanvas.height / 2);  
        ctx.font = "bold 20px Arial";
        ctx.fillText("You are not running on latest version", myCanvas.width / 2, (myCanvas.height / 2)+50);
        ctx.textAlign="left";
        
        