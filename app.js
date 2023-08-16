const clear = document.querySelector("#clear");
const canvas = document.querySelector("#canvasboard");
let sizeincrease = document.querySelector('#sizeincrease');
let sizedecrease = document.querySelector('#sizedecrease');
let colorEL=document.querySelector('#color');
let sizeEL = document.querySelector("#size");
const download = document.getElementById("download");
let sharelink = "";
const shareButton = document.getElementById('shareButton');
shareButton.style.display = "none";
const fullscreenButton = document.getElementById('fullscreenButton');
let x = 0,
    y = 0;
let x2 = 0, y2 = 0 ,x1=0,y1=0;
let size = 30;
let color='green'
let ctx = canvas.getContext("2d");

let ismouseDown = false;
canvas.onmousedown = function (e) {
    ismouseDown = true;
    x = e.offsetX;
    y = e.offsetY;
    x1 = x;
    y1 = y;
    drawCircle();
    // drawCircle();
};
canvas.addEventListener("mouseup", function (e) {
    ismouseDown = false;
    x = undefined;
    y = undefined;
    x2 = undefined;
    y2 = undefined;
});
canvas.onmousemove = function (e) {
    if (ismouseDown) {
        shareButton.style.display = "block";
		x2 = e.offsetX;
        y2 = e.offsetY;
        drawCircle();
        drawLine();
        x1 = e.offsetX;
        y1 = e.offsetY;
	}
};
clear.addEventListener("click", function () {
    shareButton.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

});

function drawCircle() {
ctx.beginPath();
 ctx.arc(x1, y1, size, 0, Math.PI * 2);
	ctx.fillStyle = color;
    ctx.strokeWidth = 4;
ctx.fill();
}
function drawRect() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// drawCircle();
sizeincrease.addEventListener('click',function(){
if(size>45){
    size=50
}else{
    size+=5;
}
sizeEL.innerHTML = size;
})
sizedecrease.addEventListener('click',function(){
    if(size<10){
        size=5
    }else{
        size-=5;
    }
    sizeEL.innerHTML = size;
    });
colorEL.addEventListener('change', function (e) {
    color = e.target.value;
});
canvas.addEventListener("touchstart", (e) => {
    shareButton.style.display = "block";
    let touch = e.touches[0];
    x=touch.clientX - canvas.getBoundingClientRect().left;
    y=touch.clientY - canvas.getBoundingClientRect().top;
    // drawCircle();
    x1 = x;
    y1 = y;
});
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    let touch = e.touches[0];
    x = touch.clientX - canvas.getBoundingClientRect().left;
    y = touch.clientY - canvas.getBoundingClientRect().top;
    x2 = x;
    y2 = y;
    drawCircle();
    drawLine();
    x1 = x;
    y1 = y;
});
canvas.addEventListener("touchstop", (e) => {
    ismouseDown = false;
    ctx.closePath();
    x1 = undefined;
    y1 = undefined;
    x2 = undefined;
    y2 = undefined;
});

function drawLine() {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size*2;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
const blobCallback = function (name) {
    return (blob) => {
        let link = document.createElement("a")
        link.href = URL.createObjectURL(blob);
        sharelink = link.href;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        link.remove();
   }
}
download.addEventListener("click", function (e) {
    let name = prompt("give name for image to download")
    canvas.toBlob(blobCallback(name), "image/jpeg", 1);
});


shareButton.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: 'My Drawing',
      text: 'Check out my amazing drawing!',
      url: "",
    })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
  } else {
    // Fallback behavior for devices that don't support Web Share API
    const drawingUrl = sharelink;
    const shareUrl = `whatsapp://send?text=${encodeURIComponent(drawingUrl)}`;
    window.location.href = shareUrl;
  }
});


let drawingData = undefined;

// Function to toggle fullscreen
function toggleFullscreen() {
    drawingData = canvas.toDataURL();
    
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen().catch(err => {
      console.error('Error attempting to enable full-screen mode:', err);
    });
    }
    resizeCanvas();
}

fullscreenButton.addEventListener('click', toggleFullscreen);

function resizeCanvas(){
    if (document.fullscreenElement) {
        canvas.width = 500;
        canvas.height = 500;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    const img = new Image();
    img.onload = function () {
        canvas.getContext('2d').drawImage(img, canvas.width/4, canvas.height/4); 
    }
    img.src = drawingData;
}