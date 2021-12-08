const fs = require("fs");

// reading the data
const input = fs
  .readFileSync("day-8-input.txt")
  .toString()
  .replace(/\n/g, " | ")
  .split(" | ")
  .map((row) => row.split("/n"));

// grabbing just the output as that is all that matters for part a
const outputOnly = [];
for (let index = 0; index < input.length; index++) {
  const element = input[index];
  if (index % 2 !== 0) {
    outputOnly.push(element);
  }
}

// creating constant numbers which contains numbers and their unique string legnth
const numbers = { 1: "cf", 4: "bcdf", 7: "acf", 8: "abcdefg" };
const numbersLength = Object.values(numbers).map((x) => x.length);

// a function that will count the number of times the output matches any length in our array input.
const letsCountNumbers = (numbersLength, input) => {
  let count = 0;
  for (let index = 0; index < input.length; index++) {
    const row = input[index][0];
    const rowSplit = row.split(" ");
    for (let code = 0; code < rowSplit.length; code++) {
      const element = rowSplit[code];
      if (numbersLength.includes(element.length)) {
        count += 1;
      }
    }
  }
  return count;
};

// printing the answer
console.log(
  "The number of times, 1,4,7 or 8 is present in the output is:",
  letsCountNumbers(numbersLength, outputOnly)
);
