import { memo, useMemo } from 'react';
import type { Dimensions } from '../types';
import styles from '../ImageAssembler.module.scss';

interface PieceContentProps {
  imageUrl?: string;
  videoUrl?: string;
  color: string;
  imageDimensions: Dimensions;
  pieceX: number;
  pieceY: number;
}

/**
 * Renders the content inside a puzzle piece (image, video, or color).
 * Memoized to prevent unnecessary re-renders during animation.
 */
export const PieceContent = memo(function PieceContent({
  imageUrl,
  videoUrl,
  color,
  imageDimensions,
  pieceX,
  pieceY,
}: PieceContentProps) {
  // Memoize style objects to prevent recreation on each render
  const imageStyle = useMemo(() => {
    if (!imageUrl) return undefined;
    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `${imageDimensions.width + 2}px ${imageDimensions.height + 2}px`,
      backgroundPosition: `-${pieceX}px -${pieceY}px`,
    };
  }, [imageUrl, imageDimensions.width, imageDimensions.height, pieceX, pieceY]);

  const videoStyle = useMemo(() => {
    if (!videoUrl) return undefined;
    return {
      objectFit: 'none' as const,
      objectPosition: `-${pieceX}px -${pieceY}px`,
      width: imageDimensions.width + 2,
      height: imageDimensions.height + 2,
    };
  }, [videoUrl, imageDimensions.width, imageDimensions.height, pieceX, pieceY]);

  if (imageUrl) {
    return (
      <div
        className={styles.imagePiece}
        style={imageStyle}
      />
    );
  }

  if (videoUrl) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoPiece}
        style={videoStyle}
        src={videoUrl}
      />
    );
  }

  return (
    <div
      className={styles.colorPiece}
      style={{ background: color }}
    />
  );
});
