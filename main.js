/**
 * drawing helpers
 */
function drawCircle(ctx, P, r=5, color="white"){
    ctx.beginPath();
    ctx.arc(P.x, P.y, r, 0, Math.PI*2);
    ctx.fillStyle=color;
    ctx.fill();
}
 
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

function drawCubicBezier(ctx, A, B, C, D, color="white", segments=100){
    // draw cubic bezier curve
    ctx.beginPath();
    for(var t=0;t<1.0;t+=1/segments){
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
 * Main Script
 */
var model;
var gui;
var viewport;

// main
function init(){
    model = {
        points: [],
        segments:64,
        t: 0.5
    }
    for(var i=0; i<4; i++){
        var P={
            x:Math.random() * 500, 
            y:Math.random() * 500
        };
        model.points.push(P);
    }

    // datGui
    gui = new dat.GUI();
    gui.add(model, 't', 0, 1).onChange(update);
    gui.add(model, 'segments', 0, 100).onChange(update);

    // viewport
    viewport = new Viewport("viewport");
    for(var i=0;  i<model.points.length; i++){
        var pointUI = viewport.addPoint(model.points[i]);
        pointUI.onChange(update);
    }
}

function update(){
    console.log("update");
    draw();
}

function draw(){
    ctx = viewport.getContext();
    ctx.clearRect (0, 0, 500, 500);
    ctx.setLineDash([5, 10]);
    drawPolygon(ctx, model.points, "cyan");
    ctx.setLineDash([]);
    drawCubicBezier(ctx, model.points[0], model.points[1], model.points[2], model.points[3], "white", model.segments);

    // visualize cubic bezier curve construction
    var A = model.points[0];
    var B = model.points[1];
    var C = model.points[2];
    var D = model.points[3];
    var P1 = lerp(A, B, model.t);
    var Q1 = lerp(B, C, model.t);
    var R1 = lerp(C, D, model.t);
    drawLine(ctx, P1, Q1, "deeppink");
    drawLine(ctx, Q1, R1, "deeppink");
    drawCircle(ctx, P1, 3, "deeppink");
    drawCircle(ctx, Q1, "deeppink");
    drawCircle(ctx, R1, 3, "deeppink");

    var P2 = lerp(P1, Q1, model.t);
    var Q2 = lerp(Q1, R1, model.t);
    drawLine(ctx, P2, Q2, "deeppink");
    drawCircle(ctx, P2, 3, "deeppink");
    drawCircle(ctx, Q2, 3, "deeppink");

    var P3 = lerp(P2, Q2, model.t);
    drawCircle(ctx, P3, 3, "deeppink");
}

init();
update();