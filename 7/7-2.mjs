import { readFileSync } from "fs";

const input = readFileSync("input.txt");
const inputArr = input.toString().replace(/\s+$/m, "").split("\n");

const hands = inputArr.map((line) => {
  const [hand, bid] = line.split(" ");
  const handCounts = [...hand.split("")];
  let cardCounts = [];
  while (handCounts.length > 0) {
    let currentCard = handCounts.shift();
    cardCounts.unshift([currentCard, 1]);
    let i = 0;
    while (i < handCounts.length) {
      if (handCounts[i] === currentCard) {
        handCounts.splice(i, 1);
        cardCounts[0][1]++;
      } else {
        i++;
      }
    }
  }

  const faceMap = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    J: 1,
  };
  return [
    hand
      .split("")
      .map((card) => (faceMap?.[card] ? faceMap[card] : parseInt(card))),
    cardCounts.sort(([_, qtyA], [__, qtyB]) => qtyB - qtyA),
    parseInt(bid),
  ];
});

const jokersWild = hands.map((hand) => {
  const jokers = hand[1].findIndex(([val, qty]) => val === "J");
  // There can apparently be 5 Jokers (unlike a normal deck), since
  // 5 of a kind is a valid hand
  // Jokers will become a new card, either the card with the highest qty
  // or the 2nd highest qty if highest qty is jokers
  if (jokers > -1 && hand[1][jokers][1] < 5) {
    let jokerTarget = 0;
    if (jokers === 0) jokerTarget = 1;
    hand[1][jokerTarget][1] += hand[1][jokers][1];
    hand[1].splice(jokers, 1);
  }
  return hand;
});

const handRanks = jokersWild.map(([hand, cardCounts, bid]) => {
  // 5 of a kind = 1
  if (cardCounts[0][1] === 5) return [hand, cardCounts, bid, 1];
  // 4 of a kind = 2
  if (cardCounts[0][1] === 4) return [hand, cardCounts, bid, 2];
  if (cardCounts[0][1] === 3) {
    // Full house = 3
    if (cardCounts[1][1] === 2) return [hand, cardCounts, bid, 3];
    // Three of a kind = 4
    return [hand, cardCounts, bid, 4];
  }
  if (cardCounts[0][1] === 2) {
    // Two pair = 5
    if (cardCounts[1][1] === 2) return [hand, cardCounts, bid, 5];
    // One pair = 6
    return [hand, cardCounts, bid, 6];
  }
  // High card = 7
  return [hand, cardCounts, bid, 7];
});

handRanks.sort((handA, handB) => handA[3] - handB[3]);

const splitByRank = Array(7)
  .fill()
  .map((_, idx) => idx + 1)
  .map((rank) => {
    const lastOfRank = handRanks.findLastIndex((hand) => hand[3] === rank);
    const handsOfRank = handRanks.slice(0, lastOfRank + 1);
    // Remove all of the current ranke
    handRanks.splice(0, lastOfRank + 1);
    return handsOfRank;
  });

const sortedByHand = splitByRank.map((handsOfRank) => {
  handsOfRank.sort((handA, handB) => {
    let comp = 0;
    for (const [idx, card] of handA[0].entries()) {
      comp = handB[0][idx] - card;
      if (comp != 0) break;
    }
    return comp;
  });
  return handsOfRank;
});

// All hands in ascending order
const winnings = sortedByHand
  .flat()
  .reverse()
  .reduce((sum, hand, idx) => {
    const rank = idx + 1;
    return sum + hand[2] * rank;
  }, 0);

console.log(winnings);
