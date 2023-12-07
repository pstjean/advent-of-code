import { readFileSync } from "fs";

// The Elf would first like to know which games would have been possible
// if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
const input = readFileSync("input.txt");
const inputArr = input.toString().replace(/\s+$/m, "").split("\n");
const split = inputArr.map((inp) => {
  const matches = /^(Game \d+:\s)(?<games>.*)/.exec(inp);
  return matches.groups.games.split("; ");
});
const rgb = split.map((games) => {
  return games.map((game) =>({
    r: parseInt(/\d+(?= red)/.exec(game)?.[0]) || 0,
    g: parseInt(/\d+(?= green)/.exec(game)?.[0]) || 0,
    b: parseInt(/\d+(?= blue)/.exec(game)?.[0]) || 0,
  }));
});

// 12 red cubes, 13 green cubes, and 14 blue cubes
const possibleGames = rgb.map((game, idx) => {
  const gameNo = idx + 1;
  const impossible = game.find((iteration) => {
    return iteration.r > 12 || iteration.g > 13 || iteration.b > 14
  })
  return impossible ? 0 : gameNo
})

console.log(possibleGames.reduce((sum, no) => { return sum + no}, 0))