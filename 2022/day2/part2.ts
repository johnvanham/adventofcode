import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

const input = await Deno.open("input.txt");

/*
Rock = A
Paper = B
Scissors = C

Rock defeats Scissors
Paper defeats Rock
Scissors defeats Paper
*/

const moves = {
    'A': {name: 'rock', defeats: 'C', score: 1},
    'B': {name: 'paper', defeats: 'A', score: 2},
    'C': {name: 'scissors', defeats: 'B', score: 3},
};

const turnScores = {
    'X': {name:'lose', score:0},
    'Y': {name: 'draw', score:3},
    'Z': {name: 'win', score:6},
};

let player1score = 0, player2score = 0;

// loop through input lines
for await (const line of readline(input)) {
    const decodedLine = new TextDecoder().decode(line);

    const [player1move, player2strategy] = decodedLine.split(' ');

    const p1moveData = moves[player1move as keyof typeof moves];
    const p2strategyData = turnScores[player2strategy as keyof typeof turnScores];

    let player2move = '';
    let p2moveData: {name: string, defeats: string, score: number} = {name: '', defeats: '', score: 0};

    if (p2strategyData.name === 'win') {
        for (const [key, value] of Object.entries(moves)) {
            if (value.defeats === player1move) {
                player2move = key;
                p2moveData = value;
                break;
            }
        }
    } else if (p2strategyData.name === 'lose') {
        player2move = p1moveData.defeats;
        p2moveData = moves[player2move as keyof typeof moves];
    } else {
        player2move = player1move;
        p2moveData = p1moveData;
    }

    player1score += p1moveData.score;
    player2score += p2moveData.score;

    if (p1moveData.defeats === player2move) {
        // player 1 wins
        console.log(`Player 1 wins with ${p1moveData.name} against ${p2moveData.name}!`);
        player1score += Object.entries(turnScores).filter(([_key, value]) => value.name === 'win')[0][1].score;
        player2score += Object.entries(turnScores).filter(([_key, value]) => value.name === 'lose')[0][1].score;
    } else if (p2moveData.defeats === player1move) {
        // player 2 wins
        console.log(`Player 2 wins with ${p2moveData.name} against ${p1moveData.name}!`);
        player1score += Object.entries(turnScores).filter(([_key, value]) => value.name === 'lose')[0][1].score;
        player2score += Object.entries(turnScores).filter(([_key, value]) => value.name === 'win')[0][1].score;
    } else {
        // draw
        console.log(`Draw - both players played ${p1moveData.name}!`);
        player1score += Object.entries(turnScores).filter(([_key, value]) => value.name === 'draw')[0][1].score;
        player2score += Object.entries(turnScores).filter(([_key, value]) => value.name === 'draw')[0][1].score;
    }

    console.log(`Player 1 score: ${player1score}`);
    console.log(`Player 2 score: ${player2score}`);
    console.log('-----------------');

}

// print out the scores
console.log(`Player 1 final score: ${player1score}`);
console.log(`Player 2 final score: ${player2score}`);
