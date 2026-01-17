/**
 * ImageAssembler - A React component that splits images into puzzle pieces
 * and animates them assembling together.
 *
 * @example
 * ```tsx
 * <ImageAssembler
 *   imageUrl="/path/to/image.jpg"
 *   gridSize={4}
 *   shape="triangle"
 *   duration={3}
 * />
 * ```
 */

export { default } from './ImageAssembler';
export { default as ImageAssembler } from './ImageAssembler';

// Re-export types for consumers
export type {
  ImageAssemblerProps,
  SpringConfig,
  TargetPosition,
  PieceShape,
  Dimensions,
  Offset,
} from './types';
