import { useState } from 'react';
import ImageAssembler from '../ImageAssembler/ImageAssembler';
import type { PieceShape } from '../ImageAssembler/types';
import sunflower from '../../images/sunflower.png';

interface DynamicInterpolationProps {
  /** Image URL (defaults to sunflower) */
  imageUrl?: string;
  /** Number of grid divisions */
  gridSize?: number;
  /** Initial piece shape */
  initialShape?: PieceShape;
  /** Initial animation state (0-100) */
  initialAnimationState?: number;
  /** Initial start opacity */
  initialStartOpacity?: number;
  /** Initial end opacity */
  initialEndOpacity?: number;
  /** Initial X position (0-100%) */
  initialPositionX?: number;
  /** Initial Y position (0-100%) */
  initialPositionY?: number;
  /** Initial scale (10-100%) */
  initialScale?: number;
  /** Maintain aspect ratio on resize */
  maintainAspectRatio?: boolean;
  /** Animation duration (affects stagger timing) */
  duration?: number;
}

/**
 * Demo: Dynamic Interpolation
 *
 * Demonstrates the controlled animation mode where the animation state
 * is driven by a slider (0-100%). This allows scrubbing through the
 * animation at any point.
 */
export default function DynamicInterpolation({
  imageUrl = sunflower,
  gridSize = 10,
  initialShape = 'square',
  initialAnimationState = 0,
  initialStartOpacity = 0.1,
  initialEndOpacity = 1,
  initialPositionX = 50,
  initialPositionY = 50,
  initialScale = 80,
  maintainAspectRatio = true,
  duration = 4,
}: DynamicInterpolationProps) {
  const [animationState, setAnimationState] = useState(initialAnimationState);
  const [startOpacity, setStartOpacity] = useState(initialStartOpacity);
  const [endOpacity, setEndOpacity] = useState(initialEndOpacity);
  const [shape, setShape] = useState<PieceShape>(initialShape);
  const [positionX, setPositionX] = useState(initialPositionX);
  const [positionY, setPositionY] = useState(initialPositionY);
  const [scale, setScale] = useState(initialScale);

  return (
    <>
      <ImageAssembler
        key={shape} // Force remount when shape changes
        imageUrl={imageUrl}
        gridSize={gridSize}
        maintainAspectRatio={maintainAspectRatio}
        dynamicAnimation={true}
        animationState={animationState}
        startOpacity={startOpacity}
        endOpacity={endOpacity}
        shape={shape}
        targetPosition={{ x: positionX, y: positionY }}
        imageWidth={`${scale}%`}
        duration={duration}
      />

      <div style={{
        position: 'fixed',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(0,0,0,0.7)',
        padding: '16px 24px',
        borderRadius: 12,
        color: 'white',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14 }}>Animation: {animationState}%</span>
          <input
            type="range"
            min={0}
            max={100}
            value={animationState}
            onChange={(e) => setAnimationState(Number(e.target.value))}
            style={{ width: 300 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12 }}>Start Opacity: {startOpacity.toFixed(2)}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={startOpacity}
              onChange={(e) => setStartOpacity(Number(e.target.value))}
              style={{ width: 120 }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12 }}>End Opacity: {endOpacity.toFixed(2)}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={endOpacity}
              onChange={(e) => setEndOpacity(Number(e.target.value))}
              style={{ width: 120 }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 12 }}>Shape:</span>
          <label style={{ fontSize: 12, cursor: 'pointer' }}>
            <input
              type="radio"
              name="shape"
              value="triangle"
              checked={shape === 'triangle'}
              onChange={() => setShape('triangle')}
              style={{ marginRight: 4 }}
            />
            Triangle
          </label>
          <label style={{ fontSize: 12, cursor: 'pointer' }}>
            <input
              type="radio"
              name="shape"
              value="square"
              checked={shape === 'square'}
              onChange={() => setShape('square')}
              style={{ marginRight: 4 }}
            />
            Square
          </label>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12 }}>Position X: {positionX}%</span>
            <input
              type="range"
              min={0}
              max={100}
              value={positionX}
              onChange={(e) => setPositionX(Number(e.target.value))}
              style={{ width: 100 }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12 }}>Position Y: {positionY}%</span>
            <input
              type="range"
              min={0}
              max={100}
              value={positionY}
              onChange={(e) => setPositionY(Number(e.target.value))}
              style={{ width: 100 }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12 }}>Scale: {scale}%</span>
            <input
              type="range"
              min={10}
              max={100}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              style={{ width: 100 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
