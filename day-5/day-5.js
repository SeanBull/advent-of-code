const { Console } = require("console");
const fs = require("fs");

// making the data easy to use
const input = fs.readFileSync("./day-5-input.txt").toString().split("\n");
const lines = input.map((l) =>
  l.split("->").map((p) => p.split(",").map((x) => parseInt(x)))
);

//A range function that we can use to create an axis points
const range = (in1, in2) => {
  const length = Math.abs(in1 - in2) + 1;
  const smallest = in1 < in2 ? in1 : in2;
  returningArray = Array(length)
    .fill(69)
    .map((_, idx) => smallest + idx);
  if (in1 < in2) return returningArray.reverse();
  else return returningArray;
};

//simple checkers so we know if the line is horizontal or vertical
const verticalChecker = (input) => input[0][0] === input[1][0];
const horizontalChecker = (input) => input[0][1] === input[1][1];

// here we have a simple functin that reduces the array to only give coordinatesw that have two or more lines on the position
const arrayCounter = (input) => {
  return input.reduce(
    (valibalibooboo, currRorrowow) =>
      currRorrowow.reduce((prev, curr) => prev + (curr > 1 ? 1 : 0), 0) +
      valibalibooboo,
    0
  );
};

//now we have a for loop that will go through each line in our data:
//    - check if the coordinates give a striang (vertical|horizontal) or diagonal line
// - work out all points the line will include
// - add 1 to our megaArray to symbolise the line on this point
const overLapCounter = (lines, diagonals) => {
  //creating an array that will fit all our numbers - max is around 1000
  let megaArray = Array(1000)
    .fill(0)
    .map((x) => Array(1000).fill(0));

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (horizontalChecker(line)) {
      let xRange = range(line[0][0], line[1][0]);
      const y = line[0][1];
      for (const x of xRange) {
        megaArray[x][y] += 1;
      }
    } else if (verticalChecker(line)) {
      let yRange = range(line[0][1], line[1][1]);
      const x = line[0][0];
      for (const y of yRange) {
        megaArray[x][y] += 1;
      }
    } else if (diagonals) {
      let xRange = range(line[0][0], line[1][0]);
      let yRange = range(line[0][1], line[1][1]);
      let xyRange = xRange.map((val, idx) => [val, yRange[idx]]);
      for ([x, y] of xyRange) {
        megaArray[x][y] += 1;
      }
    }
  }

  return arrayCounter(megaArray);
};

console.log(
  "The number of overlapping vents without diagonals is:",
  overLapCounter(lines, false)
);
console.log(
  "The number of overlapping vents with diagonals is:",
  overLapCounter(lines, true)
);

// // checking reduce line with longer code
// let answer = [];
// for (let row = 0; row < megaArray.length; row++) {
//   const above1 = megaArray[row].filter((number) => number > 1);
//   answer.push(above1.length);
// }
// console.log(answer);
// numberAns = answer.reduce((prev, current) => prev + current);
// console.log(numberAns);
