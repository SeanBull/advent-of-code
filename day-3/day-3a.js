const fs = require("fs");

const specialArray = new Array(12).fill(0);

// making the data easy to use
const binaryNums = fs.readFileSync("day-3-input.txt").toString().split("\n");

for (let index = 0; index < binaryNums.length; index++) {
  const element = binaryNums[index];
  for (let col = 0; col < element.length; col++) {
    const number = element[col];
    specialArray[col] += number == 1 ? 1 : -1;
  }
}

const mostCommonNums = specialArray.map((e) => (e > 1 ? 1 : 0));
const leastCommonNums = mostCommonNums.map((e) => (e == 1 ? 0 : 1));

const gamma = parseInt(mostCommonNums.join(""), 2);
const epsilon = parseInt(leastCommonNums.join(""), 2);
const powerConsumption = epsilon * gamma;

// printing answer
// console.log(mostCommonNums);
// console.log(leastCommonNums);
// console.log(specialArray);
console.log("your gamma number is:", gamma);
console.log("your epsilon number is:", epsilon);
console.log("your power consumption is:", powerConsumption);
