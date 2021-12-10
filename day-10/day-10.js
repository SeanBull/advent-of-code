const fs = require("fs");

// reading the data and sorting into an array of arrays of each line
const data = fs.readFileSync("day-10-input.txt").toString().split("\n");
// objects to make checking opening and closing easier
const pairs = { "{": "}", "(": ")", "[": "]", "<": ">" };
const closingPairs = { "}": "{", ")": "(", "]": "[", ">": "<" };
// objects to make scoring easy
const scores = { "{": 1197, "(": 3, "[": 57, "<": 25137 };
const scoresB = { "{": 3, "(": 1, "[": 2, "<": 4 };

// a function that checks to inputs to see if they match ie ( )
const pairChecker = (open, close) => {
  if (close === pairs[open]) return true;
  else false;
};

// a function that will follow our scoring rules total * 5 + points
const scoreFinder = (endingLine) => {
  let score = 0;
  for (let index = 0; index < endingLine.length; index++) {
    const bracket = endingLine[index];
    score *= 5;
    score += scoresB[bracket];
  }
  return score;
};

const medianFinder = (lineScores) => {
  const ascending = lineScores.sort((a, b) => a - b);
  return ascending[Math.floor(lineScores.length / 2)];
};

// creating a loop to go through all our lines and get the answers to both parts
const scoreRecorder = (data) => {
  total = 0;
  const lineScores = [];
  for (let rowNum = 0; rowNum < data.length; rowNum++) {
    const line = data[rowNum];
    const opners = [];
    let error = false;
    for (let colNum = 0; colNum < line.length; colNum++) {
      const bracket = line[colNum];
      //checking if the bracket is an opener
      if (Object.keys(pairs).includes(bracket)) {
        opners.push(bracket);
        // checking if the bracket is matching
      } else if (!pairChecker(opners.pop(), bracket)) {
        total += scores[closingPairs[bracket]];
        error = true;
        break;
      }
    }
    // if there was no error, finish the line and count the score (note to finish the line it is the matching bracker for the openers but in reverse, so we use this)
    if (error === false) {
      reversed = opners.reverse();
      lineScores.push(scoreFinder(reversed));
    }
  }

  return { invalid: total, incomplete: medianFinder(lineScores) };
};

const finalScore = scoreRecorder(data);

console.log("The total score from the invalid lines is:", finalScore.invalid);

console.log("The score from the incomplete lines is:", finalScore.incomplete);
