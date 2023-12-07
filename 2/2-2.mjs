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
  return games.map((game) => ({
    r: parseInt(/\d+(?= red)/.exec(game)?.[0]) || 0,
    g: parseInt(/\d+(?= green)/.exec(game)?.[0]) || 0,
    b: parseInt(/\d+(?= blue)/.exec(game)?.[0]) || 0,
  }));
});

// 12 red cubes, 13 green cubes, and 14 blue cubes
const maxRgb = rgb.map((game, idx) => {
  return game
    .reduce(
      (acc, game) => {
        return [
          game.r > acc[0] ? game.r : acc[0],
          game.g > acc[1] ? game.g : acc[1],
          game.b > acc[2] ? game.b : acc[2],
        ];
      },
      [0, 0, 0]
    )
});

const powers = maxRgb.map(([r,g,b]) => r * g * b)

console.log(powers.reduce((sum, pwr) => sum + pwr));
