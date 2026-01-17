import type { Dimensions, Offset } from '../types';
import styles from '../ImageAssembler.module.scss';

interface StaticDisplayProps {
  imageUrl?: string;
  videoUrl?: string;
  color: string;
  imageDimensions: Dimensions;
  offset: Offset;
}

/**
 * Static (non-animated) display of the assembled image.
 */
export function StaticDisplay({
  imageUrl,
  videoUrl,
  color,
  imageDimensions,
  offset,
}: StaticDisplayProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        style={{
          width: imageDimensions.width,
          height: imageDimensions.height,
          left: offset.x,
          top: offset.y,
          position: 'absolute',
        }}
      >
        {imageUrl ? (
          <div
            className={styles.imagePiece}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: '100% 100%',
              backgroundPosition: '0 0',
            }}
          />
        ) : videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.videoPiece}
            style={{ width: '100%', height: '100%' }}
            src={videoUrl}
          />
        ) : (
          <div
            className={styles.colorPiece}
            style={{ background: color }}
          />
        )}
      </div>
    </div>
  );
}
