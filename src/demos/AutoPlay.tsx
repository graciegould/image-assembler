import ImageAssembler from '../ImageAssembler/ImageAssembler';
import type { ImageAssemblerProps } from '../ImageAssembler/types';
import sunflower from '../../images/sunflower.png';

interface AutoPlayProps {
  /** Image URL (defaults to sunflower) */
  imageUrl?: string;
  /** Number of grid divisions */
  gridSize?: number;
  /** Piece shape */
  shape?: ImageAssemblerProps['shape'];
  /** Animation duration in seconds */
  duration?: number;
  /** Starting opacity */
  startOpacity?: number;
  /** Ending opacity */
  endOpacity?: number;
  /** Target position */
  targetPosition?: ImageAssemblerProps['targetPosition'];
  /** Image width */
  imageWidth?: ImageAssemblerProps['imageWidth'];
  /** Maintain aspect ratio on resize */
  maintainAspectRatio?: boolean;
}

/**
 * Demo: Auto Play
 *
 * Demonstrates the default animation mode where the puzzle pieces
 * automatically animate from scattered to assembled when the component mounts.
 * The animation plays once with the shimmer completion effect.
 */
export default function AutoPlay({
  imageUrl = sunflower,
  gridSize = 10,
  shape = 'triangle',
  duration = 4,
  startOpacity = 0.1,
  endOpacity = 1,
  targetPosition = 'center',
  imageWidth,
  maintainAspectRatio = true,
}: AutoPlayProps) {
  return (
    <ImageAssembler
      imageUrl={imageUrl}
      gridSize={gridSize}
      shape={shape}
      duration={duration}
      startOpacity={startOpacity}
      endOpacity={endOpacity}
      targetPosition={targetPosition}
      imageWidth={imageWidth}
      maintainAspectRatio={maintainAspectRatio}
    />
  );
}
