/**
 * Functions to calculate bezier curve
 */
function lerp(A, B, t){
    return {
        x: A.x+(B.x-A.x)*t,
        y: A.y+(B.y-A.y)*t
    };
}

function cubicBezier(A, B, C, D, t){
    var P1 = lerp(A, B, t);
    var Q1 = lerp(B, C, t);
    var R1 = lerp(C, D, t);

    var P2 = lerp(P1, Q1, t);
    var Q2 = lerp(Q1, R1, t);

    var P3 = lerp(P2, Q2, t);

    return P3;
}

function bezier(cps, t){
    // deep copy points from passed values
    var points = [];
    for(var i=0; i<cps.length; i++){
        points.push(cps[i]);
    }

    // 
    while (points.length > 1) {
        for (var i = 0; i < points.length - 1; i++) {
            points[i] = lerp(points[i], points[i + 1], t);
        }
        points.pop();
    }
    return points[0];
}