import * as readline from "readline";

type Action = "moveLeft" | "moveRight" | "moveUp" | "moveDown";
type Position = [number, number];
type FieldType = "empty" | "wall" | "treasure"

function performActionLight(pos: Position, action: Action): Position {
    const x = pos[0];
    const y = pos[1];

    switch (action) {
        case "moveLeft": {
            return [x - 1, y];
        }
        case "moveRight": {
            return [x + 1, y];
        }
        case "moveUp": {
            return [x, y - 1];
        }
        case "moveDown": {
            return [x, y + 1];
        }
    }
}

function isLegalPosition(pos: Position): boolean {
    const x = pos[0];
    const y = pos[1];
    if (x < 0 || y < 0) {
        return false; // illegal position
    }
    if (x > 7 || y > 7) {
        return false; // illegal position
    }
    return true; // legal position
}

function performAction(pos: Position, action: Action): Position {
    const x = pos[0];
    const y = pos[1];
    const nextPos: Position = performActionLight(pos, action);
    if (isLegalPosition(nextPos)) {
        return nextPos;
    }
    console.log("INVALID MOVE");
    return pos;
}

function toAction(userInput: string): Action {
    switch (userInput) {
        case "links": {
            return "moveLeft";
        }
        case "rechts": {
            return "moveRight";
        }
        case "oben": {
            return "moveUp";
        }
        case "unten": {
            return "moveDown";
        }
        default: {
            throw new Error("Invalid input!");
        }
    }
}


let pos: Position = [2, 3];
let newAction: Action = "moveDown";
const nextPos: Position = performActionLight(pos, newAction);

console.log(nextPos);

const playingField: FieldType[][] = [
    ["empty", "empty", "empty", "empty", "empty", "wall", "wall", "wall"],
    ["wall", "wall", "wall", "wall", "empty", "wall", "treasure", "wall"],
    ["wall", "wall", "wall", "wall", "empty", "wall", "empty", "wall"],
    ["empty", "empty", "empty", "empty", "empty", "wall", "empty", "wall"],
    ["empty", "wall", "wall", "wall", "wall", "wall", "empty", "wall"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
];

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
});

function runGame(startingPosition: Position, playingField: FieldType[][]): void {
    console.log("Current Position: " + startingPosition);
    console.log(
        "Gebe einen der folgenden Befehle ein: links, rechts, oben, unten"
    );
    let currentPosition = startingPosition;
    rl.question("Richtung: ", (answer) => {
        try {
            const action = toAction(answer);
            currentPosition = performAction(currentPosition, action);
            const x = currentPosition[0];
            const y = currentPosition[1];
            const field: FieldType = playingField[y][x];
            console.log("--- Aktuelles Feld: " + field + "---");
            runGame(currentPosition, playingField);
        } catch (error) {
            console.log(error.message);
            runGame(currentPosition, playingField);
        }
    });
}

runGame([3, 0], playingField);

export { }
