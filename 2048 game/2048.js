var score = 0;
var count;
var arr = [2, 4];
function initialNumbers() {
  generateRandomCells();
  generateRandomCells();
}
function generateRandomCells() {
  var cellmin = 1;
  var cellmax = 16;
  var min = 0;
  var max = 1;
  var randomcell = Math.floor(Math.random() * (cellmax - cellmin + 1)) + cellmin;
  if ($('#cell' + randomcell + '').text() === "") {
    var cellvalue =  arr[Math.floor(Math.random() * (max - min + 1)) + min];
    $('#cell' + randomcell + '').html(cellvalue);
  }  else {
        generateRandomCells();
      }
}
function slide(event) {
    var moveCell = 0;
    var rowcount = $(".grid2048 tr").length;
    var cellcount = $(".grid2048 tr:first td").length;
    var i,j,k,m,x,y;
    var currentscore;
    var s;
    var scorearray = [];
    var colorarray = ["darkgrey", "#ffd899", "#ffbf80", "#ffa54d", "#ff7e00", "#ff6600", "#ffe066", "#ffdb4d", "#ffd633", "#ffcc00"];
    if((event.which || event.keycode) === 37) {
      //keycode for left arrow
      var moveleft = 0;
      for (i = 1; i <= rowcount; i++) { //rowindex
        for (j=1; j < cellcount; j++) { //colindex
          /*to shift the cell values if the previous cell is empty*/
          if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() === "") {
              k = j + 1;
              while (k <= cellcount) {
                if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + k + ')').text() !== "") {
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + k + ')').text());
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + k + ')').html("");
                  moveCell = 1;
                  break;
                } else {
                  k++;
                }
              }
          }
          /*add the adjacent cell values*/
          if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() !== "") {
            k = j + 1;
            while($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + k + ')').text() === "") {
              if (k != cellcount) {
                k++;
              } else {
                  break;
                }
              }
              if (k <= cellcount) {
                if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() === $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + k + ')').text()) {
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html(parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text()) + parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + k + ')').text()));
                  currentscore = parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html());
                  score = parseInt(score) + currentscore;
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + k + ')').html("");
                }
              }
            }
          }
      }
    checkEmptyCells();
  }
    if ((event.which || event.keycode) === 38) {
      //keycode for up arrow
      var moveup = 0;
      for (j = 1; j <= cellcount; j++) { //column index
        for (i=1; i < rowcount; i++) { //row index
          /*to shift the cell values if the previous cell is empty*/
          if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() === "") {
              x = i + 1;
              while (x <= rowcount) {
                if ($('.grid2048 tr:nth-child(' + x + ') td:nth-child(' + j + ')').text() !== "") {
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html($('.grid2048 tr:nth-child(' + x + ') td:nth-child(' + j + ')').text());
                  $('.grid2048 tr:nth-child(' + x + ') td:nth-child(' + j + ')').html("");
                  moveCell = 1;
                  break;
                } else {
                  x++;
                }
              }
          }
          if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() !== "") {
          /*add the adjacent cell values*/
            x = i + 1;
            while($('.grid2048 tr:nth-child(' + x + ') td:nth-child(' + j + ')').text() === "") {
              if (x !== rowcount) {
                x++;
              } else {
                  break;
                }
              }
              if (x <= rowcount) {
                if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() === $('.grid2048 tr:nth-child(' + x + ') td:nth-child(' + j + ')').text()) {
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html(parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text()) + parseInt($('.grid2048 tr:nth-child(' + x + ') td:nth-child(' + j + ')').text()));
                  currentscore = parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text());
                  score = parseInt(score) + currentscore;
                  $('.grid2048 tr:nth-child(' + x + ') td:nth-child(' + j + ')').html("");
                }
              }
            }
          }
        }
      checkEmptyCells();
    }
    if((event.which || event.keycode) === 39) {
      //keycode for right arrow
        var moveright = 0;
      for (i = 1; i <= rowcount; i++) {
        for (j = cellcount; j > 1; j--) {
          if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() === "") {
              m = j-1;
              while (m !== 0) {
                if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + m + ')').text() !== "") {
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + m + ')').text());
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + m + ')').html("");
                  moveCell = 1;
                  break;
                } else {
                  m--;
                }
              }
          }
          if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() !== "") {
            m = j - 1;
            while($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + m + ')').text() === "") {
              if (m !== 1) {
                m--;
              } else {
                  break;
                }
            }
            if (m !== 0) {
              if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() === $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + m + ')').text()) {
                $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html(parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text()) + parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + m + ')').text()));
                currentscore = parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text());
                score = parseInt(score) + currentscore;
                $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + m + ')').html("");
              }
            }
          }
        }
      }
      checkEmptyCells();
    }
    if((event.which || event.keycode) === 40) {
    //keycode for down arrow
      var movedown = 0;
      for (j = 1; j <= cellcount; j++) {
        for (i = rowcount; i > 1; i--) {
          if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() === "") {
              y = i - 1;
              while (y !== 0) {
                if ($('.grid2048 tr:nth-child(' + y + ') td:nth-child(' + j + ')').text() !== "") {
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html($('.grid2048 tr:nth-child(' + y + ') td:nth-child(' + j + ')').text());
                  $('.grid2048 tr:nth-child(' + y + ') td:nth-child(' + j + ')').html("");
                  moveCell = 1;
                  break;
                } else {
                  y--;
                }
              }
          }
          if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() !== "") {
            y = i - 1;
            while($('.grid2048 tr:nth-child(' + y + ') td:nth-child(' + j + ')').text() === "") {
              if (y !== 1) {
                y--;
              } else {
                  break;
                }
              }
              if (y !== 0) {
                if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() === $('.grid2048 tr:nth-child(' + y + ') td:nth-child(' + j + ')').text()) {
                  $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html(parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text()) + parseInt($('.grid2048 tr:nth-child(' + y + ') td:nth-child(' + j + ')').text()));
                  currentscore = parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text());
                  score = parseInt(score) + currentscore;
                  $('.grid2048 tr:nth-child(' + y + ') td:nth-child(' + j + ')').html("");
                }
              }
            }
          }
      }
      checkEmptyCells();
    }
    function checkEmptyCells () {
      count = 0;
      if (moveCell === 1 || score !== parseInt($(".scorevalue").text())) {
          generateRandomCells();
          $(".scorevalue").text(score);
      } else {
          $(".scorevalue").text(score);
          for (var i= 1; i<= rowcount; i++) {
            for (var j =1; j <= cellcount; j++) {
              if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() !== "") {
                ++count;
              }
            }
          }
          if (count === (rowcount * cellcount)) {
            if (moveup == 1 && movedown == 1 && moveright == 1 && moveleft == 1) {
              $('.grid2048').css('opacity', '0.2');
              $('body').append($('<div class="gameover"><strong>Game over</strong></div>'));
            }
          }
        }
    }
    addcolor();
    function addcolor() {
      for (var i = 1; i <= rowcount; i++) {
        for (var j = 1; j <= cellcount; j++) {
          for (var p = 1; p <= 11; p++) {
            if (parseInt($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text()) === Math.pow(2,p)) {
              $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').css('backgroundColor', '' + colorarray[p-1] + '');
            }
            if ($('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').text() === "") {
              $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').css('backgroundColor', 'lightgrey');
            }
          }
        }
      }
    }
  }
  function startNewGame() {
    var rowcount = $(".grid2048 tr").length;
    var cellcount = $(".grid2048 tr:first td").length;
    $(".scorevalue").html("0");
    $(".gameover").remove();
    $('.grid2048').css('opacity', '1');
    if (score !== 0 && score > $(".bestscorevalue").html()) {
      $(".bestscorevalue").html(score);
    }
    score = 0;
    for (var i = 1; i <= rowcount; i++) {
      for (var j= 1; j <= cellcount; j++) {
        $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').html("");
        $('.grid2048 tr:nth-child(' + i + ') td:nth-child(' + j + ')').css('backgroundColor', 'lightgrey');
      }
    }
  }
