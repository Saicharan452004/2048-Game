import React from 'react';
import "./App.css";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      score: 0,
      gameOver: false,
      gameWon: false,
      message: 'Keep playing!',
    };
  }
  componentDidMount() {
    let initialBoard = this.state.board;
    initialBoard = this.addRandomTile(initialBoard);
    initialBoard = this.addRandomTile(initialBoard);
    this.setState({ board: initialBoard });
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  restartGame = () => {
    const board = Array(4).fill().map(() => Array(4).fill(0));
    let initialBoard = this.addRandomTile(this.addRandomTile(board));
    this.setState({
      board: initialBoard,
      score: 0,
      gameOver: false,
      gameWon: false,
      message: 'Keep playing!'
    });
  };

  handleKeyDown = (event) => {
    console.log('You pressed the key:', event.key);

    if (this.state.gameOver || this.state.gameWon) {
      return; 
    }

    let result = null;
    switch (event.key) {
      case 'ArrowLeft':
        result = this.moveLeft(this.state.board);
        break;
      case 'ArrowRight':
        result = this.moveRight(this.state.board);
        break;
      case 'ArrowUp':
        result = this.moveUp(this.state.board);
        break;
      case 'ArrowDown':
        result = this.moveDown(this.state.board);
        break;
      default:
        return;
    }
    if (result && JSON.stringify(result.board) !== JSON.stringify(this.state.board)) {
      const newBoardWithTile = this.addRandomTile(result.board);
      this.setState(prevState => ({
        board: newBoardWithTile,
        score: prevState.score + result.score,
      }));
      if (this.hasWon(newBoardWithTile)) {
        this.setState({ gameWon: true, message: 'You Win!' });
      } else if (this.isGameOver(newBoardWithTile)) {
        this.setState({ gameOver: true, message: 'Game Over!' });
      }
    }
  };

  addRandomTile = (board) => {
    let emptyCells = [];
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }
    if (emptyCells.length > 0) {
      let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      let newTileValue = Math.random() < 0.9 ? 2 : 4;
      board[randomCell.r][randomCell.c] = newTileValue;
    }
    return board;
  };
  
  hasWon = (board) => {
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 2048) {
          return true;
        }
      }
    }
    return false;
  };
  
  isGameOver = (board) => {
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {
          return false;
        }
      }
    }
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        const currentCell = board[r][c];
        if (c < board[r].length - 1 && currentCell === board[r][c + 1]) {
          return false;
        }
        if (r < board.length - 1 && currentCell === board[r + 1][c]) {
          return false;
        }
      }
    }
    return true;
  };

  moveLeft = (board) => {
    let newBoard = this.slide(board);
    const { board: mergedBoard, score } = this.merge(newBoard, 'left');
    newBoard = this.slide(mergedBoard);
    return { board: newBoard, score };
  };

  slide = (board) => {
    let newBoard = board.map(row => row.filter(cell => cell !== 0));
    for (let i = 0; i < newBoard.length; i++) {
      while (newBoard[i].length < 4) {
        newBoard[i].push(0);
      }
    }
    return newBoard;
  };

  merge = (board, direction) => {
    let newBoard = JSON.parse(JSON.stringify(board)); // Create a deep copy
    let newScore = 0;

    if (direction === 'left') {
      for (let r = 0; r < newBoard.length; r++) {
        for (let c = 0; c < newBoard[r].length - 1; c++) {
          if (newBoard[r][c] !== 0 && newBoard[r][c] === newBoard[r][c + 1]) {
            newBoard[r][c] *= 2;
            newBoard[r][c + 1] = 0;
            newScore += newBoard[r][c];
          }
        }
      }
    }
    return { board: newBoard, score: newScore };
  };

  rotateBoard = (board) => {
    const newBoard = Array(4).fill(0).map(() => Array(4).fill(0));
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        newBoard[c][3 - r] = board[r][c];
      }
    }
    return newBoard;
  };
  
  moveUp = (board) => {
    const rotatedBoard = this.rotateBoard(this.rotateBoard(this.rotateBoard(board)));
    const { board: slidBoard, score } = this.moveLeft(rotatedBoard);
    const finalBoard = this.rotateBoard(slidBoard);
    return { board: finalBoard, score };
  };

  moveDown = (board) => {
    const rotatedBoard = this.rotateBoard(board);
    const { board: slidBoard, score } = this.moveLeft(rotatedBoard);
    const finalBoard = this.rotateBoard(this.rotateBoard(this.rotateBoard(slidBoard)));
    return { board: finalBoard, score };
  };

  moveRight = (board) => {
    const rotatedBoard = this.rotateBoard(this.rotateBoard(board));
    const { board: slidBoard, score } = this.moveLeft(rotatedBoard);
    const finalBoard = this.rotateBoard(this.rotateBoard(slidBoard));
    return { board: finalBoard, score };
  };


  render() {
    return (
      <div className="game-container">
        <h1>2048 Game</h1>
        <div className="game-info">
          <p>Score: {this.state.score}</p>
          <button onClick={this.restartGame} className="restart-button">Restart Game</button>
        </div>
        <div className="board">
          {this.state.board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`tile ${cell !== 0 ? 'tile-' + cell : ''}`}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
        {(this.state.gameOver || this.state.gameWon) && (
          <div className="game-over-overlay">
            <h2>{this.state.message}</h2>
            <button onClick={this.restartGame} className="restart-button">Restart Game</button>
          </div>
        )}
      </div>
    );
  }
}
export default App;