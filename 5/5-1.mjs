import { readFileSync } from "fs";

const input = readFileSync("input.txt");
const inputArr = input.toString();
const mapSplit = inputArr.split(" map:").map((el) => el.split("\n"));
const preamble = mapSplit.shift();
let mapNames = [preamble.pop()];
const seeds = preamble[0]
  .split(" ")
  .filter((el) => el.match(/\d+/))
  .map((seed) => parseInt(seed));

const mapWithName = mapSplit.map((map, idx) => {
  if (mapSplit.length - 1 !== idx) mapNames.push(map.pop());
  const mapObj = {
    [mapNames.shift()]: [...map]
      .filter(Boolean)
      .map((mapEntry) => mapEntry.split(" ").map((num) => parseInt(num))),
  };
  return mapObj;
});

const mapsOnly = mapWithName.map((mapObj) => Object.values(mapObj).flat());

const getMappedItems = (items, maps) => {
  let nextItems = []
  items.forEach((currentItem) => {
    let nextItem = undefined;
    for (const mapEntry of maps) {
      const rangeStart = mapEntry[1];
      const rangeEnd = mapEntry[1] + mapEntry[2] - 1;
      if (currentItem >= rangeStart && currentItem <= rangeEnd) {
        nextItem = mapEntry[0] + (currentItem - rangeStart);
      }
    }
    if(nextItem === undefined) nextItem = currentItem;
    nextItems.push(nextItem)
  });
  return nextItems
}

let nextItems = [...seeds];

for(const maps of mapsOnly) {
  nextItems = getMappedItems(nextItems, maps)
}

console.log(Math.min(...nextItems))

// mapsOnly.forEach(maps => {
//   getMappedItems(nextItems, maps)
// })
