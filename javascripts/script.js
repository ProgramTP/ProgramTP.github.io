$(document).ready(function() {
	
	
// Initiate localScroll (the plugin for the scrolling animation)
	"use strict";
    $.localScroll({
		
		queue:true,
		duration:1000,
		hash:true,
		onBefore:function( e, anchor, $target ){
			// The 'this' is the settings object, can be modified
		},
		onAfter:function( anchor, settings ){
			// The 'this' contains the scrolled element (#content)
		}
		
		});
		
// End localScroll
 

//Iniatiate tipsy script
$('').tipsy({fade: true, gravity: 'n'});
$(' .facebook, .twitter, .rss, .dribbble,.download-btn').tipsy({fade: true, gravity: 's'});
$('').tipsy({fade: true, gravity: 'n'});
$('').tipsy({fade: true, gravity: 'e'});
//End tipsy script


// Custom script for the Select navigation on mobile/tablet devices by Chris Coyier http://css-tricks.com/convert-menu-to-dropdown/ (with some modification)




		  
});

$('.progress-bar').each(function() {
  "use strict";
  	var $bar = $(this);
    var progress = setInterval(function() {
      
      var currWidth = parseInt($bar.attr('aria-valuenow'));
      var maxWidth = parseInt($bar.attr('aria-valuemax'));
      
	  //update the progress
        $bar.width(currWidth+'%');
        $bar.attr('aria-valuenow',currWidth+10);
      
      //clear timer when max is reach
      if (currWidth >= maxWidth){
        clearInterval(progress);
      }
      
    }, 500);
  
});

$(document).ready(function () {

"use strict";
    //stick in the fixed 100% height behind the navbar but don't wrap it
    $('#slide-nav.navbar-inverse').after($('<div class="inverse" id="navbar-height-col"></div>'));
  
    $('#slide-nav.navbar-default').after($('<div id="navbar-height-col"></div>'));  

    // Enter your ids or classes
    var toggler = '.navbar-toggle';
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var slidewidth = '45%';
    var menuneg = '-100%';
    var slideneg = '-80%';


    $("#slide-nav").on("click", toggler, function () {

        var selected = $(this).hasClass('slide-active');

        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        });

        $('#navbar-height-col').stop().animate({
            left: selected ? slideneg : '0px'
        });

        $(pagewrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });

        $(navigationwrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });


        $(this).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active');


        $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');


    });


    var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';


    $(window).on("resize", function () {

        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected).removeClass('slide-active');
        }


    });




});


const canvas = document.getElementById("starsanim");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;

let starsArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height/100) * (canvas.width/100)
}

window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  }
)

class Star {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false); 
    ctx.fillStyle = '#F0F8FF';
    ctx.fill();
  }
  
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -1 * this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -1 * this.directionY;
    }
    
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt((dx*dx) + (dy*dy));
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size*10) {
        this.x += 5;
      }
      if (mouse.x > this.x && this.x > canvas.width - this.size*10) {
        this.x -= 5;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size*10) {
        this.y += 5;
      }
      if (mouse.y > this.y && this.y > canvas.height - this.size*10) {
        this.y -= 5;
      }
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function initialize() {
  starsArray = [];
  let numberOfStars = (canvas.height * canvas.width) / 1000;
  for (let i = 0; i < numberOfStars; i++) {
    let size = (Math.random() * 2) + 1;
    let x = Math.random() * ((innerWidth-size*2)-(size*2)) + size*2;
    let y = Math.random() * ((innerHeight-size*2)-(size*2)) + size*2;
    directionX = Math.floor(Math.random() * 2.5) - 0.5;
    directionY = Math.floor(Math.random() * 2.5) - 0.5;
    let color = '#00FFFF'
    starsArray.push(new Star(x,y,directionX,directionY,size,color));
  }
}

function connect() {
  for (let i = 0; i < starsArray.length; i++) {
    for (let x = 0; x < starsArray.length; x++) {
      let xdist = Math.abs(starsArray[i].x - starsArray[x].x);
      let ydist = Math.abs(starsArray[i].y - starsArray[x].y);
      if (Math.sqrt(xdist*xdist + ydist*ydist) < ((canvas.width/70)*(canvas.height/70))) {
        ctx.strokeStyle='rgba(192,192,192,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(starsArray[i].x, starsArray[i].y);
        ctx.lineTo(starsArray[x].x, starsArray[x].y);
        ctx.stroke();
        console.log("Yo");
      }
    }
  }
}
  
function animate() {
  requestAnimationFrame(animate);
  
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     ||  
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
  })(); 
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for (let i = 0; i < starsArray.length; i++) {
    starsArray[i].update();
  }
  connect();
}
  
window.addEventListener('resize',
  function(event) {
    canvas.width = window.innerWidth;
    initialize();
  }
)

initialize();
animate();