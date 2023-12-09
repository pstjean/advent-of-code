import { readFileSync } from "fs";

const input = readFileSync(process.argv[2]);
const inputArr = input
  .toString()
  .replace(/\s+$/m, "")
  .split("\n")
  .filter(Boolean);
const seqs = inputArr.map((line) =>
  line.split(" ").map((num) => parseInt(num))
);
const seqWithDiffs = seqs.map((seq) => {
  let diffs = [[...seq]];
  while (diffs[diffs.length - 1].filter(Boolean).length) {
    diffs.push(
      diffs[diffs.length - 1].reduce((acc, num, idx) => {
        if (idx < diffs[diffs.length - 1].length - 1)
          acc.push(diffs[diffs.length - 1][idx + 1] - num);
        return acc;
      }, [])
    );
  }
  return diffs;
});

const nextInSeq = seqWithDiffs.map((seqs) => {
  seqs.reverse(); // Zeros first
  return seqs.reduce(
    (acc, seq, idx) => {
      if (idx < seqs.length - 1) {
        acc.push(acc[acc.length - 1] + seqs[idx + 1][seqs[idx + 1].length - 1]);
      }
      return acc;
    },
    [0]
  );
});

console.log(
  nextInSeq.reduce((sum, seq) => {
    return sum + seq.pop();
  }, 0)
);
