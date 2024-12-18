import fs from "node:fs";

function readInput() {
  const data = fs.readFileSync("02.txt", "utf8");
  const lines = data.split("\n");
  const reports = [];

  for (let i = 0; i < lines.length; i++) {
    const report = lines[i];
    const levels = report.split(" ").map((n) => {
      return parseInt(n, 10);
    });
    reports.push(levels);
  }
  return reports;
}

const reports = readInput();

function part1() {
  let result = 0;
  for (let i = 0; i < reports.length; i++) {
    if (isSafe(reports[i])) {
      result++;
    }
  }

  return result;
}

function part2() {
  let result = 0;
  for (let i = 0; i < reports.length; i++) {
    if (isSafeOneBadLevel(reports[i])) {
      result++;
    }
  }
  return result;
}

function isSafe(report) {
  // 1. iteramos los levels del report
  let isPrevIncreasing = undefined;

  for (let i = 1; i < report.length; i++) {
    const prev = report[i - 1];
    const cur = report[i];
    const diff = Math.abs(prev - cur);
    if (diff < 1 || diff > 3) {
      return false;
    }
    const isCurIncreasing = prev < cur;

    //2. comprobamos si ya sabemos si la secuencia es ascendente o descendente
    if (
      isPrevIncreasing !== undefined &&
      isPrevIncreasing !== isCurIncreasing
    ) {
      return false;
    }

    isPrevIncreasing = isCurIncreasing;
  }

  return true;
}

function isSafeOneBadLevel(report) {
  if (isSafe(report)) {
    return true;
  }
  for (let i = 0; i < report.length; i++) {
    const reportCopy = [...report];
    reportCopy.splice(i, 1);
    if (isSafe(reportCopy)) {
      return true;
    }
  }
  return false;
}

console.log("Part 1: ", part1());
console.log("Part 2: ", part2());
