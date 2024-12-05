export type Input = [[number, number][], number[][]];

export function prepareInput(i: string): Input {
  const [a, b] = i.trim().split("\n\n");
  return [
    a
      .split("\n")
      .map((l) => l.split("|").map((x) => parseInt(x)) as [number, number]),
    b.split("\n").map((l) => l.split(",").map((x) => parseInt(x))),
  ];
}

export function partOne(i: Input): number {
  const [rules, programs] = i;
  const rightPrograms: number[] = [];
  for (let k = 0; k < programs.length; k++) {
    const program = programs[k];
    let valid = true;
    for (let j = 0; j < program.length; j++) {
      const bef = program.slice(0, j);
      const aft = program.slice(j + 1);
      if (
        rules.some(
          ([x, y]) =>
            (x === program[j] && bef.includes(y)) ||
            (y === program[j] && aft.includes(x)),
        )
      ) {
        valid = false;
        break;
      }
    }
    if (valid) rightPrograms.push(k);
  }
  return rightPrograms.reduce(
    (acc, idx) => acc + programs[idx][Math.floor(programs[idx].length / 2)],
    0,
  );
}

export function partTwo(i: Input): number {
  const [rules, programs] = i;
  const wrongPrograms: number[] = [];
  for (let k = 0; k < programs.length; k++) {
    const program = programs[k];
    let valid = true;
    for (let j = 0; j < program.length; j++) {
      const bef = program.slice(0, j);
      const aft = program.slice(j + 1);
      if (
        rules.some(
          ([x, y]) =>
            (x === program[j] && bef.includes(y)) ||
            (y === program[j] && aft.includes(x)),
        )
      ) {
        valid = false;
        break;
      }
    }
    if (!valid) wrongPrograms.push(k);
  }
  const wrong = wrongPrograms.map((idx) => programs[idx]);
  for (let k = 0; k < wrong.length; k++) {
    const program = wrong[k];
    program.sort((a, b) => {
      const found = rules.find(
        ([x, y]) => (x === a && y === b) || (x === b && y === a),
      );
      if (!found) return 0;
      return a === found[0] ? -1 : 1;
    });
  }
  return wrong.reduce(
    (acc, curr) => acc + curr[Math.floor(curr.length / 2)],
    0,
  );
}
