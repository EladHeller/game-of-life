import drawShape from './drawShape';
import {Board} from './types';

const WIDTH = 500;
const HEIGHT = WIDTH;
const CELL_WIDTH = 1;
const IS_CYCLIC_BOARD = true;

const randomRGB = () => {
  return Math.floor(Math.random()* 256);
}

function draw(oldBoard: Board, newBoard: Board, context: CanvasRenderingContext2D) {
  newBoard.forEach((row, rowIndex) => row.forEach((cell, cellIndex) => {
    if (cell !== oldBoard[rowIndex][cellIndex]) {
      context.fillStyle = cell ? `#000`: '#fff';
      context.fillRect(rowIndex*CELL_WIDTH,cellIndex*CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
    }
  }));
}

function BlankBoard(): Board {
  const board = Array(WIDTH).fill(false);
  return board.map(() => Array(HEIGHT).fill(false))
}
function RandomBoard(): Board {
  const board = Array(WIDTH).fill(false);
  return board.map(() => Array(HEIGHT).fill(false).map(() => {
    return Math.random() > 0.5;
  }))
}

export function GameOfLifeController() {
  let board = BlankBoard();
  drawShape(board, 'puffer1', 250, 250);

  let generation = 0;

  const root = document.querySelector('#root');
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH * CELL_WIDTH;
  canvas.height = HEIGHT * CELL_WIDTH;
  root.appendChild(canvas);

  const generationElement = document.createElement('span');
  generationElement.textContent = generation.toString();
  root.appendChild(generationElement);

  const context = canvas.getContext('2d');
  context.strokeStyle = '#aaa';
  draw(BlankBoard(), board, context);
  window.setInterval(() => {
    const newBoard: Board = JSON.parse(JSON.stringify(board));
    board.forEach((row, rowIndex) => row.forEach((cell, cellIndex) => {
      let neighborhoodsCount = board[rowIndex][cellIndex] ? -1 : 0;
      for (let y = rowIndex -1; y<= rowIndex +1; y++) {
        for (let x = cellIndex -1; x<= cellIndex +1; x++) {

          neighborhoodsCount += board[IS_CYCLIC_BOARD ? (y + WIDTH) % WIDTH : y]?.[IS_CYCLIC_BOARD ? (x + HEIGHT) % HEIGHT: x] ? 1 : 0;
        } 
      }
      if (!cell){
        if (neighborhoodsCount === 3) {
          newBoard[rowIndex][cellIndex] = true;
        }
        return;
      }  
      if (cell && neighborhoodsCount < 2) {
        newBoard[rowIndex][cellIndex] = false;
        return;
      } 
      if (cell && neighborhoodsCount > 3) {
        newBoard[rowIndex][cellIndex] = false;
        return;
      }
    }));
    draw(board, newBoard, context);
    board = newBoard;
    generation++;
    generationElement.textContent = generation.toString();
  }, 10);
}