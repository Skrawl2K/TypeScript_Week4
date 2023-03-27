"use strict";
//! -------------------------------------- Aufgabe 1 --------------------------------------
// moves: 
// left = 0
// right = 1
// up = 2
// down = 3
// type action = "moveLeft" | "moveRight" | "moveUp" | "moveDown"
Object.defineProperty(exports, "__esModule", { value: true });
let maze = new Array(8);
for (let i = 0; i < maze.length; i++) {
    maze[i] = new Array(8).fill("");
}
function createMaze() {
    // Create an 8x8 grid filled with zeros
    const maze = new Array(8).fill(0).map(() => new Array(8).fill(0));
    // Set walls on the borders of the maze
    for (let i = 0; i < 8; i++) {
        maze[0][i] = "o"; // Top border
        maze[i][0] = "o"; // Left border
        maze[7][i] = "o"; // Bottom border
        maze[i][7] = "o"; // Right border
    }
    // Place the player at the top-left corner
    maze[0][0] = "s";
    // Place the treasure at the bottom-right corner
    maze[7][7] = "X";
    // Place walls in the maze
    // You can customize this according to your needs to make it more challenging
    maze[2][2] = "o";
    maze[2][3] = "o";
    maze[2][4] = "o";
    maze[4][3] = "o";
    maze[5][3] = "o";
    maze[6][3] = "o";
    // Return the completed maze
    return maze;
}
console.log(createMaze());
document.addEventListener("DOMContentLoaded", function () {
    const mazeContainer = document.getElementById("maze-container");
    mazeContainer.innerHTML = createMaze().map(row => row.join(" ")).join("<br>");
});
//# sourceMappingURL=day1.js.map