export type Input = number[][];

export function prepareInput(i: string): Input {
  return i
    .trim()
    .split("\n")
    .map((l) => l.split(" ").map((x) => parseInt(x)));
}
const isSafe = (line: number[]) => {
  const inc = line[1] - line[0] > 0 ? 1 : -1;
  for (let j = 1; j < line.length; j++) {
    const interRes = (line[j] - line[j - 1]) * inc;
    if (interRes <= 0 || interRes > 3) return false;
  }
  return true;
};

export function partOne(i: Input): number {
  return i.reduce((acc, line) => acc + (isSafe(line) ? 1 : 0), 0);
}

export function partTwo(i: Input): number {
  let acc = 0;
  i.forEach((l) => {
    let safe = isSafe(l);
    if (safe) acc++;
    else
      for (let j = 0; j < l.length; j++) {
        const val = l.slice();
        val.splice(j, 1);
        const innerSafe = isSafe(val);
        if (innerSafe) {
          acc++;
          break;
        }
      }
  });
  return acc;
}
