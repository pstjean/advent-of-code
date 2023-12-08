import { readFileSync } from "fs";

const input = readFileSync(process.argv[2]);
const inputArr = input.toString().split("\n").filter(Boolean);
const directions = inputArr.shift().split("");

const nodeDefs = inputArr.map((node, idx) => {
  const [N, nodeLookup] = node.split("=").map((el) => el.trim());
  const [L, R] = nodeLookup.split(",").map((el) => el.match(/[A-Z0-9]{3}/)[0]);
  return [N, { L, R }];
});

const nodeHash = Object.fromEntries(nodeDefs);
let currNodes = Object.keys(nodeHash).filter((key) => key.match(/A$/));
let iterations = 0;
const iterationsToZ = [];
do {
  const direction = directions[iterations % directions.length];
  currNodes = currNodes.map((node) => nodeHash[node][direction]);
  iterations++;
  const zNodes = currNodes.filter((k) => k.match(/Z$/));
  if (zNodes.length > 0) {
    iterationsToZ.push(iterations);
    currNodes = currNodes.filter((k) => k.match(/[^Z]$/));
  }
} while (currNodes.length);

const gcd = (a, b) => (a % b === 0 ? b : gcd(b, a % b));
const lcm = ([a, b]) => (a * b) / gcd(a, b);
const lcmArr = (nums) =>
  nums.reduce(
    (res, num) => lcm([res, num].sort()),
    lcm(nums.splice(0, 2).sort())
  );

console.log(lcmArr(iterationsToZ));
