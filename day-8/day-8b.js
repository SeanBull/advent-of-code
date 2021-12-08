const fs = require("fs");

// reading the data and sorting into a nice object
const data = fs
  .readFileSync("day-8-input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const splitLine = line.split(" | ");
    return { input: splitLine[0], output: splitLine[1] };
  });

// a function that will decode all the input by using logical rules to determine the codes for each number. it returns an object with each number and its code
const decoder = (input) => {
  const lettersArray = input.split(" ");
  let decode = {};
  while (Object.values(decode).length < 10) {
    for (let index = 0; index < lettersArray.length; index++) {
      const letters = lettersArray[index];
      if (letters.length === 2) {
        decode["1"] = letters;
      } else if (letters.length === 4) {
        decode["4"] = letters;
      } else if (letters.length === 3) {
        decode["7"] = letters;
      } else if (letters.length === 7) {
        decode["8"] = letters;
      } else if (letters.length === 5 && decode["4"] && decode["1"]) {
        const lilL = decode["4"]
          .split("")
          .filter((x) => !decode["1"].split("").includes(x));
        if (decode["1"].split("").every((char) => letters.includes(char))) {
          decode["3"] = letters;
        } else if (lilL.every((char) => letters.includes(char))) {
          decode["5"] = letters;
        } else {
          decode["2"] = letters;
        }
      } else if (letters.length === 6 && decode["7"] && decode["4"]) {
        if (!decode["7"].split("").every((char) => letters.includes(char))) {
          decode["6"] = letters;
        } else if (
          decode["4"].split("").every((char) => letters.includes(char))
        ) {
          decode["9"] = letters;
        } else {
          decode["0"] = letters;
        }
      }
    }
  }
  return decode;
};

// This function takes out output and decodes it using our solved code
const decryptor = (decode, output) => {
  stringNumber = "";
  output.split(" ").forEach((outputLetters) => {
    Object.values(decode).forEach((decodeLetters, idx) => {
      if (
        outputLetters.length === decodeLetters.length &&
        outputLetters
          .split("")
          .every((letter) => decodeLetters.includes(letter))
      )
        stringNumber += idx;
    });
  });
  return parseInt(stringNumber);
};
// loop to go through each line and decode and then add the returned number to the total
let total = 1;
for (let idx = 0; idx < data.length; idx++) {
  const line = data[idx];
  const decoded = decoder(line.input);
  total += decryptor(decoded, line.output);
}

console.log("The total sum of all the decoded outputs:", total);
