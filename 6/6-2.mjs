import { readFileSync } from "fs";

const input = readFileSync("input.txt");
const inputArr = input.toString().replace(/\s+$/m, "").split("\n");
const [time, recordDistance] = inputArr.map((line) =>
  parseInt(line.split(":")[1].split(" ").filter(Boolean).join(""))
);

let recordBreakers = 0;
for(let speed = 0; speed <= time; speed++) {
  const distance = speed * (time - speed)
  if(distance > recordDistance) recordBreakers++
}

console.log(recordBreakers)
