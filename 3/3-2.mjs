import { readFileSync } from "fs";

const input = readFileSync("input.txt");
const inputArr = input.toString().replace(/\s+$/m, "").split("\n");

let gearTotal = 0;
for (const [index, line] of inputArr.entries()) {
  const gears = [...line.matchAll(/\*+/g)].map((match) => [
    match[0],
    match.index,
  ]);
  if (gears.length < 1) continue;

  const digits = [
    inputArr[index - 1],
    inputArr[index],
    inputArr[index + 1],
  ].map((symLine) =>
    [...(symLine?.matchAll(/\d+/g) || [])].map((match) => [
      match[0],
      match?.index,
    ])
  );

  const digitLocs = digits.map((digit) => {
    if (digit.length === 0) return [];
    return digit.flatMap(([match, index]) => ({
      digit: match,
      indices: Array(match.length + 2)
        .fill()
        .map((_, idx) => idx + index - 1),
    }));
  });

  const eachDigit = digitLocs
    .filter((el) => el.length > 0)
    .map((digitLine) => digitLine.map((digitLoc) => digitLoc))
    .flat();

  const filteredDigits = gears
    .map((gear) =>
      eachDigit
        .filter((digit) => digit.indices.includes(gear[1]))
        .map(({ digit }) => parseInt(digit))
    )
    .filter((gearNeighbors) => gearNeighbors.length === 2)
    .map(([one, two]) => one * two);
  if (filteredDigits.length < 1) continue;
  const sumOfGearsInRow = filteredDigits.reduce((sum, digit) => sum + digit);
  gearTotal += sumOfGearsInRow;
}

console.log(gearTotal);
