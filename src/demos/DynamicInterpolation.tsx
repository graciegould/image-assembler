import { useState } from 'react';
import ImageAssembler from '../ImageAssembler/ImageAssembler';
import type { PieceShape, ImageAssemblerProps } from '../ImageAssembler/types';
import sunflower from '../../images/sunflower.png';

interface DynamicInterpolationProps extends ImageAssemblerProps {
  /** Initial X position for target (0-100%) */
  initialPositionX?: number;
  /** Initial Y position for target (0-100%) */
  initialPositionY?: number;
  /** Initial scale percentage (10-100%) */
  initialScale?: number;
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
  shape = 'square',
  animationState = 0,
  startOpacity = 0.1,
  endOpacity = 1,
  initialPositionX = 50,
  initialPositionY = 50,
  initialScale = 80,
  maintainAspectRatio = true,
  duration = 4,
  dynamicAnimation = true,
}: DynamicInterpolationProps) {
  const [animationStateValue, setAnimationStateValue] = useState(animationState);
  const [startOpacityValue, setStartOpacityValue] = useState(startOpacity);
  const [endOpacityValue, setEndOpacityValue] = useState(endOpacity);
  const [shapeValue, setShapeValue] = useState<PieceShape>(shape as PieceShape);
  const [positionX, setPositionX] = useState(initialPositionX);
  const [positionY, setPositionY] = useState(initialPositionY);
  const [scale, setScale] = useState(initialScale);

  return (
    <>
      <ImageAssembler
        key={shapeValue} // Force remount when shape changes
        imageUrl={imageUrl}
        gridSize={gridSize}
        maintainAspectRatio={maintainAspectRatio}
        dynamicAnimation={dynamicAnimation}
        animationState={animationStateValue}
        startOpacity={startOpacityValue}
        endOpacity={endOpacityValue}
        shape={shapeValue}
        targetPosition={{ x: positionX, y: positionY }}
        imageWidth={`${scale}%`}
        duration={duration}
      />

      <div style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
        background: 'rgba(0,0,0,0.7)',
        padding: '20px 16px',
        borderRadius: 12,
        color: 'white',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, width: 80 }}>Animation</span>
          <input
            type="range"
            min={0}
            max={100}
            value={animationStateValue}
            onChange={(e) => setAnimationStateValue(Number(e.target.value))}
            style={{ width: 120 }}
          />
          <span style={{ fontSize: 11, width: 36, textAlign: 'right' }}>{animationStateValue}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, width: 80 }}>Start Opacity</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={startOpacityValue}
            onChange={(e) => setStartOpacityValue(Number(e.target.value))}
            style={{ width: 120 }}
          />
          <span style={{ fontSize: 11, width: 36, textAlign: 'right' }}>{startOpacityValue.toFixed(2)}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, width: 80 }}>End Opacity</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={endOpacityValue}
            onChange={(e) => setEndOpacityValue(Number(e.target.value))}
            style={{ width: 120 }}
          />
          <span style={{ fontSize: 11, width: 36, textAlign: 'right' }}>{endOpacityValue.toFixed(2)}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, width: 80 }}>Position X</span>
          <input
            type="range"
            min={0}
            max={100}
            value={positionX}
            onChange={(e) => setPositionX(Number(e.target.value))}
            style={{ width: 120 }}
          />
          <span style={{ fontSize: 11, width: 36, textAlign: 'right' }}>{positionX}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, width: 80 }}>Position Y</span>
          <input
            type="range"
            min={0}
            max={100}
            value={positionY}
            onChange={(e) => setPositionY(Number(e.target.value))}
            style={{ width: 120 }}
          />
          <span style={{ fontSize: 11, width: 36, textAlign: 'right' }}>{positionY}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, width: 80 }}>Scale</span>
          <input
            type="range"
            min={10}
            max={100}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            style={{ width: 120 }}
          />
          <span style={{ fontSize: 11, width: 36, textAlign: 'right' }}>{scale}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 12, width: 80 }}>Shape</span>
          <label style={{ fontSize: 12, cursor: 'pointer' }}>
            <input
              type="radio"
              name="shape"
              value="triangle"
              checked={shapeValue === 'triangle'}
              onChange={() => setShapeValue('triangle')}
              style={{ marginRight: 4 }}
            />
            Triangle
          </label>
          <label style={{ fontSize: 12, cursor: 'pointer' }}>
            <input
              type="radio"
              name="shape"
              value="square"
              checked={shapeValue === 'square'}
              onChange={() => setShapeValue('square')}
              style={{ marginRight: 4 }}
            />
            Square
          </label>
        </div>
      </div>
    </>
  );
}
