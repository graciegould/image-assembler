import { memo, useMemo } from 'react';
import type { ImagePiece, Dimensions } from '../types';
import { interpolatePieceState } from '../utils/interpolation';
import { PieceContent } from './PieceContent';
import styles from '../ImageAssembler.module.scss';

interface ControlledPieceProps {
  piece: ImagePiece;
  imageUrl?: string;
  videoUrl?: string;
  color: string;
  imageDimensions: Dimensions;
  startOpacity: number;
  endOpacity: number;
  duration: number;
  animationState: number;
}

/**
 * A puzzle piece with externally controlled animation state.
 * Used when dynamicAnimation is true - the animation state is driven by props
 * rather than Framer Motion's automatic animation.
 */
export const ControlledPiece = memo(function ControlledPiece({
  piece,
  imageUrl,
  videoUrl,
  color,
  imageDimensions,
  startOpacity,
  endOpacity,
  duration,
  animationState,
}: ControlledPieceProps) {
  // Calculate interpolated state based on animation progress
  const interpolatedState = useMemo(
    () => interpolatePieceState(piece, animationState, duration, startOpacity, endOpacity),
    [piece, animationState, duration, startOpacity, endOpacity]
  );

  // Round values to avoid sub-pixel jitter
  const x = Math.round(interpolatedState.x * 100) / 100;
  const y = Math.round(interpolatedState.y * 100) / 100;
  const rotate = Math.round(interpolatedState.rotate * 100) / 100;
  const scale = Math.round(interpolatedState.scale * 1000) / 1000;
  const opacity = Math.round(interpolatedState.opacity * 100) / 100;

  // Memoize the combined style with position and transform
  const style = useMemo(() => ({
    width: piece.width + 2,
    height: piece.height + 2,
    left: piece.x - 1,
    top: piece.y - 1,
    opacity,
    clipPath: interpolatedState.clipPath,
    transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
    // GPU acceleration hints
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const,
  }), [
    piece.width,
    piece.height,
    piece.x,
    piece.y,
    x,
    y,
    rotate,
    scale,
    opacity,
    interpolatedState.clipPath,
  ]);

  return (
    <div
      className={styles.piece}
      style={style}
    >
      <PieceContent
        imageUrl={imageUrl}
        videoUrl={videoUrl}
        color={color}
        imageDimensions={imageDimensions}
        pieceX={piece.x}
        pieceY={piece.y}
      />
    </div>
  );
});
