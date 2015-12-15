var score = 0;
var count;
var i,j,k,m,x,y;
var arr = [2, 4];
var tablearray = [];
var rowcount = 4;
var cellcount = 4;
var moveup=0,movedown=0,moveleft=0,moveright=0;
var colorarray = ["darkgrey", "#ffd899", "#ffbf80", "#ffa54d", "#ff7e00", "#ff6600", "#ffe066", "#ffdb4d", "#ffd633", "#ffcc00"];
for(var x = 0; x < 4; x++){
    tablearray[x] = [];
    for(var y = 0; y < 4; y++){
        tablearray[x][y] = 0;
    }
}
function initialNumbers() {
  generateRandomCells();
  generateRandomCells();
  buildtable();
  addcolor();
}
function generateRandomCells() {
  var minindex = 0;
  var maxindex = 3;
  var min = 0;
  var max = 1;
  var rowindex = Math.floor(Math.random() * (maxindex - minindex + 1)) + minindex;
  var columnindex = Math.floor(Math.random() * (maxindex - minindex + 1)) + minindex;
  if (tablearray[rowindex][columnindex] === 0) {
    var cellvalue =  arr[Math.floor(Math.random() * (max - min + 1)) + min];
    tablearray[rowindex][columnindex] = cellvalue;
  }  else {
        generateRandomCells();
      }
}
function buildtable() {
  var table = document.createElement("table");
  table.className = "grid2048";
  table.id = "table";
  table.setAttribute("cellspacing", "10");
  document.getElementById("body").appendChild(table);
  for (var i = 0; i < 4; i++) {
    var tr = document.createElement("tr");
    tr.className = "row";
    document.getElementById("table").appendChild(tr);
    for (var j = 0; j < 4; j++) {
      td = document.createElement("td");
      td.className = "cell";
      td.id = i.toString() + j.toString();
      if (tablearray[i][j] !== 0) {
        td.innerHTML = tablearray[i][j];
      } else {
        td.innerHTML = "";
      }
    document.getElementsByClassName("row")[i].appendChild(td);
    }
  }
}
function addcolor() {
  for (var i = 0; i < rowcount; i++) {
    for (var j = 0; j < cellcount; j++) {
      for (var p = 1; p <= 11; p++) {
        if (tablearray[i][j] === Math.pow(2,p)) {
          document.getElementById("" + i.toString() + j.toString() + "").style.background = colorarray[p-1];
        }
        if (tablearray[i][j] === 0) {
          document.getElementById("" + i.toString() + j.toString() + "").style.background = "lightgrey";
        }
      }
    }
  }
}
function slide(event) {
    var moveCell;
    var currentscore;
    var s;
    var scorearray = [];
    if((event.which || event.keycode) === 37) {
      //keycode for left arrow
      var moveleft = 0;
      moveCell = 0;
      for (i = 0; i < rowcount; i++) { //rowindex
        for (j = 0; j < cellcount -1; j++) { //colindex
          /*to shift the cell values if the previous cell is empty*/
          if (tablearray[i][j] === 0) {
              k = j + 1;
              while (k < cellcount) {
                if (tablearray[i][k] !== 0) {
                  tablearray[i][j] = tablearray[i][k];
                  tablearray[i][k] = 0;
                  moveCell = 1;
                  break;
                } else {
                    k++;
                  }
              }
          }
          /*add the adjacent cell values*/
            if (tablearray[i][j] !== 0) {
              k = j + 1;
              while (k < cellcount) {
                if (tablearray[i][k] === 0) {
                  k++;
                } else {
                    break;
                  }
              }
              if (k < cellcount) {
                if (tablearray[i][j] === tablearray[i][k]) {
                  tablearray[i][j] = tablearray[i][j] + tablearray[i][k];
                  currentscore = tablearray[i][j];
                  score = parseInt(score) + currentscore;
                  tablearray[i][k] = 0;
                  moveleft = 0;
                } else {
                  moveleft = 1;
                }
              }
            }
          }
        }
      document.getElementById("body").removeChild(document.getElementById("table"));
      checkEmptyCells();
      buildtable();
  }
    if ((event.which || event.keycode) === 38) {
      //keycode for up arrow
      var moveup = 0;
      moveCell = 0;
      for (j = 0; j < cellcount; j++) { //column index
        for (i=0; i < rowcount-1; i++) { //row index
          /*to shift the cell values if the previous cell is empty*/
          if (tablearray[i][j] === 0) {
              x = i + 1;
              while (x < rowcount) {
                if (tablearray[x][j] !== 0) {
                  tablearray[i][j] = tablearray[x][j];
                  tablearray[x][j] = 0;
                  moveCell = 1;
                  break;
                } else {
                    x++;
                }
              }
          }
          if (tablearray[i][j] !== 0) {
          /*add the adjacent cell values*/
            x = i + 1;
            while(x < rowcount) {
              if (tablearray[x][j] === 0) {
                x++;
              } else {
                  break;
                }
              }
              if (x < rowcount) {
                if (tablearray[i][j] === tablearray[x][j]) {
                  tablearray[i][j] = tablearray[i][j] + tablearray[x][j];
                  currentscore = tablearray[i][j];
                  score = parseInt(score) + currentscore;
                  tablearray[x][j] = 0;
                  moveup = 0;
                } else {
                  moveup = 1;
                }
              }
            }
          }
        }
        document.getElementById("body").removeChild(document.getElementById("table"));
        checkEmptyCells();
        buildtable();
    }
    if((event.which || event.keycode) === 39) {
      //keycode for right arrow
        var moveright = 0;
        moveCell = 0;
      for (i = 0; i < rowcount; i++) {
        for (j = cellcount - 1; j > 0; j--) {
          if (tablearray[i][j] === 0) {
              m = j-1;
              while (m >= 0) {
                if (tablearray[i][m] !== 0) {
                  tablearray[i][j] = tablearray[i][m];
                  tablearray[i][m] = 0;
                  moveCell = 1;
                  break;
                } else {
                  m--;
                }
              }
          }
          if (tablearray[i][j] !== 0) {
            m = j - 1;
            while (m >= 0) {
              if (tablearray[i][m] === 0) {
                m--;
              } else {
                  break;
                }
            }
            if (m >= 0) {
              if (tablearray[i][j] === tablearray[i][m]) {
                tablearray[i][j] = tablearray[i][j] + tablearray[i][m];
                currentscore = tablearray[i][j];
                score = parseInt(score) + currentscore;
                tablearray[i][m] = 0;
                moveright = 0;
              } else {
                moveright = 1;
              }
            }
          }
        }
      }
      document.getElementById("body").removeChild(document.getElementById("table"));
      checkEmptyCells();
      buildtable();
    }
    if((event.which || event.keycode) === 40) {
    //keycode for down arrow
      var movedown = 0;
      moveCell = 0;
      for (j = 0; j < cellcount; j++) {
        for (i = rowcount-1; i > 0; i--) {
          if (tablearray[i][j] === 0) {
              y = i - 1;
              while (y >= 0) {
                if (tablearray[y][j] !== 0) {
                  tablearray[i][j] = tablearray[y][j];
                  tablearray[y][j] = 0;
                  moveCell = 1;
                  break;
                } else {
                  y--;
                }
              }
          }
          if (tablearray[i][j] !== 0) {
            y = i - 1;
            while (y >= 0) {
              if (tablearray[y][j] === 0) {
                y--;
              } else {
                  break;
                }
            }
              if (y >= 0) {
                if (tablearray[i][j] === tablearray[y][j]) {
                  tablearray[i][j] = tablearray[i][j] + tablearray[y][j];
                  currentscore = tablearray[i][j];
                  score = parseInt(score) + currentscore;
                  tablearray[y][j] = 0;
                  movedown = 0;
                } else {
                  movedown = 1;
                }
              }
            }
          }
        }
        document.getElementById("body").removeChild(document.getElementById("table"));
        checkEmptyCells();
        buildtable();
    }
    function checkEmptyCells () {
      count = 0;
      //document.getElementsByClassName("grid2048")[0].style.opacity = "0.9";
      var scorevalue = document.getElementsByClassName("scorevalue")[0].innerHTML;
      if (moveCell === 1  || score != scorevalue) {
          generateRandomCells();
          document.getElementsByClassName("scorevalue")[0].innerHTML = score;
      } else {
          document.getElementsByClassName("scorevalue")[0].innerHTML = score;
          for (i = 0; i< rowcount; i++) {
            for (j = 0; j < cellcount; j++) {
              if (tablearray[i][j] !== 0) {
                ++count;
              }
            }
          }
          if (count === (rowcount * cellcount)) {
          var flag = 0;
            for (i = 0; i < rowcount; i++) {
              for (j = 0; j < cellcount-1; j++) {
                if (i !== rowcount-1) {
                  if (tablearray[i][j] !== tablearray[i][j+1] || tablearray[i][j] !== tablearray[i+1][j]) {

                  } else {
                    flag = 1;
                  }
                } else {
                    if (tablearray[i][j] !== tablearray[i][j+1]) {

                    } else {
                      flag = 1;
                    }
                  }
              }
            }
            if (flag === 0) {
              //document.getElementsByClassName("grid2048").style.opacity = "0.2";
              //window.alert(5);
              var div = document.createElement("div");
              div.className = "gameover";
              div.innerHTML = "GameOver";
              document.getElementById("body").appendChild(div);
            }
          }
        }
    }
    addcolor();
  }
  function startNewGame() {
    var rowcount = 4;
    var cellcount = 4;
    document.getElementsByClassName("scorevalue")[0].innerHTML = "0";
    var gameterminate = document.getElementsByClassName("gameover")[0];
    //document.getElementById("body").removeChild(gameterminate);
  //  $('.grid2048').css('opacity', '1');
    if (score > document.getElementsByClassName("bestscorevalue")[0].innerHTML) {
      document.getElementsByClassName("bestscorevalue")[0].innerHTML = score;
    }
    score = 0;
    for (var i = 0; i < rowcount; i++) {
      for (var j= 0; j < cellcount; j++) {
      tablearray[i][j] = 0;
      document.getElementById("" + i.toString() + j.toString() + "").style.background = 'lightgrey';
      }
    }
      document.getElementById("body").removeChild(document.getElementById("table"));
      initialNumbers();
  }
