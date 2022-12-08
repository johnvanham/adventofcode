import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const input = await Deno.open("input.txt");

/*
Rock = A or X
Paper = B or Y
Scissors = C or Z

Rock defeats Scissors
Scissors defeats Paper
Paper defeats Rock
*/

const moves = {
    'A': {name: 'rock', defeats: 'Z', score: 1},
    'B': {name: 'paper', defeats: 'X', score: 2},
    'C': {name: 'scissors', defeats: 'Y', score: 3},
    'X': {name: 'rock', defeats: 'C', score: 1},
    'Y': {name: 'paper', defeats: 'A', score: 2},
    'Z': {name: 'scissors', defeats: 'B', score: 3},
};

const turnScores = {
    'lose': 0,
    'draw': 3,
    'win': 6,
};

let player1score = 0;
let player2score = 0;

// loop through input lines
for await (const line of readline(input)) {
    const decodedLine = new TextDecoder().decode(line);

    const [player1move, player2move] = decodedLine.split(' ');

    const p1moveData = moves[player1move as keyof typeof moves];
    const p2moveData = moves[player2move as keyof typeof moves];

    player1score += p1moveData.score;
    player2score += p2moveData.score;

    if (p1moveData.defeats === player2move) {
        // player 1 wins
        console.log(`Player 1 wins with ${p1moveData.name}!`);
        player1score += turnScores.win;
        player2score += turnScores.lose;
    } else if (p2moveData.defeats === player1move) {
        // player 2 wins
        console.log(`Player 2 wins with ${p2moveData.name}!`);
        player1score += turnScores.lose;
        player2score += turnScores.win;
    } else {
        // draw
        console.log(`Draw!`);
        player1score += turnScores.draw;
        player2score += turnScores.draw;
    }

    console.log(`Player 1 score: ${player1score}`);
    console.log(`Player 2 score: ${player2score}`);

}

// print out the scores
console.log(`Player 1 final score: ${player1score}`);
console.log(`Player 2 final score: ${player2score}`);
