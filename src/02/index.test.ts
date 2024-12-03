import { file, resolveSync } from "bun";
import { expect, test } from "bun:test";
import { partOne, partTwo, prepareInput } from ".";

const iTest = await file(
  resolveSync("./input.test.txt", import.meta.dir),
).text();

const input = prepareInput(iTest);

test("Part 1", () => {
  expect(partOne(input)).toBe(2);
});
test("Part 2", () => {
  expect(partTwo(input)).toBe(4);
});
