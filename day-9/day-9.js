const fs = require("fs");

// reading the data and sorting into an array of arrays of each line
const data = fs
  .readFileSync("day-9-input.txt")
  .toString()
  .split("\n")
  .map((row) => row.split("").map((x) => parseInt(x)));

// for a point to be counted it must be lower than the point (n-1, n), (n+1, n)
// the point (n, n+1)
// the point(n, n-1)

// loop each point and apply, add risk to a total if it passes or continue past value otherwise. Return our risk total
const lowPointReturner = (data) => {
  totalRisk = 0;
  lowPoints = [];
  for (let line = 0; line < data.length; line++) {
    const row = data[line];
    for (let col = 0; col < row.length; col++) {
      const point = row[col];

      prevCol = col - 1;
      nextCol = col + 1;
      prevRow = line - 1;
      nextRow = line + 1;

      if (prevCol >= 0 && row[prevCol] <= point) continue;
      if (nextCol < row.length && row[nextCol] <= point) continue;
      if (prevRow >= 0 && data[prevRow][col] <= point) continue;
      if (nextRow < data.length && data[nextRow][col] <= point) continue;
      risk = point + 1;
      totalRisk += risk;
      lowPoints.push([line, col]);
    }
  }
  return { totalRisk: totalRisk, lowPoints: lowPoints };
};

console.log("The total risk is:", lowPointReturner(data).totalRisk);

// part B

// getting our array of low points
const lowPointsArray = lowPointReturner(data).lowPoints;
// cerating an object for the points the checker has already covered
const covered = {};
// loop each point and apply, add risk to a total if it passes or continue past value otherwise. Return our risk total
const basinSize = (row, col) => {
  const point = [row, col];
  if (covered[`${row},${col}`] || data[row][col] === 9) return 0;
  let size = 1;
  covered[`${row},${col}`] = "rat";
  if (row > 0) {
    size += basinSize(row - 1, col);
  }
  if (row < data.length - 2) {
    size += basinSize(row + 1, col);
  }
  if (col < data[0].length - 1) {
    size += basinSize(row, col + 1);
  }
  if (col > 0) {
    size += basinSize(row, col - 1);
  }
  return size;
};

// a function that will loop through our basin low points using the basinSize function and will return an ordered array of the total size
const basinSizeReturner = (lowPointsArray) => {
  const basinSizes = [];

  for (let point = 0; point < lowPointsArray.length; point++) {
    const [x, y] = lowPointsArray[point];
    basinSizes.push({ size: basinSize(x, y), coors: [x, y] });
  }

  const ascending = basinSizes.map((x) => x.size).sort((a, b) => a - b);
  return ascending.reverse();
};

// running functions and printing the answer
const orderedBasinSizes = basinSizeReturner(lowPointsArray);
const answer =
  orderedBasinSizes[0] * orderedBasinSizes[1] * orderedBasinSizes[2];
console.log("The three lardest basin sizes multiplied gives:", answer);
