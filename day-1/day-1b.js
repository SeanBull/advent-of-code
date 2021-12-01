const fs = require("fs");

let count = 0;
let otherCount = 0;
let slidingArray = [];

var array = fs.readFileSync("day-1-input.txt").toString().split("\n");

// creating the sliding values and forming a loopable array
for (let index = 0; index < array.length; index++) {
  const element = array[index];
  if (index < 2) {
    continue;
  }
  const slidingTotal =
    parseInt(array[index]) +
    parseInt(array[index - 1]) +
    parseInt(array[index - 2]);
  slidingArray.push(slidingTotal);
}

// counting the incrementing sliding values
for (let index = 0; index < slidingArray.length; index++) {
  const element = slidingArray[index];
  if (index === 0) {
    continue;
  }
  const previous = slidingArray[index - 1];
  if (element > previous) count++;
  if (element <= previous) otherCount++;
}

// sanity check

console.log("Legnth of array " + array.length);
console.log("Legnth of sliding array: " + slidingArray.length);
console.log("---------------------------------------------------");

console.log("total increasing: " + count);
console.log("total: " + slidingArray.length);
console.log("less that or equal: " + otherCount);
console.log("added together: " + (count + otherCount));
