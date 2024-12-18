import { file, resolveSync } from "bun";
import { partOne, partTwo, prepareInput } from ".";

const i = await file(resolveSync("./input.txt", import.meta.dir)).text();

const input = prepareInput(i);
console.log("Part One:", partOne(input));
console.log("Part Two:", partTwo(input));
