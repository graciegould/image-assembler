import type { TargetPosition, Offset } from '../types';

/**
 * Utilities for calculating positions
 */

const EDGE_PADDING = 50;

/**
 * Calculate the target position offset based on window size and position preference.
 *
 * @param width - Content width
 * @param height - Content height
 * @param targetPosition - Position preset or custom coordinates
 */
export function calculateTargetPosition(
  width: number,
  height: number,
  targetPosition: TargetPosition
): Offset {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Handle custom percentage position
  if (typeof targetPosition === 'object') {
    return {
      x: (windowWidth * targetPosition.x) / 100 - width / 2,
      y: (windowHeight * targetPosition.y) / 100 - height / 2,
    };
  }

  // Handle preset positions
  switch (targetPosition) {
    case 'center':
      return {
        x: (windowWidth - width) / 2,
        y: (windowHeight - height) / 2,
      };

    case 'top-left':
      return { x: EDGE_PADDING, y: EDGE_PADDING };

    case 'top-right':
      return {
        x: windowWidth - width - EDGE_PADDING,
        y: EDGE_PADDING,
      };

    case 'bottom-left':
      return {
        x: EDGE_PADDING,
        y: windowHeight - height - EDGE_PADDING,
      };

    case 'bottom-right':
      return {
        x: windowWidth - width - EDGE_PADDING,
        y: windowHeight - height - EDGE_PADDING,
      };

    default:
      return {
        x: (windowWidth - width) / 2,
        y: (windowHeight - height) / 2,
      };
  }
}

/**
 * Generate a random starting position from one of the window edges.
 * Pieces fly in from off-screen.
 *
 * @param offset - The target position offset
 */
export function generateRandomStartPosition(offset: Offset): Offset {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const edge = Math.floor(Math.random() * 4);

  switch (edge) {
    case 0: // top edge
      return {
        x: Math.random() * windowWidth * 1.2 - offset.x - windowWidth * 0.1,
        y: -Math.random() * 250 - 50,
      };

    case 1: // right edge
      return {
        x: windowWidth + Math.random() * 250 + 50 - offset.x,
        y: Math.random() * windowHeight * 1.2 - offset.y - windowHeight * 0.1,
      };

    case 2: // bottom edge
      return {
        x: Math.random() * windowWidth * 1.2 - offset.x - windowWidth * 0.1,
        y: windowHeight + Math.random() * 250 + 50 - offset.y,
      };

    case 3: // left edge
    default:
      return {
        x: -Math.random() * 250 - 50,
        y: Math.random() * windowHeight * 1.2 - offset.y - windowHeight * 0.1,
      };
  }
}

/**
 * Generate a random rotation angle for piece animation.
 * @param maxDegrees - Maximum rotation in degrees (will be ± this value)
 */
export function generateRandomRotation(maxDegrees = 360): number {
  return (Math.random() - 0.5) * maxDegrees * 2;
}

/**
 * Generate a random delay for staggered animation.
 * @param maxDelay - Maximum delay in seconds
 */
export function generateRandomDelay(maxDelay = 1.2): number {
  return Math.random() * maxDelay;
}
