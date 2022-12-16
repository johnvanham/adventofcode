// --- Day 5: Supply Stacks (Part 1) ---

const input = await Deno.readTextFile("input.txt");

// Split input into lines
const inputLines = input.split("\n");

// Get the line number prior to the first empty line
const stackIDLine = inputLines.findIndex((line) => line === "") + 1;

// Loop through each line up to the stack ID line. Split each line using 4 characters for each stack crate. Remove spaces and brackets from each stack.
const stackLines =
    inputLines.slice(0, stackIDLine-2)
    .map((line) => line.match(/.{1,4}/g))
    .map((stackEntries) =>
        stackEntries?.map((crate) => crate.replace(/[\[\] ]/g, ""))
    )
    .reverse()
    ;

// Loop through stack line and add entries to corresponding stack
const stacks: string[][] = [];
stackLines.forEach((stackEntries) => {
    stackEntries?.forEach((crate, index) => {
        index = index + 1;
        if (stacks[index] === undefined) {
            stacks[index] = [];
        }
        if(crate !== "") {
            stacks[index].push(crate);
        }
    });
});

// Output the stacks
console.log("\n");
console.log("Starting stacks:");
console.table(stacks);
console.log("\n");

// Loop through each line after the stack ID line. Follow the moves in each line to change stack entries between stacks.
const moveLines = inputLines.slice(stackIDLine);
moveLines.forEach((moveLine) => {
    // Split the move line into moves
    const moves = moveLine.split(" ");

    // Get the number of crates to move
    const numberOfCrates = Number(moves[1]);

    // Get the stack ID to take stakes from
    const fromStackID = Number(moves[3]);

    // Get the stack ID to move stacks to
    const toStackID = Number(moves[5]);

    // Loop through the number of crates to move and move them one by one from the from stack to the to stack
    for (let i = 0; i < numberOfCrates; i++) {
        stacks[toStackID].push(stacks[fromStackID].pop() ?? "");
    }
});

// Output the stacks
console.log("Ending stacks:");
console.table(stacks);
console.log("\n");

// Output the top crate from each stack
console.log("Top crates:");
console.log(stacks.map((stack) => stack[stack.length - 1]).join(""));