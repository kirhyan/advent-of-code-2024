import fs from "node:fs";

function readInput() {
  let data = "";
  try {
    data = fs.readFileSync("01.txt", "utf8");
    // console.log(data);
  } catch (err) {
    console.error(err);
  }

  const [list1, list2] = [[], []];
  const lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const numbers = lines[i].split("   ").map((n) => {
      return parseInt(n, 10);
    });
    list1.push(numbers[0]);
    list2.push(numbers[1]);
  }
  // 1. leer fichero 01-example.txt
  // 2. ir linea por linea
  // 3. por cada linea, sacar los 2 números, meter el primero en list1 y en segundo en list2
  // 4. return [list1, list2]

  return [list1, list2];
}

const [list1, list2] = readInput();
/* console.log("list1: ", list1);
console.log("list2: ", list2); */

function part1() {
  let [list1Cp, list2Cp] = [[...list1], [...list2]];

  let result = 0;
  for (let i = 0; i < list1.length; i++) {
    const min1 = Math.min(...list1Cp);
    const min2 = Math.min(...list2Cp);
    const idx1 = list1Cp.indexOf(min1);
    const idx2 = list2Cp.indexOf(min2);
    list1Cp.splice(idx1, 1);
    list2Cp.splice(idx2, 1);

    result += Math.abs(min1 - min2);
  }
  return result;
}

function part2() {
  let result = 0;
  for (let i = 0; i < list1.length; i++) {
    const number = list1[i];
    const count = countNumber(list2, number);
    result += number * count;
  }
  return result;
}

function countNumber(list, number) {
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === number) {
      count++;
    }
  }
  return count;
}

console.log("Part 1: ", part1());
console.log("Part 2: ", part2());
