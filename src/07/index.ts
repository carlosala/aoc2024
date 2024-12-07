export type Input = [number, number[]][];

export function prepareInput(i: string): Input {
  return i
    .trim()
    .split("\n")
    .map((l) => {
      const [res, nums] = l.split(": ");
      return [parseInt(res), nums.split(" ").map((x) => parseInt(x))];
    });
}

export function partOne(i: Input): number {
  let total = 0;
  for (let k = 0; k < i.length; k++) {
    const [res, nums] = i[k];
    for (let j = 0; j < 2 ** nums.length; j++) {
      let tmpRes = nums[0];
      for (let l = 1; l < nums.length; l++) {
        tmpRes = j & (2 ** l) ? tmpRes * nums[l] : tmpRes + nums[l];
        if (tmpRes > res) break;
      }
      if (tmpRes === res) {
        total += res;
        break;
      }
    }
  }
  return total;
}

export function partTwo(i: Input): number {
  let total = 0;
  for (let k = 0; k < i.length; k++) {
    const [res, nums] = i[k];
    for (let j = 0; j < 3 ** nums.length; j++) {
      let acc = nums[0];
      const val = j.toString(3);
      for (let l = 1; l < nums.length; l++) {
        acc =
          val[l] === "2"
            ? parseInt(`${acc}${nums[l]}`)
            : val[l] === "1"
              ? acc * nums[l]
              : acc + nums[l];
        if (acc > res) break;
      }
      if (acc === res) {
        total += res;
        break;
      }
    }
  }
  return total;
}
