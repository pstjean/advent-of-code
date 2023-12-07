import { readFileSync } from "fs";

const input = readFileSync("input.txt");
const inputArr = input.toString().replace(/\s+$/m, "").split("\n");
const digits = inputArr.map((line, index) => {
  const symbols = [
    inputArr[index - 1],
    inputArr[index],
    inputArr[index + 1],
  ].map((symLine) =>
    [...(symLine?.matchAll(/\*+/g) || [])].map((match) => [
      match[0],
      match?.index,
    ])
  );

  const symbolLocs = symbols.map((symbol) => {
    if (symbol.length === 0) return [];
    return symbol.flatMap(([match, index]) =>
      Array(match.length)
        .fill()
        .map((_, idx) => idx + index)
    );
  });

  const digitsWithIndex = [...line.matchAll(/\d+/g)].map((match) => ({
    num: match[0],
    indices: Array(match[0].length + 2)
      .fill()
      .map((_, idx) => idx + match.index - 1),
  }));

  const adjacentSymbols = digitsWithIndex.map(({ num, indices }) => {
    return {
      num,
      symbols: symbolLocs
        .map((lineLocs) => lineLocs.filter((loc) => indices.includes(loc)))
        .flat(),
    };
  });
  return adjacentSymbols;
});

const partNumbers = digits
  .map((digitLine) =>
    digitLine
      .filter((digitMatch) => digitMatch.symbols.length > 0)
      .map(({ num }) => parseInt(num))
  )
  .flat();

console.log(partNumbers.reduce((sum, partNo) => sum + partNo));
