const { Console } = require("console");
const fs = require("fs");

const specialArray = new Array(12).fill(0);

// making the data easy to use
const input = fs.readFileSync("day-5-input.txt").toString().split("\n");
const lines = input.map((l) =>
  l.split("->").map((p) => p.split(",").map((x) => parseInt(x)))
);

const range = (in1, in2) => {
  const length = Math.abs(in1 - in2) + 1;
  const smallest = in1 < in2 ? in1 : in2;
  return Array(length)
    .fill(69)
    .map((_, idx) => smallest + idx);
};

const verticalChecker = (input) => input[0][0] === input[1][0];
const horizontalChecker = (input) => input[0][1] === input[1][1];

let megaArray = Array(1000)
  .fill(0)
  .map((x) => Array(1000).fill(0));
// let testArray = Array(6).fill(0).map((x) => Array(6).fill(0));
// for ([x, y] of newxyRange) {
//   megaArray[x][y] += 1;
// }

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
  } else {
    let xRange = range(line[0][0], line[1][0]);
    let yRange = range(line[0][1], line[1][1]);
    let xyRange = xRange.map((val, idx) => [val, yRange[idx]]);
    for ([x, y] of xyRange) {
      megaArray[x][y] += 1;
    }
  }
}

console.log(
  megaArray.reduce(
    (valibalibooboo, currRorrowow) =>
      currRorrowow.reduce((prev, curr) => prev + (curr > 1 ? 1 : 0), 0) +
      valibalibooboo,
    0
  )
);
