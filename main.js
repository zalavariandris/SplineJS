/**
 * drawing helpers
 */
function drawPolygon(ctx, points, color="white"){
    ctx.beginPath();
    for(var i=0;i<points.length; i++){
        var P = points[i];
        ctx.lineTo(P.x, P.y);
    }
    ctx.strokeStyle=color;
    ctx.stroke();
}

function drawLine(ctx, A, B, color="white"){
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.strokeStyle=color;
    ctx.stroke()
}

function drawCubicBezier(ctx, A, B, C, D, color="white"){
    // draw cubic bezier curve
    ctx.beginPath();
    for(var t=0;t<1.0;t+=0.01){
        var P = bezier([A, B, C, D], t);
        ctx.lineTo(P.x, P.y);
    }
    ctx.strokeStyle=color;
    ctx.stroke();
}

function drawBezier(ctx, points, color="white"){
    ctx.beginPath();
    for(var t=0;t<1.0;t+=0.01){
        var P = bezier(points, t);
        ctx.lineTo(P.x, P.y);
    }
    ctx.strokeStyle=color;
    ctx.stroke();
}

/**
 * helper objects for interaction
 */
class DragPoint{
    constructor(element){
        var self = this;
        self.handler = {'onDrag':[]};
        self.element = element;
        self.canvas = document.getElementById("myCanvas");

        element.onmousedown = function(e){

            var O = self.canvas.getClientRects()[0];
            
            document.onmousemove = function drag(e) {
                var P = {
                    x: e.pageX-O.x,
                    y: e.pageY-O.y
                };
                self.element.style.left = P.x+"px";
                self.element.style.top = P.y+"px";

                for(var handler of self.handler['onDrag']){
                    handler(self.model, P);
                };
            };
            
            document.onmouseup = function () {
                self.element.focus();
                document.onmousemove = document.onmouseup = null;
            }
        };
    }

    onDrag(f){
        this.handler['onDrag'].push(f);
    }
}

/**
 * Main Script
 */

// model
var points = [];

// view
var canvas = document.getElementById("myCanvas");
var viewport = document.getElementById("viewport");
var ctx = document.getElementById("myCanvas").getContext("2d");

//
function populateWithRandomPoints(){
    // populate points
    for(var i=0; i<4; i++){
        var P={
            x:Math.random() * 500, 
            y:Math.random() * 500
        };
        points.push(P);
    }
}

function createUIForPoints(){
    // create interactive draggable points
    for(var i=0;  i<points.length; i++){
        var cp = document.createElement("Button");
        cp.className = 'cp';
        cp.style.left = parseInt(points[i].x) + 'px';
        cp.style.top = parseInt(points[i].y) + 'px';
        viewport.appendChild(cp);

        var dragPoint = new DragPoint(cp);
        dragPoint.model = i;
        dragPoint.onDrag((i, pos)=>{
            points[i] = pos;
            console.log("drag: "+i);
            update();
        });
    }
}

function init(){
    populateWithRandomPoints();
    createUIForPoints();
    update();
}

function update(){
    console.log("update");
    draw();
}

function draw(){
    ctx.clearRect (0, 0, 500, 500);
    drawPolygon(ctx, points, "cyan");
    drawCubicBezier(ctx, points[0], points[1], points[2], points[3]);
}

init();
update();