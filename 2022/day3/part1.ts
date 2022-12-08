/** Advent Of Code 2022 Day 3 */

import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const input = await Deno.open("input.txt");

let priorities = 0;

for await (const line of readline(input)) {
    const decodedLine = new TextDecoder().decode(line);

    // Split line in two halves based on the line length
    const compartment1 = decodedLine.slice(0, decodedLine.length / 2);
    const compartment2 = decodedLine.slice(decodedLine.length / 2);

    // Find character that exists in both halves
    const commonCharacter = compartment1.split('').find((char) => compartment2.includes(char)) || '';

    // Get priority of the common character
    let priority = commonCharacter.charCodeAt(0) - 96;

    if(priority < 0) {
        priority += 58;
    }

    priorities += priority;

}

console.log(priorities);


