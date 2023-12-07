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

const winsByCard = split
  .map(({ winning, ours }) =>
    ours.reduce((wins, num) => {
      if (winning.includes(num)) wins.push(num);
      return wins;
    }, [])
  )
  .map((wins) => ({ cards: 1, wins: wins.length }));

let cardCopies = [...winsByCard];

for (var i = 0; i < cardCopies.length; i++) {
  for (var j = 1; j <= cardCopies[i].wins; j++) {
    if (j + i > cardCopies.length - 1) break;
    cardCopies[j + i].cards += cardCopies[i].cards;
  }
}

console.log(
  cardCopies.reduce((sum, card) => {
    return sum + card.cards;
  }, 0)
);
