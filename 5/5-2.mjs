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

let seedsWithRange = [];
for (let i = 0; i < seeds.length; i += 2) {
  seedsWithRange.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
}

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

const getMappedItems = (itemRanges, maps) => {
  let nextItemRanges = [];
  // Ranges are tuples, with t[0] being the low item and t[1] the high item
  let itemRange;
  do {
    itemRange = itemRanges.shift();
    // As we create new item ranges, must they be compared against previous map ranges?
    // No, because we already compared a set containing that entire set (the unbroken range)
    // against previous map ranges
    let mapsToRange = false;
    for (const mapEntry of maps) {
      const mapRange = [mapEntry[1], mapEntry[1] + mapEntry[2] - 1];

      // Empty range
      if (itemRange.length === 0) continue;
      // Item range starts after map range ends
      if (itemRange[0] > mapRange[1]) continue;
      // Item range ends before map range starts
      if (itemRange[1] < mapRange[0]) continue;

      mapsToRange = true;
      const mapDestRange = [mapEntry[0], mapEntry[0] + mapEntry[2] - 1];
      const lowerOffset = itemRange[0] - mapRange[0];
      const higherOffset = itemRange[1] - mapRange[1];

      // Consumed by map range case
      if (itemRange[0] >= mapRange[0] && itemRange[1] <= mapRange[1]) {
        nextItemRanges.push([
          mapDestRange[0] + lowerOffset,
          mapDestRange[1] + higherOffset,
        ]);
      }
      // Consumes map range case
      if (itemRange[0] < mapRange[0] && itemRange[1] > mapRange[1]) {
        nextItemRanges.push([...mapDestRange]);
        itemRanges.unshift([itemRange[0], mapRange[0] - 1]);
        itemRanges.unshift([mapRange[1] + 1, itemRange[1]]);
      }
      // Overlaps left
      if (itemRange[0] < mapRange[0] && itemRange[1] < mapRange[1]) {
        const higherOffset = itemRange[1] - mapRange[1];
        nextItemRanges.push([mapDestRange[0], mapDestRange[1] + higherOffset]);
        itemRanges.unshift([itemRange[0], mapRange[0] - 1]);
      }
      // Overlaps right
      if (itemRange[0] > mapRange[0] && itemRange[1] > mapRange[1]) {
        const lowerOffset = itemRange[0] - mapRange[0];
        nextItemRanges.push([mapDestRange[0] + lowerOffset, mapDestRange[1]]);
        itemRanges.unshift([mapRange[1] + 1, itemRange[1]]);
      }
    }
    if (!mapsToRange) nextItemRanges.push(itemRange);
  } while (itemRanges.length > 0);
  return nextItemRanges;
};

let nextItems = [...seedsWithRange];

mapsOnly.forEach((map) => {
  nextItems = getMappedItems(nextItems, map);
});

console.log(Math.min(...nextItems.map((itm) => itm[0])));
