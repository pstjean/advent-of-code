import { readFileSync } from "fs";

const input = readFileSync("input.txt");
const inputArr = input.toString().replace(/\s+$/m, "").split("\n");

const split = inputArr.map((inp) => {
  const matches = /^(Card\s+\d+:\s+)(?<cards>.*)/.exec(inp);

  const [winning, ours] = matches.groups.cards.split("|").map((numlist) =>
    numlist
      .split(" ")
      .filter(Boolean)
      .map((num) => parseInt(num))
  );
  return { winning, ours };
});

const winsByCard = split.map(({ winning, ours }) =>
  ours.reduce((wins, num) => {
    if (winning.includes(num)) wins.push(num);
    return wins;
  }, [])
);

const cardScore = winsByCard.map((cardWins) =>
  cardWins.length > 0 ? Math.pow(2, cardWins.length - 1) : 0
);

console.log(cardScore.reduce((sum, score) => score + sum));
