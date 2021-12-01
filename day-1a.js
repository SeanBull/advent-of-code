const fs = require("fs");

let count = 0;
let otherCount = 0;

var array = fs.readFileSync("day-1-input.txt").toString().split("\n");
for (let index = 0; index < array.length; index++) {
  const element = array[index];
  if (index === 0) {
    continue;
  }
  const previous = array[index - 1];
  if (parseInt(element) > parseInt(previous)) count++;
  if (parseInt(element) <= parseInt(previous)) otherCount++;
}

// Sanity check
console.log("total increasing: " + count);
console.log("total: " + array.length);
console.log("less that or equal: " + otherCount);
console.log("added together: " + (count + otherCount));
