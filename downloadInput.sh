#!/usr/bin/zsh

source .env # add AUTH_COOKIE

if [[ $# -ne 1 ]]; then
  echo "Run the script with one argument, the day you want to download!"
  return 1
fi

day=$1
[[ $day -lt 10 ]] && day="0$day"
file=src/$day/input.txt

if [[ ! -d src/$day ]]; then
  cp -r src/template src/$day
fi

curl -sS -b "session=$AUTH_COOKIE" --create-dirs https://adventofcode.com/2024/day/$1/input > $file
