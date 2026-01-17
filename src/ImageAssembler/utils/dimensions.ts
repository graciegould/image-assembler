import type { Dimensions } from '../types';

/**
 * Utilities for calculating and parsing dimensions
 */

/**
 * Parse a dimension value that can be pixels, percentages, or numbers.
 *
 * @param value - The value to parse (e.g., "80%", "500px", 500)
 * @param fallback - Fallback value if parsing fails
 * @param parentSize - Parent container size (used for percentage calculations)
 */
export function parseDimension(
  value: string | number | undefined,
  fallback: number,
  parentSize: number
): number {
  if (value === undefined || value === null) {
    return fallback;
  }

  const valueStr = String(value);

  // Handle percentage - based on parent container
  if (valueStr.includes('%')) {
    const percentage = parseFloat(valueStr) / 100;
    return parentSize * percentage;
  }

  // Handle pixel strings (with or without 'px')
  if (valueStr.includes('px')) {
    return parseFloat(valueStr);
  }

  // Handle plain numbers (treat as pixels)
  const numValue = parseFloat(valueStr);
  if (!isNaN(numValue)) {
    return numValue;
  }

  return fallback;
}

/**
 * Get the parent element dimensions or fall back to window dimensions.
 */
export function getParentDimensions(
  containerElement: HTMLElement | null
): Dimensions {
  if (containerElement?.parentElement) {
    const parentRect = containerElement.parentElement.getBoundingClientRect();
    return { width: parentRect.width, height: parentRect.height };
  }

  return { width: window.innerWidth, height: window.innerHeight };
}

/**
 * Calculate dimensions while preserving aspect ratio.
 *
 * @param contentWidth - Original content width
 * @param contentHeight - Original content height
 * @param targetWidth - Desired width (optional)
 * @param targetHeight - Desired height (optional)
 * @param parentDimensions - Parent container dimensions for percentage calculations
 */
export function calculateAspectRatioDimensions(
  contentWidth: number,
  contentHeight: number,
  targetWidth: string | number | undefined,
  targetHeight: string | number | undefined,
  parentDimensions: Dimensions
): Dimensions {
  const aspectRatio = contentHeight / contentWidth;

  // If both are specified, use them directly
  if (targetWidth && targetHeight) {
    return {
      width: parseDimension(targetWidth, contentWidth, parentDimensions.width),
      height: parseDimension(targetHeight, contentHeight, parentDimensions.height),
    };
  }

  // If only width is specified, calculate height based on aspect ratio
  if (targetWidth) {
    const width = parseDimension(targetWidth, contentWidth, parentDimensions.width);
    return { width, height: width * aspectRatio };
  }

  // If only height is specified, calculate width based on aspect ratio
  if (targetHeight) {
    const height = parseDimension(targetHeight, contentHeight, parentDimensions.height);
    return { width: height / aspectRatio, height };
  }

  // No custom dimensions - return original
  return { width: contentWidth, height: contentHeight };
}

/**
 * Calculate scaled dimensions that fit within max bounds.
 *
 * @param originalWidth - Original width
 * @param originalHeight - Original height
 * @param maxWidth - Maximum allowed width
 * @param maxHeight - Maximum allowed height
 * @param allowScaleUp - Whether to scale up if smaller than max (default: false)
 */
export function calculateFitDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
  allowScaleUp = false
): Dimensions {
  const scale = Math.min(
    maxWidth / originalWidth,
    maxHeight / originalHeight,
    allowScaleUp ? Infinity : 1
  );

  return {
    width: originalWidth * scale,
    height: originalHeight * scale,
  };
}

/**
 * Get default max dimensions based on window size.
 */
export function getDefaultMaxDimensions(): Dimensions {
  return {
    width: Math.min(800, window.innerWidth - 100),
    height: Math.min(600, window.innerHeight - 300),
  };
}
