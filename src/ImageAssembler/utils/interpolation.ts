/**
 * Interpolation utilities for controlled animation state
 */

import type { ImagePiece } from '../types';

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Apply easeOut easing function
 * Makes the animation decelerate towards the end
 */
export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Calculate the normalized progress for a piece based on its delay
 * Each piece starts animating at its delay point and completes by the end
 */
export function calculatePieceProgress(
  globalProgress: number,
  pieceDelay: number,
  totalDuration: number
): number {
  // Convert global progress (0-100) to time-based progress
  const currentTime = (globalProgress / 100) * totalDuration;

  // Calculate how much time has passed since this piece started
  const pieceElapsedTime = currentTime - pieceDelay;

  // Calculate the duration available for this piece
  // Each piece animates from its delay until the end of the total duration
  const pieceDuration = totalDuration - pieceDelay;

  if (pieceDuration <= 0) return globalProgress >= 100 ? 1 : 0;

  // Calculate piece-specific progress (0-1)
  const pieceProgress = clamp(pieceElapsedTime / pieceDuration, 0, 1);

  // Apply easing
  return easeOut(pieceProgress);
}

/**
 * Calculate interpolated values for a piece at a given animation state
 */
export interface InterpolatedPieceState {
  x: number;
  y: number;
  rotate: number;
  opacity: number;
  scale: number;
  clipPath: string;
}

export function interpolatePieceState(
  piece: ImagePiece,
  animationState: number,
  totalDuration: number,
  startOpacity: number,
  endOpacity: number
): InterpolatedPieceState {
  const progress = calculatePieceProgress(animationState, piece.delay, totalDuration);

  return {
    x: lerp(piece.startX, 0, progress),
    y: lerp(piece.startY, 0, progress),
    rotate: lerp(piece.startRotate, 0, progress),
    opacity: lerp(startOpacity, endOpacity, progress),
    scale: lerp(0.2, 1, progress),
    // Use final clipPath throughout - the initial random shape isn't visible
    // when pieces are small/transparent anyway, and this avoids a jarring switch
    clipPath: piece.clipPath,
  };
}
