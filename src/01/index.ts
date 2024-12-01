export type Input = [number[], number[]];

export function prepareInput(i: string): Input {
  const left: number[] = [];
  const right: number[] = [];
  i.trim()
    .split("\n")
    .forEach((l) => {
      const [lStr, rStr] = l.split("   ");
      left.push(parseInt(lStr));
      right.push(parseInt(rStr));
    });
  return [left, right];
}

export function partOne(i: Input): number {
  let result = 0;
  const [lSort, rSort] = i.map((x) => x.slice().sort((a, b) => a - b));
  for (let j = 0; j < lSort.length; j++)
    result += Math.abs(lSort[j] - rSort[j]);
  return result;
}

export function partTwo(i: Input): number {
  let result = 0;
  const [lSort, rSort] = i.map((x) => x.slice());
  const rAcc = new Map<number, number>();
  rSort.forEach((v) => rAcc.set(v, (rAcc.get(v) ?? 0) + 1));
  lSort.forEach((v) => (result += v * (rAcc.get(v) ?? 0)));
  return result;
}
