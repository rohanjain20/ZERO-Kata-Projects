const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
const box5 = document.querySelector("#box5");
const box6 = document.querySelector("#box6");
const box7 = document.querySelector("#box7");
const box8 = document.querySelector("#box8");
const box9 = document.querySelector("#box9");
const main_container = document.querySelector(".main_container");

const submitBtn = document.querySelector(".submitBtn");
const clearBtn = document.querySelector(".clearBtn");
var pos1 = [null];
var pos2 = [null];
var win = false;
var lose = false;
submitBtn.onclick = computerMove;
clearBtn.onclick = () => {
  location.reload();
};
var grid = [
  {
    obj: box1,
    index: [0, 0],
    val: null,
  },
  {
    obj: box2,
    index: [1, 0],
    val: null,
  },
  {
    obj: box3,
    index: [2, 0],
    val: null,
  },
  {
    obj: box4,
    index: [0, 1],
    val: null,
  },
  {
    obj: box5,
    index: [1, 1],
    val: null,
  },
  {
    obj: box6,
    index: [2, 1],
    val: null,
  },
  {
    obj: box7,
    index: [0, 2],
    val: null,
  },
  {
    obj: box8,
    index: [1, 2],
    val: null,
  },
  {
    obj: box9,
    index: [2, 2],
    val: null,
  },
];
box1.onchange = () => {
  pos1 = getIndex(box1);
};
box2.onchange = () => {
  pos1 = getIndex(box2);
};
box3.onchange = () => {
  pos1 = getIndex(box3);
};
box4.onchange = () => {
  pos1 = getIndex(box4);
};
box5.onchange = () => {
  pos1 = getIndex(box5);
};
box6.onchange = () => {
  pos1 = getIndex(box6);
};
box7.onchange = () => {
  pos1 = getIndex(box7);
};
box8.onchange = () => {
  pos1 = getIndex(box8);
};
box9.onchange = () => {
  pos1 = getIndex(box9);
};

function getIndex(box) {
  for (var i in grid) {
    if (grid[i].obj == box) {
      return grid[i].index;
    }
  }
}

function computerMove() {
  resut();
  var zeroCount = 0;
  var crossCount = 0;

  for (var i in grid) {
    if (grid[i].index == pos1 && grid[i].obj.value != "x") {
      main_container.style.backgroundColor = "red";
      setTimeout(() => {
        alert("Invalid Move!");
        location.reload();
      }, 500);
      //   console.log("aa ki kita?");
    }
    if (grid[i].obj.value == "x") {
      ++crossCount;
    }
    if (grid[i].obj.value == "0") {
      ++zeroCount;
    }
    if (grid[i].obj.value != "x" || grid[i].obj.value == "0") {
    }
  }
  if (crossCount > zeroCount + 1) {
    main_container.style.backgroundColor = "red";
    setTimeout(() => {
      alert("Invalid Move!");
      location.reload();
    }, 500);
  }

  if (crossCount == 5 && !win && !lose) {
    alert("It's a draw");
    location.reload();
  }

  var count = 0;
  for (var i in grid) {
    if (grid[i].obj.value != "") {
      grid[i].val = 1;
      count++;
    }
  }

  if (box5.value == "" && count == 1) {
    box5.value = 0;
    pos2 = pos1;
  } else if (pos1[1] == pos2[1] && pos2[1] != 1) {
    // console.log("vertical move");
    verticalMove(pos1);
    pos2 = pos1;
  } else if (pos1[0] == pos2[0] && pos2[0] != 1) {
    horizontal(pos1);
  } else if (box5.value == "x" && box7.value == "x" && box3.value == "") {
    box3.value = 0;
    pos2 = pos1;
  } else if (pos1[1] == pos2[1] && box5.value == "x") {
    verticalMove(pos1);
    pos2 = pos1;
  } else if (pos1[0] == pos2[0] && box5.value == "x") {
    horizontal(pos1);
    pos2 = pos1;
  } else {
    randomMove();
  }
}

function verticalMove(pos1) {
  // console.log("vertical");
  var fail = 0;
  var x = pos1[1];
  for (var i in grid) {
    if (grid[i].index[1] == x && grid[i].obj.value == "") {
      grid[i].obj.value = 0;
    } else {
      ++fail;
    }
  }
  if (fail == 9) {
    // console.log("failed");
    randomMove();
  }

  pos2 = pos1;
}

function horizontal(pos1) {
  // console.log("horizontal");
  var fail = 0;
  var x = pos1[0];
  for (var i in grid) {
    if (grid[i].index[0] == x && grid[i].obj.value == "") {
      grid[i].obj.value = 0;
    } else {
      ++fail;
    }
  }
  if (fail == 9) {
    // console.log("failed");
    randomMove();
  }
  pos2 = pos1;
}

function randomMove() {
  // console.log("random");
  for (var i in grid) {
    if (grid[i].obj.value == "") {
      grid[i].obj.value = 0;
      break;
    }
  }
  pos2 = pos1;
}

function resut() {
  //horizontal win situation
  var horizontalCross = 0;
  for (var j = 0; j <= 2; j++) {
    horizontalCross = 0;
    for (var x in grid) {
      if (grid[x].index[0] == j) {
        if (grid[x].obj.value == "x") {
          ++horizontalCross;
        }
      }
    }
    if (horizontalCross == 3) {
      win = true;
      alert("You Win!");
      location.reload();
    }
    horizontalCross = 0;
  }
  //vertical win situation
  var verticalCross = 0;
  for (var j = 0; j <= 2; j++) {
    verticalCross = 0;
    for (var x in grid) {
      if (grid[x].index[1] == j) {
        if (grid[x].obj.value == "x") {
          ++verticalCross;
        }
      }
    }
    if (verticalCross == 3) {
      win = true;
      alert("You Win!");
      location.reload();
    }
    verticalCross = 0;
  }

  //diagnal situation
  if (box7.value == "x" && box5.value == "x" && box3.value == "x") {
    win = true;
    alert("You Win!");
    location.reload();
  }

  //lose situations
  var horizontalzero = 0;
  for (var j = 0; j <= 2; j++) {
    horizontalzero = 0;
    for (var x in grid) {
      if (grid[x].index[0] == j) {
        if (grid[x].obj.value == "0") {
          ++horizontalzero;
        }
      }
    }
    if (horizontalzero == 3) {
      alert("You lose:(");
      location.reload();
    }
    horizontalzero = 0;
  }
  //vertical win situation
  var verticalzero = 0;
  for (var j = 0; j <= 2; j++) {
    verticalzero = 0;
    for (var x in grid) {
      if (grid[x].index[1] == j) {
        if (grid[x].obj.value == "0") {
          ++verticalzero;
        }
      }
    }
    if (verticalzero == 3) {
      lose = true;
      alert("You lose:(");
      location.reload();
    }
    verticalzero = 0;
  }

  //diagnal situation
  if (box7.value == "0" && box5.value == "0" && box3.value == "0") {
    lose = true;
    alert("You lose:(");
    location.reload();
  }
  if (box1.value == "0" && box5.value == "0" && box9.value == "0") {
    lose = true;
    alert("You lose:(");
    location.reload();
  }
}