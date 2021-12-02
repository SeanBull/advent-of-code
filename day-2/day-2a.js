const fs = require("fs");

let instructions = [];
let verticalCoor = 0;
let horizontalCoor = 0;

// making the data easy to use
var directions = fs.readFileSync("day-2-input.txt").toString().split("\n");
for (let index = 0; index < directions.length; index++) {
  instructions.push(directions[index].split(" "));
}

// instructions

// forward X increases the horizontal position by X units.
// down X increases the depth by X units.
// up X decreases the depth by X units.

// finding our coordinates
for (let index = 0; index < instructions.length; index++) {
  const direction = instructions[index][0];
  const size = parseInt(instructions[index][1]);
  if (direction === "up") {
    verticalCoor -= size;
  }
  if (direction === "down") {
    verticalCoor += size;
  }
  if (direction === "forward") {
    horizontalCoor += size;
  }
}

// printing answer
console.log(verticalCoor + " " + horizontalCoor);
console.log(verticalCoor * horizontalCoor);
