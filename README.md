2048 Game
A modern, responsive implementation of the classic 2048 puzzle game, built with React using class components.

 Gameplay
Objective: Combine tiles with the same number to reach the 2048 tile.

Controls: Use the arrow keys on your keyboard to slide tiles up, down, left, or right. On mobile devices, swipe in the direction you want to move.

Mechanics:

When two tiles with the same number touch, they merge into one tile with the sum of their values.

After each move, a new tile (either a 2 or a 4) appears in a random empty spot.

Game Over: The game ends when the board is full and no more moves are possible, or when you successfully reach 2048.

Implementation Details:

This project was built following the functional programming principles outlined in the problem statement. The core game logic is separated from the UI, and state is handled immutably to ensure a predictable and clean codebase.

Board Representation: The game board is represented as a 2D array in the component's state.

State Management: The game state is managed using a single class component, App, which holds the board, score, and game status.

Immutability: All move functions (moveLeft, moveRight, moveUp, moveDown) return a new board and score rather than directly mutating the state. This is a core functional programming principle that ensures a clean state history.

Event Handling: The game uses both keydown and touchstart/touchend event listeners to handle input from both keyboards and touchscreens.

Responsiveness: CSS media queries are used to adjust the board and tile sizes for a seamless experience on mobile devices.

Play the Game
Live Demo: https://2048-game-peach-three.vercel.app/

Simply click the link above to play the game in your browser on any device!

⚙️ Installation and Running
For a detailed look at the source code and implementation, follow these steps to run the game locally.

Clone the Repository:

Bash

git clone https://github.com/Saicharan452004/2048-Game.git
cd 2048-Game
Install Dependencies:

Bash

npm install
Run the Game:

Bash

npm start
The game will open in your default web browser at http://localhost:3000.