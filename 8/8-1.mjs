import { readFileSync } from "fs";

const input = readFileSync(process.argv[2]);
const inputArr = input.toString().split("\n").filter(Boolean);
const directions = inputArr.shift().split('')

const nodeDefs = inputArr.map((node, idx) => {
  const [N, nodeLookup] = node.split("=").map(el => el.trim());
  const [L, R] = nodeLookup.split(",").map((el) => el.match(/[A-Z]{3}/)[0]);
  return [N, { L, R }];
});

const nodeHash = Object.fromEntries(nodeDefs)
let currNode = 'AAA'
let iterations = 0
do {
    const direction = directions[iterations % directions.length]
    currNode = nodeHash[currNode][direction]
    iterations++
} while(currNode !== 'ZZZ')

console.log(iterations)