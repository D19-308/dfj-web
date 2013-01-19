// Define direction
var UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;
var DIM = 10;
var NuM_PLANE = 3;

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
	// TODO
    }

    function compatible(plane, bitmap) {
	// TODO
    }

    function drawPlaneToBitmap(plane, bitmap) {
	// TODO
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