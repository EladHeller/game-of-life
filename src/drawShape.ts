import {Board} from "./types";
import glider from './shapes/glider.txt';
import gliderGun from './shapes/gliderGun.txt';
import grow1 from './shapes/grow1.txt';
import grow2 from './shapes/grow2.txt';
import grow3 from './shapes/grow3.txt';
import LWSS from './shapes/LWSS.txt';
import MWSS from './shapes/MWSS.txt';
import HWSS from './shapes/HWSS.txt';
import puffer1 from './shapes/puffer1.txt';

const shapes = {
  glider, gliderGun, grow1, grow2, grow3, LWSS, MWSS, HWSS, puffer1,
}

type Rotates = 0 | 90 | 180 | 270;

export default function drawShape(
  board: Board, shapeName: keyof typeof shapes, x:number, y:number, turn: Rotates = 0,
) {
  const shape = shapes[shapeName];
  if (shape == null) return;
  
  const shapeRows = shape.split('\n');
  shapeRows.forEach((line, lineIndex) => 
    Array.from(line).forEach((cell, cellIndex) => {
      if (cell !== '█') {
        return;
      }

      const rotated = [90, 270].includes(turn);
      const boardY = [180, 270].includes(turn) ? y-cellIndex : y+cellIndex;
      const boardX = [180, 90].includes(turn) ? x-lineIndex : x+lineIndex;
      board[rotated ? boardX : boardY][rotated ? boardY : boardX]= true;
    })
  );
}