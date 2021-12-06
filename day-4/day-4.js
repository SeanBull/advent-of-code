const fs = require("fs");

// reading the data
const matricesInput = fs.readFileSync("day-4-input.txt").toString();
const drawInput =
  "17,2,33,86,38,41,4,34,91,61,11,81,3,59,29,71,26,44,54,89,46,9,85,62,23,76,45,24,78,14,58,48,57,40,21,49,7,99,8,56,50,19,53,55,10,94,75,68,6,83,84,88,52,80,73,74,79,36,70,28,37,0,42,98,96,92,27,90,47,20,5,77,69,93,31,30,95,25,63,65,51,72,60,16,12,64,18,13,1,35,15,66,67,43,22,87,97,32,39,82";
const draw = drawInput.split(",");

//function to create matrix from string input
const createMatrix = (matrix) =>
  matrix.split("\n").map((row) => row.split(" ").filter((item) => item !== ""));

//makign the matrices from the input
const matrices = matricesInput.split("\n\n").map(createMatrix);
const transpose = (matrix) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

//function to sum unmarked cards
const sumUnmarked = (matrix, draw) =>
  matrix
    .flat()
    .filter((el) => !draw.includes(el))
    .reduce((partial_sum, el) => partial_sum + parseInt(el), 0);

//function to return card if all numbers are hit
const hasBingo = (matrix, draw, size) => {
  const checkRows = (matrix) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!draw.includes(matrix[i][j])) break;
        if (j < size - 1) continue;
        return { sumUnmarked: sumUnmarked(matrix, draw), matrix };
      }
    }
    return false;
  };

  return checkRows(matrix) || checkRows(transpose(matrix));
};

//our function to find bingo
const findBingo = () => {
  let bingoResult;
  let lastDraw;
  for (let idx = 5; idx < draw.length; idx++) {
    const subDraw = draw.slice(0, idx);
    for (const matrix of matrices) {
      bingoResult = hasBingo(matrix, subDraw, 5);
      if (bingoResult) {
        lastDraw = parseInt(subDraw.pop());
        break;
      }
    }
    if (bingoResult)
      return {
        ...bingoResult,
        lastDraw,
      };
  }
};

// part two
const losingMatrices = [...matrices];
//function that will find the losing bingo card
const losingBingo = () => {
  let losingMatrix;
  for (let idx = 5; idx < draw.length; idx++) {
    const subDraw = draw.slice(0, idx);
    for (const matrix of [...losingMatrices]) {
      bingoResult = hasBingo(matrix, subDraw, 5);
      if (bingoResult) losingMatrices.splice(losingMatrices.indexOf(matrix), 1);
      if (losingMatrices.length === 1) losingMatrix = losingMatrices[0];
      if (losingMatrices.length === 0) {
        return {
          sumUnmarked: sumUnmarked(losingMatrix, subDraw),
          lastDraw: subDraw.pop(),
          matrix: losingMatrix,
        };
      }
    }
  }
};

const bingo = findBingo();
const winningScore = bingo.sumUnmarked * bingo.lastDraw;

console.log("The final score of our best score is", winningScore);
const losingMatrix = losingBingo();
const losignMatrixScore = losingMatrix.lastDraw * losingMatrix.sumUnmarked;
console.log("The board that wins last will have a score of", losignMatrixScore);
