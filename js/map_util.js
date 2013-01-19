// Define direction
var UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3, LAST_D = 4;
var DIM = 10;
var NuM_PLANE = 3;

/**
 * This function will tell you which units this plane will ocupy
 * params: a plane
 * return: a list of (x, y), where the plane will occupy
 */
var occupiedByPlane(plane){
    // TODO
}

var generate_map = function() {
    
    function genZeroMap() {
	var ret = new Array();
	for (var i = 0; i < DIM; ++i){
	    ret[i] = new Array();
	    for (var j = 0; j < DIM; ++j)
		ret[i][j] = 0;
	}
	return ret;
    }
    
    function getRandomPlane() {

	function outOfBound(plane){
	    for (pair in occupiedByPlane(plane))
		if (pair['x'] < 0 || pair['x'] >= DIM ||
		    pair['y'] < 0 || pair['y'] >= DIM)
		    return true;
	    return false;
	}
	
	function getRandomNum(min, max){
	    var range = max - min;
	    var rand = Math.random();
	    return Min + Math.floor(rand*range);
	}

	var plane;
	do{
	    plane = {
		x: getRandomNum(0, DIM),
		y: getRandomNum(0, DIM),
		d: getRandomNum(0, LAST_D);
	    };
	} while(outOfBound(plane));
	return plane;
    }

    function compatible(plane, bitmap) {
	for (pair in occupiedByPlane(plane))
	    if (bitmap[pair['x']][pair['y']] == 1)
		return false;
	return true;
    }

    function drawPlaneToBitmap(plane, bitmap) {
	for (pair in occupiedByPlane(plane))
	     bitmap[pair['x']][pair['y']] = 1;
    }

    var bitMap = genZeroMap();
    
    var ans = new Array();

    for (var i = 0; i < NUM_PLANE; ++i){
	var plane;
	
	do{
	    plane = getRandomPlane();
	} while(!competible(plane, bitMap));
	
	drawPlaneToBitmap(plane, bitMap);
	
	ans[i] = plane;
    }

    return ans;
};