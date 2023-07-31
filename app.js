const clear = document.querySelector("#clear");
const canvas = document.querySelector("#canvasboard");
let sizeincrease = document.querySelector('#sizeincrease');
let sizedecrease = document.querySelector('#sizedecrease');
let colorEL=document.querySelector('#color');
let sizeEL= document.querySelector("#size")
let x = 0,
	y = 0;
let size = 30;
let color='green'
let ctx = canvas.getContext("2d");

let ismouseDown = false;
canvas.onmousedown = function (e) {
	ismouseDown = true;
};
canvas.addEventListener("mouseup", function (e) {
	ismouseDown = false;
});
canvas.onmousemove = function (e) {
	if (ismouseDown) {
		x = e.offsetX;
		y = e.offsetY;
		drawCircle();
	}
};
clear.addEventListener("click", function () {
ctx.clearRect(0,0,canvas.width,canvas.height)
});

function drawCircle() {
ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.arc(x, y, size, 0, Math.PI * 2);
	ctx.fillStyle = color;
    ctx.strokeWidth=2
ctx.fill();
	
}
function drawRect() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

drawCircle();
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
    colorEL.addEventListener('change',function(e){
        color=e.target.value;
    })