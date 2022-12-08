/** Advent Of Code 2022 Day 3 */

import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const input = await Deno.open("input.txt");

let priorities = 0;
let group: string[] = [];
let count = 1;

for await (const line of readline(input)) {
    const decodedLine = new TextDecoder().decode(line);

    group.push(decodedLine);

    if (count !== 3) {
        count++;
        continue;
    }

    const commonCharacter = group[0].split('').filter((char) => group[1].indexOf(char) !== -1 && group[2].indexOf(char) !== -1)[0];

    let priority = commonCharacter.charCodeAt(0) - 96;

    if(priority < 0) {
        priority += 58;
    }

    priorities += priority;

    if (count === 3) {
        group = [];
        count = 1;
    }
}

console.log(priorities);