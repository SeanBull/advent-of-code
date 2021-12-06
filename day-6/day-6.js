const fs = require("fs");

// reading the data
const initialFishData = fs
  .readFileSync("day-6-input.txt")
  .toString()
  .split(",")
  .map((x) => parseInt(x));

const betterFishData = {};

// creating a dictionary which counts the number of fish on each day, to help with compute
for (let day = 0; day < 7; day++) {
  const dayTotal = initialFishData.filter((number) => number === day).length;
  betterFishData[day] = dayTotal;
}
betterFishData[8] = 0;
betterFishData[7] = 0;

//our fish simulation function which will loop through the desired days and apply the fish breeding rules
// ie:    fish on 0 spawn a fish each on 8 days. They themselves are set to 6/
//        every other fish is reduced by 1 day.
const fishSimulation = (fishData, days) => {
  for (let day = 0; day < days; day++) {
    const tempFishData = { ...fishData };
    for (let key = 0; key < 9; key++) {
      const fishOnDay = fishData[key];
      if (key === 0) {
        //rules for birthing fish at day 0
        tempFishData[key] -= fishOnDay;
        tempFishData[6] += fishOnDay;
        tempFishData[8] += fishOnDay;
      } else {
        //rules for rest of fish
        tempFishData[key] -= fishOnDay;
        tempFishData[key - 1] += fishOnDay;
      }
    }
    fishData = tempFishData;
  }
  //summing the total fishes from each day to find the total fish at the end
  const totalFish = Object.values(fishData).reduce((prev, curr) => prev + curr);
  return totalFish;
};

//running our function to get answers to a and b of day 6
const year = 256;
const days = 80;
const fishOneYear = fishSimulation(betterFishData, year);
const fish80Days = fishSimulation(betterFishData, 80);

//printing our answer wooo
console.log("Omg there are", fish80Days, "after", days, "days!");
console.log("Omg there are", fishOneYear, "after", year, "days!");
console.log("The fish took over the ocean... they will come for the land next");
