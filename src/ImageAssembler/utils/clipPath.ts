import type { Point, PieceShape } from '../types';

/**
 * Utilities for generating CSS clip-path polygons
 */

/**
 * Convert absolute points to percentage-based clip-path polygon.
 *
 * @param points - Array of absolute coordinate points
 * @param containerX - Container X position
 * @param containerY - Container Y position
 * @param containerWidth - Container width
 * @param containerHeight - Container height
 */
export function createClipPath(
  points: Point[],
  containerX: number,
  containerY: number,
  containerWidth: number,
  containerHeight: number
): string {
  const relativePoints = points.map((point) => ({
    x: ((point.x - containerX) / containerWidth) * 100,
    y: ((point.y - containerY) / containerHeight) * 100,
  }));

  const pathString = relativePoints.map((p) => `${p.x}% ${p.y}%`).join(', ');

  return `polygon(${pathString})`;
}

/**
 * Create clip path for a triangle piece.
 */
export function createTriangleClipPath(
  points: Point[],
  containerX: number,
  containerY: number,
  containerWidth: number,
  containerHeight: number
): string {
  return createClipPath(points, containerX, containerY, containerWidth, containerHeight);
}

/**
 * Create clip path for a square piece.
 */
export function createSquareClipPath(
  points: Point[],
  containerX: number,
  containerY: number,
  containerWidth: number,
  containerHeight: number
): string {
  return createClipPath(points, containerX, containerY, containerWidth, containerHeight);
}

/**
 * Generate a random polygon for the initial morph state.
 * Creates an irregular shape that will animate into the final piece shape.
 *
 * @param shape - The target shape type (affects number of vertices)
 */
export function generateRandomPolygon(shape: PieceShape = 'triangle'): string {
  const centerX = 50;
  const centerY = 50;
  const pointCount = shape === 'square' ? 4 : 3;
  const coords: string[] = [];

  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * Math.PI * 2 + Math.random() * 0.5;
    const radius = 20 + Math.random() * 20;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    coords.push(`${x}% ${y}%`);
  }

  return `polygon(${coords.join(', ')})`;
}

/**
 * Get triangle points for the top-left triangle in a grid cell.
 */
export function getTopLeftTrianglePoints(
  cellX: number,
  cellY: number,
  cellWidth: number,
  cellHeight: number
): Point[] {
  return [
    { x: cellX, y: cellY }, // top-left
    { x: cellX + cellWidth, y: cellY }, // top-right
    { x: cellX, y: cellY + cellHeight }, // bottom-left
  ];
}

/**
 * Get triangle points for the bottom-right triangle in a grid cell.
 */
export function getBottomRightTrianglePoints(
  cellX: number,
  cellY: number,
  cellWidth: number,
  cellHeight: number
): Point[] {
  return [
    { x: cellX + cellWidth, y: cellY }, // top-right
    { x: cellX + cellWidth, y: cellY + cellHeight }, // bottom-right
    { x: cellX, y: cellY + cellHeight }, // bottom-left
  ];
}

/**
 * Get square points for a grid cell.
 */
export function getSquarePoints(
  cellX: number,
  cellY: number,
  cellWidth: number,
  cellHeight: number
): Point[] {
  return [
    { x: cellX, y: cellY }, // top-left
    { x: cellX + cellWidth, y: cellY }, // top-right
    { x: cellX + cellWidth, y: cellY + cellHeight }, // bottom-right
    { x: cellX, y: cellY + cellHeight }, // bottom-left
  ];
}
