const fs = require("fs");

const specialArray = new Array(12).fill(0);

// making the data easy to use
const binaryNums = fs.readFileSync("day-3-input.txt").toString().split("\n");

// function that returns the length two strings are matching
const findMatchingLength = (string1, string2) => {
  for (let index = 0; index < string1.length; index++) {
    const string1Slice = string1.slice(0, index);
    const string2Slice = string2.slice(0, index);

    if (string1Slice !== string2Slice) {
      return index - 1;
    }
  }
  return string1.length;
};

// function that removes binary numbers that dont match the passed condition from an array
const reduceCandidates = (candidatesArray, condition, index) => {
  let cardinalIndicator = 0;
  let onesFilteredArray = [];
  let zeroesFilteredArray = [];
  candidatesArray.forEach((binaryString) => {
    if (binaryString[index] === "1") onesFilteredArray.push(binaryString);
    else zeroesFilteredArray.push(binaryString);
    cardinalIndicator += binaryString[index] === "1" ? 1 : -1;
  });
  const mostCommonArray =
    cardinalIndicator >= 0 ? onesFilteredArray : zeroesFilteredArray;
  const leastCommonArray =
    cardinalIndicator < 0 ? onesFilteredArray : zeroesFilteredArray;
  return condition === "most" ? mostCommonArray : leastCommonArray;
};

// function that gets the rating to give us our answer
const retrieveRating = (condition, startingArray) => {
  let idx = 0;
  let filterArray = startingArray;
  while (filterArray.length > 1) {
    filterArray = reduceCandidates(filterArray, condition, idx);
    idx++;
  }
  return parseInt(filterArray[0], 2);
};

// running function for answer
const mostCommon = retrieveRating("most", binaryNums);
const leastCommon = retrieveRating("least", binaryNums);

// printing answer
console.log("last candidate for most common matches(o2):", mostCommon);
console.log("last candidate for the least common matches(co2):", leastCommon);
console.log("life support rating:", mostCommon * leastCommon);

// misread question but keeping code :)
// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
// }

// const binaryStringMatcher = (binaryString, binaryStringArray) => {
//   let worldRecord = { index: 0, length: 0 };

//   for (let index = 0; index < binaryStringArray.length; index++) {
//     const line = binaryStringArray[index];
//     const length = findMatchingLength(binaryString, line);
//     if (worldRecord.length < length) {
//       worldRecord = { index, length };
//     }
//   }
//   return worldRecord;
// };

// const commonMatchWr = binaryStringMatcher(binStringCommon, binaryNums);
// const leastCommonMatchWr = binaryStringMatcher(
//   binStringLeastCommon,
//   binaryNums
// );
// console.log(binStringLeastCommon);
// console.log(leastCommonMatchWr);
// console.log(binaryNums[161]);

// const oxygenRating = parseInt(binaryNums[commonMatchWr.index], 2);
// const Co2Rating = parseInt(binaryNums[leastCommonMatchWr.index], 2);

// // printing answer
// console.log("this is the largest match to the common binary:", oxygenRating);
// console.log("this is the largest match to the least common binary:", Co2Rating);
// console.log("This is the life support rating:", oxygenRating * Co2Rating);
