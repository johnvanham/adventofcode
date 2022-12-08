import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const input = await Deno.open("input.txt");

const calories:number[] = [];
let currentCalories = 0;

for await (const line of readline(input)) {
    const decodedLine = new TextDecoder().decode(line);

    if (decodedLine !== "") {
        currentCalories += Number(decodedLine);
    } else {
        calories.push(currentCalories);
        currentCalories = 0;
    }
}

calories.sort((a, b) => b - a);

// Part 1
console.log('Part1: '+calories[0]);

// Part 2
console.log('Part 2: '+(calories[0] + calories[1] + calories[2]));