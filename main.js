var N = 10, UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;

function generate_map() {
  return [
    { x: 0, y: 0, d: LEFT }
  , { x: 3, y: 3, d: UP }
  , { x: 5, y: 0, d: RIGHT }
  ];
}

function blank_map() {
  var g = new Array(N);
  for (var i = 0; i < N; i++) {
    g[i] = new Array(N);
    for (var j = 0; j < N; j++) {
      g[i][j] = empty_cell();
    }
  }
  return g;
}

function empty_cell() {
  return { type: 'empty' };
}

function head_cell(k) {
  return { type: 'head', id: k };
}

function body_cell(k) {
  return { type: 'body', id: k };
}

function is_empty_cell(c) {
  return c.type === 'empty';
}

function is_head_cell(c) {
  return c.type === 'head';
}

function is_body_cell(c) {
  return c.type === 'body';
}

function fill_map(g, planes) {
  for (var i = 0; i < planes.length; i++) {
    fill_map_with_plane(g, i, planes[i]);
  }
}

var PLANES = [
  // UP = 0
  ["  o  ",
   "xxxxx",
   "  x  ",
   " xxx "]
  // RIGHT = 1
, ["  x ",
   "x x ",
   "xxxo",
   "x x ",
   "  x "]
  // DOWN = 2
, [" xxx ",
   "  x  ",
   "xxxxx",
   "  o  "]
  // LEFT = 3
, [" x  ",
   " x x",
   "oxxx",
   " x x",
   " x  "]
];

function fill_map_with_plane(g, k, plane) {
  var p = PLANES[plane.d],
      x = plane.x,
      y = plane.y;
  for (var i = 0; i < p.length; i++) {
    for (var j = 0; j < p[i].length; j++) {
      if (p[i][j] === 'o') {
        g[i+x][j+y] = head_cell(k);
      }
      if (p[i][j] === 'x') {
        console.log(i + " " + j + " " + x + " " + y);
        g[i+x][j+y] = body_cell(k);
      }
    }
  }
}

function cell_id(i, j) {
  return "cell_" + i + "_" + j;
}

function $cell(i, j) {
  return $('#' + cell_id(i, j));
}

function generate_table(rows, cols) {
  var html = '';
  for (var i = 0; i < rows; i++) {
    html += '<tr>';
    for (var j = 0; j < cols; j++) {
      html += '<td id="' + cell_id(i, j) + '" data-x="' + i + '" data-y="' + j + '"></td>';
    }
    html += '</tr>';
  }
  $('#grid').html(html);
}

function reveal_map(g) {
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      reveal_cell(g, i, j);
    }
  }
}

function reveal_cell(g, i, j) {
  if (is_empty_cell(g[i][j])) {
    $cell(i, j).addClass('empty');
  }
  else if (is_head_cell(g[i][j])) {
    $cell(i, j).addClass('head');
  }
  else if (is_body_cell(g[i][j])) {
    $cell(i, j).addClass('body');
  }
  $cell(i, j).removeClass('highlight');
}

function update_health_status(g, health) {
  var alive_count = 0;
  for (var i = 0; i < health.length; i++) {
    $('.health' + i).hide();
    if (health[i] > 0) {
      $('.alive.health' + i).show();
      alive_count++;
    }
    else {
      $('.dead.health' + i).show();
    }
  }
  if (alive_count === 0) {
    reveal_map(g);
    window.alert('Game over!');
  }
}

//===
generate_table(N, N);

var g = blank_map();
fill_map(g, generate_map());

var health = [3, 3, 3];
update_health_status(g, health);

$('td').click(function(){
  var x = $(this).data('x'),
      y = $(this).data('y'),
      c = g[x][y];
  
  if ($(this).hasClass('revealed')) return;
  $(this).addClass('revealed');
  
  reveal_cell(g, x, y);
  
  if (is_head_cell(c)) {
    health[c.id] = 0;
  }
  else if (is_body_cell(c)) {
    health[c.id]--;
  }
  
  update_health_status(g, health);
}).on('contextmenu', function(evt){
  if ($(this).hasClass('highlight')) {
    $(this).removeClass('highlight');
  }
  else {
    $(this).addClass('highlight');
  }
  evt.preventDefault();
  return false;
});
