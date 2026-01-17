import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ImagePiece, Dimensions } from '../types';
import { PieceContent } from './PieceContent';
import styles from '../ImageAssembler.module.scss';

interface AnimatedPieceProps {
  piece: ImagePiece;
  imageUrl?: string;
  videoUrl?: string;
  color: string;
  imageDimensions: Dimensions;
  startOpacity: number;
  endOpacity: number;
  duration: number;
}

/**
 * A single animated puzzle piece.
 * Memoized to prevent re-renders during sibling animations.
 */
export const AnimatedPiece = memo(function AnimatedPiece({
  piece,
  imageUrl,
  videoUrl,
  color,
  imageDimensions,
  startOpacity,
  endOpacity,
  duration,
}: AnimatedPieceProps) {
  // Memoize static style to prevent object recreation
  const style = useMemo(() => ({
    width: piece.width + 2,
    height: piece.height + 2,
    left: piece.x - 1,
    top: piece.y - 1,
    // GPU acceleration hints
    willChange: 'transform, opacity, clip-path',
    backfaceVisibility: 'hidden' as const,
    transform: 'translateZ(0)', // Force GPU layer
  }), [piece.width, piece.height, piece.x, piece.y]);

  // Memoize initial state
  const initial = useMemo(() => ({
    x: piece.startX,
    y: piece.startY,
    rotate: piece.startRotate,
    opacity: startOpacity,
    scale: 0.2,
    clipPath: piece.initialClipPath,
  }), [piece.startX, piece.startY, piece.startRotate, piece.initialClipPath, startOpacity]);

  // Memoize animate state
  const animate = useMemo(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    opacity: endOpacity,
    scale: 1,
    clipPath: piece.clipPath,
  }), [piece.clipPath, endOpacity]);

  // Memoize transition config
  const transition = useMemo(() => ({
    duration,
    delay: piece.delay,
    ease: 'easeOut' as const, // easeOut is less CPU intensive than easeInOut
    opacity: { duration: duration * 0.8, delay: piece.delay, ease: 'easeOut' as const },
    // Simplify clipPath animation - it's expensive
    clipPath: { duration: duration * 0.9, delay: piece.delay, ease: 'easeOut' as const },
  }), [duration, piece.delay]);

  return (
    <motion.div
      className={styles.piece}
      style={style}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <PieceContent
        imageUrl={imageUrl}
        videoUrl={videoUrl}
        color={color}
        imageDimensions={imageDimensions}
        pieceX={piece.x}
        pieceY={piece.y}
      />
    </motion.div>
  );
});
