import { readFileSync } from "fs";

// combining the first digit and the last digit
// (in that order) to form a single two-digit number.
// The digits may be spelled out ('one' through 'nine')
// Add them together
const digitMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const input = readFileSync("input.txt");
const inputArr = input.toString().replace(/\s+$/m, "").split("\n");
const digits = inputArr
  .map((ln) =>
    [
      ...ln.matchAll(
        /(?=(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|([0-9]))/g
      ),
    ]
      .flatMap((match) => match.filter(Boolean))
      .filter((i) => !!i)
  )
  .map((arr) =>
    [arr[0], arr[arr.length - 1]]
      .map((itm) => (Object.keys(digitMap).includes(itm) ? digitMap[itm] : itm))
      .join("")
  );

const finalValue = digits.reduce((acc, val) => {
  return acc + parseInt(val);
}, 0);

console.log(finalValue);

// 53389
// 53717 => too high
// 53407 => too high
