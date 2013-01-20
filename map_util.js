(function() {
    // Define direction
    var UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3, LAST_D = 4;
    var DIM = 10;
    var NUM_PLANE = 3;

    /**
     * This function will tell you which units this plane will ocupy
     * params: a plane
     * return: a list of (x, y), where the plane will occupy
     */
    function occupiedByPlane(plane) {

	function rotate (fixpoint, points) {
            var ret = new Array();
            for (var i = 0; i < points.length; ++i){
		var point = points[i];
		ret.push({x: fixpoint['x'] + (point['y'] - fixpoint['y']), 
			  y: fixpoint['y'] - (point['x'] - fixpoint['x'])});
            }
            return ret;
	}

	function pointsOfUpPlane(plane) {

            var ret = new Array();
            ret.push({x: plane['x'], y:plane['y']});

            for (var i = -2; i<= 2; ++i)
		ret.push({x: plane['x']+i, y:plane['y']+1});

            ret.push({x: plane['x']+2, y:plane['y']+2});

            for (var i = -1; i<= 1; ++i)
		ret.push({x: plane['x']+i, y:plane['y']+3});

            return ret;
	}
	
	var ret = pointsOfUpPlane(plane);
	var head = {
            x: plane['x'],
            y: plane['y']
	};
	
	for (var i = 0; i < plane['d']; ++i)
            ret = rotate(head, ret);

	return ret;
    }

    function generateMap() {
	
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
		var points = occupiedByPlane(plane);
		for (var i = 0; i < points.length; ++i) {
                    var pair = points[i];
                    if (pair['x'] < 0 || pair['x'] >= DIM ||
			pair['y'] < 0 || pair['y'] >= DIM)
			return true;
		}
		return false;
            }

            function getRandomNum(min, max){
		var range = max - min;
		var rand = Math.random();
		return min + Math.floor(rand*range);
            }

            var plane;
            do{
		plane = {
                    x: getRandomNum(0, DIM),
                    y: getRandomNum(0, DIM),
                    d: getRandomNum(0, LAST_D)
		};
            } while(outOfBound(plane));
            return plane;
	}

	function compatible(plane, bitmap) {
            var points = occupiedByPlane(plane);
            for (var i = 0; i < points.length; ++i){
		var pair = points[i];
		if (bitmap[pair['x']][pair['y']] == 1)
                    return false;
            }
            return true;
	}

	function drawPlaneToBitmap(plane, bitmap) {
            var points = occupiedByPlane(plane);
            for (var i = 0; i < points.length; ++i){
		var pair = points[i];
		bitmap[pair['x']][pair['y']] = 1;
            }
	}

	var bitMap = genZeroMap();
	
	var ans = new Array();

	for (var i = 0; i < NUM_PLANE; ++i){
            var plane;

            do{
		plane = getRandomPlane();
            } while(!compatible(plane, bitMap));

            drawPlaneToBitmap(plane, bitMap);

            ans[i] = plane;
	}

	// Add the fucking offset
	for (var i = 0; i < ans.length; ++i){
	    var point = ans[i];
            switch(point['d']){
            case UP:
		point['x'] -= 2;
		break;
            case RIGHT:
		point['x'] -= 3;
		point['y'] -= 2;
		break;
            case DOWN:
		point['x'] -= 2;
		point['y'] -= 3;
		break;
            case LEFT:
		point['y'] -= 2;
		break; 
            }
	}
	return ans;
    };
    
    window.generate_map = generateMap;
})();
