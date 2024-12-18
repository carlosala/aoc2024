export type Input = string[];

export function prepareInput(i: string): Input {
  return i.trim().split("\n");
}

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const findOccurrence = (str: string) => {
  return regex.exec(str);
};
export function partOne(i: Input): number {
  let total = 0;
  for (let line of i) {
    while (true) {
      const occ = findOccurrence(line);
      if (occ == null) break;
      total += parseInt(occ[1]) * parseInt(occ[2]);
    }
  }
  return total;
}

export function partTwo(i: Input): number {
  return 0;
}
