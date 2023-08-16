const clear = document.querySelector("#clear");
const canvas = document.querySelector("#canvasboard");
let sizeincrease = document.querySelector('#sizeincrease');
let sizedecrease = document.querySelector('#sizedecrease');
let colorEL=document.querySelector('#color');
let sizeEL= document.querySelector("#size")
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
		x2 = e.offsetX;
        y2 = e.offsetY;
        drawCircle();
        drawLine();
        x1 = e.offsetX;
        y1 = e.offsetY;
	}
};
clear.addEventListener("click", function () {
ctx.clearRect(0,0,canvas.width,canvas.height)
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
    let touch = e.touches[0];
    x=touch.clientX - canvas.getBoundingClientRect().left;
    y=touch.clientY - canvas.getBoundingClientRect().top;
    drawCircle();
});
canvas.addEventListener("touchmove", (e) => {
    let touch = e.touches[0];
    x = touch.clientX - canvas.getBoundingClientRect().left;
    y = touch.clientY - canvas.getBoundingClientRect().top;
    drawCircle();
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