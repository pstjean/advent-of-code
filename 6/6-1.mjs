import { readFileSync } from "fs";

const input = readFileSync("input.txt");
const inputArr = input.toString().replace(/\s+$/m, "").split("\n");
const timeAndDistance = inputArr.map((line) =>
  line
    .split("  ")
    .slice(1)
    .filter(Boolean)
    .map((num) => parseInt(num.trim()))
);

const timeDistanceTuples = timeAndDistance[0].map((time, idx) => [
  time,
  timeAndDistance[1][idx],
]);

const raceWinners = timeDistanceTuples.map(([time, recordDistance]) => {
  let recordBreakers = 0;
  for (let speed = 0; speed <= time; speed++) {
    const distance = speed * (time - speed);
    if (distance > recordDistance) recordBreakers++;
  }
  return recordBreakers;
});

console.log(
  raceWinners.reduce((product, winners) => {
    return product * winners;
  }, 1)
);
