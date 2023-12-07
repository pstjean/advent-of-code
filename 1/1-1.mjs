import { readFileSync } from 'fs';

// combining the first digit and the last digit
// (in that order) to form a single two-digit number.
// Add them together
const input = readFileSync('input.txt')
const inputArr = input.toString().replace(/\s+$/m, '').split('\n');
const digits = inputArr.map(ln => ln.match(/[0-9]*/g).filter(i => !!i).join(''));
const firstLast = digits.map(str => parseInt(`${str[0]}${str[str.length-1]}`))
const finalValue = firstLast.reduce((acc, val) => { return acc + val }, 0)
console.log(finalValue);