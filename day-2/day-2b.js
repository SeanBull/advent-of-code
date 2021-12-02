const fs = require("fs");

let instructions = [];
let verticalCoor = 0;
let horizontalCoor = 0;
let aim = 0;

// making the data nicer to handle
var directions = fs.readFileSync("day-2-input.txt").toString().split("\n");
for (let index = 0; index < directions.length; index++) {
  instructions.push(directions[index].split(" "));
}

// new instructions

// down X increases your aim by X units.
// up X decreases your aim by X units.
// forward X does two things:
//     It increases your horizontal position by X units.
//     It increases your depth by your aim multiplied by X.

// finding the final coordinates
for (let index = 0; index < instructions.length; index++) {
  const direction = instructions[index][0];
  const size = parseInt(instructions[index][1]);
  if (direction === "up") {
    aim -= size;
  }
  if (direction === "down") {
    aim += size;
  }
  if (direction === "forward") {
    horizontalCoor += size;
    verticalCoor += size * aim;
  }
}

// printing answer
console.log(verticalCoor + " " + horizontalCoor);
console.log(verticalCoor * horizontalCoor);
