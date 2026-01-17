import type { ImagePiece, PieceShape, Offset } from '../types';
import {
  generateRandomStartPosition,
  generateRandomRotation,
  generateRandomDelay,
} from './position';
import {
  createTriangleClipPath,
  createSquareClipPath,
  generateRandomPolygon,
  getTopLeftTrianglePoints,
  getBottomRightTrianglePoints,
  getSquarePoints,
} from './clipPath';

/**
 * Generate all pieces for the puzzle grid.
 *
 * @param width - Total content width
 * @param height - Total content height
 * @param gridSize - Number of grid divisions
 * @param shape - Shape of pieces ('triangle' or 'square')
 * @param offset - Target position offset
 */
export function generatePieces(
  width: number,
  height: number,
  gridSize: number,
  shape: PieceShape,
  offset: Offset
): ImagePiece[] {
  const cellWidth = width / gridSize;
  const cellHeight = height / gridSize;
  const pieces: ImagePiece[] = [];
  let pieceId = 0;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cellX = col * cellWidth;
      const cellY = row * cellHeight;

      if (shape === 'square') {
        pieces.push(
          createSquarePiece(pieceId++, cellX, cellY, cellWidth, cellHeight, offset)
        );
      } else {
        // Create two triangles per grid cell
        pieces.push(
          createTrianglePiece(
            pieceId++,
            cellX,
            cellY,
            cellWidth,
            cellHeight,
            offset,
            'top-left'
          )
        );
        pieces.push(
          createTrianglePiece(
            pieceId++,
            cellX,
            cellY,
            cellWidth,
            cellHeight,
            offset,
            'bottom-right'
          )
        );
      }
    }
  }

  return pieces;
}

/**
 * Create a single square piece.
 */
function createSquarePiece(
  id: number,
  cellX: number,
  cellY: number,
  cellWidth: number,
  cellHeight: number,
  offset: Offset
): ImagePiece {
  const points = getSquarePoints(cellX, cellY, cellWidth, cellHeight);
  const startPos = generateRandomStartPosition(offset);

  return {
    id,
    x: cellX,
    y: cellY,
    width: cellWidth,
    height: cellHeight,
    startX: startPos.x,
    startY: startPos.y,
    startRotate: generateRandomRotation(),
    delay: generateRandomDelay(),
    clipPath: createSquareClipPath(points, cellX, cellY, cellWidth, cellHeight),
    initialClipPath: generateRandomPolygon('square'),
    trianglePoints: points,
  };
}

/**
 * Create a single triangle piece.
 */
function createTrianglePiece(
  id: number,
  cellX: number,
  cellY: number,
  cellWidth: number,
  cellHeight: number,
  offset: Offset,
  position: 'top-left' | 'bottom-right'
): ImagePiece {
  const points =
    position === 'top-left'
      ? getTopLeftTrianglePoints(cellX, cellY, cellWidth, cellHeight)
      : getBottomRightTrianglePoints(cellX, cellY, cellWidth, cellHeight);

  const startPos = generateRandomStartPosition(offset);

  return {
    id,
    x: cellX,
    y: cellY,
    width: cellWidth,
    height: cellHeight,
    startX: startPos.x,
    startY: startPos.y,
    startRotate: generateRandomRotation(),
    delay: generateRandomDelay(),
    clipPath: createTriangleClipPath(points, cellX, cellY, cellWidth, cellHeight),
    initialClipPath: generateRandomPolygon('triangle'),
    trianglePoints: points,
  };
}
