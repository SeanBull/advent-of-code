const fs = require("fs");

// reading the data
const initialPostions = fs
  .readFileSync("day-7-input.txt")
  .toString()
  .split(",")
  .map((x) => parseInt(x));

// calculator that returns the total fuel usage for a meeting point, it allows you to pass in a function to represent fuel consumption equation
const fuelCalculator = (equation, guess) => {
  totalFuel = 0;
  for (let crab = 0; crab < initialPostions.length; crab++) {
    const crabInitialPosition = initialPostions[crab];
    totalFuel += equation(crabInitialPosition, guess);
  }
  return totalFuel;
};

// function that takes upper and lower and returns new upper and lower for the winning value (lowest result from fuel calculator)
const guessCompare = (equation, upper, lower) => {
  const newBounds = { upper, lower };
  lowerMiddle = Math.floor((upper + lower) / 2);
  upperMiddle = lowerMiddle + 1;

  if (
    fuelCalculator(equation, lowerMiddle) <
    fuelCalculator(equation, upperMiddle)
  )
    newBounds.upper = lowerMiddle;
  else newBounds.lower = upperMiddle;
  return newBounds;
};

//the function that will find our answer by looping our initial upper and lower and then our returned upper and lower into the guesscompare function
const pointFinder = (equation) => {
  let bounds = {
    upper: Math.max(...initialPostions),
    lower: Math.min(...initialPostions),
  };
  while (bounds.upper !== bounds.lower) {
    bounds = guessCompare(equation, bounds.upper, bounds.lower);
  }
  //   returning an object with our winning point and the fuel consumption
  return {
    point: bounds.lower,
    fuel: fuelCalculator(equation, bounds.lower),
  };
};

// equation for part one, which is a simple use case
const simple = (crabInitialPosition, guess) =>
  Math.abs(crabInitialPosition - guess);

// equation for part two using the crab formula and (n^2+n) /2 (gauss)
const fuelChange = (steps) => steps * ((steps + 1) / 2);
const crabEngineering = (crabInitialPosition, guess) =>
  fuelChange(Math.abs(crabInitialPosition - guess));

// running the finder for both equations and printing our answers woo!
const partOne = pointFinder(simple);
console.log("The best number to arrange on is:", partOne.point);
console.log("The fuel consumption is:", partOne.fuel, "\n");
console.log("Idiot... thats not how crab submarines work... \n");
const crabsAreRight = pointFinder(crabEngineering);
console.log("The actual best number to arrange on is:", crabsAreRight.point);
console.log("The real fuel consumption is:", crabsAreRight.fuel);
