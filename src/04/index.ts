type Letter = "X" | "M" | "A" | "S";
export type Input = Letter[][];

export function prepareInput(i: string): Input {
  return i
    .trim()
    .split("\n")
    .map((str) => str.split("")) as Input;
}

const lookForAdjLetter = (
  i: Input,
  pos: [number, number],
  [x, y]: [number, number],
  letter: Letter,
): boolean => {
  if (x === -1 && pos[0] === 0) return false;
  if (x === 1 && pos[0] === i.length - 1) return false;
  if (y === -1 && pos[1] === 0) return false;
  if (y === 1 && pos[1] === i[0].length - 1) return false;
  return letter === i[pos[0] + x][pos[1] + y];
};

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [1, 0],
  [1, -1],
  [1, 1],
] as [number, number][];

export function partOne(i: Input): number {
  let result = 0;
  for (let j = 0; j < i.length; j++) {
    for (let k = 0; k < i[0].length; k++) {
      const letter = i[j][k];
      if (letter !== "X") continue;
      for (const dir of directions) {
        if (
          lookForAdjLetter(i, [j, k], dir, "M") &&
          lookForAdjLetter(i, [j + dir[0], k + dir[1]], dir, "A") &&
          lookForAdjLetter(i, [j + 2 * dir[0], k + 2 * dir[1]], dir, "S")
        )
          result++;
      }
    }
  }
  return result;
}

export function partTwo(i: Input): number {
  return 0;
}
