type Pos = "." | "^" | "#";
export type Input = Pos[][];

export function prepareInput(i: string): Input {
  return i
    .trim()
    .split("\n")
    .map((l) => l.split("") as Pos[]);
}

export function partOne(i: Input): number {
  const length = i[0].length;
  const posToNum = (x: number, y: number) => y * length + x;
  const visitedPos = new Set<number>();
  let posY = i.findIndex((l) => l.includes("^"));
  let posX = i[posY].findIndex((x) => x === "^");
  visitedPos.add(posToNum(posX, posY));
  let dirX = 0;
  let dirY = -1;
  while (true) {
    const newX = posX + dirX;
    const newY = posY + dirY;
    if (newX < 0 || newY < 0 || newY >= i.length || newX >= i[0].length) break;
    if (i[newY][newX] === "#") {
      const oldDirX = dirX;
      dirX = dirX !== 0 ? 0 : -dirY;
      dirY = dirY !== 0 ? 0 : oldDirX;
    } else {
      visitedPos.add(posToNum(newX, newY));
      posX = newX;
      posY = newY;
    }
  }
  return visitedPos.size;
}

export function partTwo(i: Input): number {
  const length = i[0].length;
  const posToNum = (x: number, y: number) => y * length + x;
  let result = 0;
  for (let j = 0; j < i.length; j++) {
    for (let k = 0; k < i[0].length; k++) {
      if (i[j][k] !== ".") continue;
      const modI = i.slice().map((l) => l.slice());
      modI[j][k] = "#";
      const visitedPos = new Map<number, number[][]>();
      let posY = modI.findIndex((l) => l.includes("^"));
      let posX = modI[posY].findIndex((x) => x === "^");
      let dirX = 0;
      let dirY = -1;
      visitedPos.set(posToNum(posX, posY), [[dirX, dirY]]);
      let isCycle = false;
      while (true) {
        const newX = posX + dirX;
        const newY = posY + dirY;
        if (
          newX < 0 ||
          newY < 0 ||
          newY >= modI.length ||
          newX >= modI[0].length
        )
          break;
        if (modI[newY][newX] === "#") {
          const oldDirX = dirX;
          dirX = dirX !== 0 ? 0 : -dirY;
          dirY = dirY !== 0 ? 0 : oldDirX;
        } else {
          const point = visitedPos.get(posToNum(newX, newY));
          if (point) {
            if (point.some(([a, b]) => a === dirX && b === dirY)) {
              isCycle = true;
              break;
            } else point.push([dirX, dirY]);
          } else visitedPos.set(posToNum(newX, newY), [[dirX, dirY]]);
          posX = newX;
          posY = newY;
        }
      }
      if (isCycle) result++;
    }
  }
  return result;
}
