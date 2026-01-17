import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ImageAssemblerProps, Dimensions, Offset } from './types';
import { useContentLoader } from './hooks/useContentLoader';
import { useResizeHandler } from './hooks/useResizeHandler';
import { calculateTargetPosition } from './utils/position';
import { AnimatedPiece, ControlledPiece, CompletionEffect, StaticDisplay } from './components';
import styles from './ImageAssembler.module.scss';

// Default values - defined outside component to prevent recreation
const DEFAULT_COLOR = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
const DEFAULT_SPRING_CONFIG = { stiffness: 100, damping: 20, mass: 0.5 };

export default function ImageAssembler({
  imageUrl,
  videoUrl,
  gridSize,
  targetPosition = 'center',
  startOpacity = 0.1,
  endOpacity = 1,
  duration = 4,
  shape = 'triangle',
  color = DEFAULT_COLOR,
  width: divWidth = 600,
  height: divHeight = 400,
  imageWidth,
  imageHeight,
  animate = true,
  maintainAspectRatio = false,
  springConfig = DEFAULT_SPRING_CONFIG,
  dynamicAnimation = false,
  animationState = 0,
}: ImageAssemblerProps) {
  // Load content and generate pieces
  const {
    pieces,
    imageDimensions: loadedDimensions,
    originalDimensions,
    targetOffset: loadedOffset,
    contentLoaded,
    containerRef,
  } = useContentLoader({
    imageUrl,
    videoUrl,
    imageWidth,
    imageHeight,
    divWidth,
    divHeight,
    gridSize,
    shape,
    targetPosition,
    maintainAspectRatio,
  });

  // Local state for resize updates
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });

  // Sync loaded values to local state when they change
  useEffect(() => {
    if (loadedDimensions.width > 0) {
      setDimensions(loadedDimensions);
    }
  }, [loadedDimensions]);

  useEffect(() => {
    if (loadedOffset.x !== 0 || loadedOffset.y !== 0) {
      setOffset(loadedOffset);
    }
  }, [loadedOffset]);

  // Use synced values
  const imageDimensions = dimensions.width > 0 ? dimensions : loadedDimensions;
  const targetOffset = offset;

  // Handle resize - memoized callbacks
  const handleDimensionsChange = useCallback((dims: Dimensions) => {
    setDimensions(dims);
  }, []);

  const handleOffsetChange = useCallback((newOffset: Offset) => {
    setOffset(newOffset);
  }, []);

  useResizeHandler({
    contentLoaded,
    imageDimensions,
    originalDimensions,
    targetPosition,
    maintainAspectRatio,
    onDimensionsChange: handleDimensionsChange,
    onOffsetChange: handleOffsetChange,
  });

  // Memoize container style
  const containerStyle = useMemo(() => ({
    width: imageDimensions.width,
    height: imageDimensions.height,
  }), [imageDimensions.width, imageDimensions.height]);

  // Memoize animation target
  const containerAnimate = useMemo(() => ({
    x: targetOffset.x,
    y: targetOffset.y,
    width: imageDimensions.width,
    height: imageDimensions.height,
  }), [targetOffset.x, targetOffset.y, imageDimensions.width, imageDimensions.height]);

  // Memoize transition config
  const containerTransition = useMemo(() => ({
    type: 'spring' as const,
    stiffness: springConfig.stiffness ?? DEFAULT_SPRING_CONFIG.stiffness,
    damping: springConfig.damping ?? DEFAULT_SPRING_CONFIG.damping,
    mass: springConfig.mass ?? DEFAULT_SPRING_CONFIG.mass,
  }), [springConfig.stiffness, springConfig.damping, springConfig.mass]);

  // Memoize last piece delay calculation
  const lastPieceDelay = useMemo(() =>
    pieces[pieces.length - 1]?.delay ?? 0,
  [pieces]);

  // Don't render until content is loaded
  if (!contentLoaded || imageDimensions.width === 0) {
    return null;
  }

  // Static display (no animation)
  if (!animate) {
    const staticOffset = calculateTargetPosition(
      imageDimensions.width,
      imageDimensions.height,
      targetPosition
    );

    return (
      <StaticDisplay
        imageUrl={imageUrl}
        videoUrl={videoUrl}
        color={color}
        imageDimensions={imageDimensions}
        offset={staticOffset}
      />
    );
  }

  // Animated display
  return (
    <div className={styles.wrapper}>
      <motion.div
        ref={containerRef}
        className={styles.container}
        style={containerStyle}
        animate={containerAnimate}
        transition={containerTransition}
      >
        {dynamicAnimation ? (
          // Controlled animation mode - state driven by animationState prop
          pieces.map((piece) => (
            <ControlledPiece
              key={piece.id}
              piece={piece}
              imageUrl={imageUrl}
              videoUrl={videoUrl}
              color={color}
              imageDimensions={imageDimensions}
              startOpacity={startOpacity}
              endOpacity={endOpacity}
              duration={duration}
              animationState={animationState}
            />
          ))
        ) : (
          // Auto-play animation mode - plays once automatically
          <>
            {pieces.map((piece) => (
              <AnimatedPiece
                key={piece.id}
                piece={piece}
                imageUrl={imageUrl}
                videoUrl={videoUrl}
                color={color}
                imageDimensions={imageDimensions}
                startOpacity={startOpacity}
                endOpacity={endOpacity}
                duration={duration}
              />
            ))}
            <CompletionEffect lastPieceDelay={lastPieceDelay} duration={duration} />
          </>
        )}
      </motion.div>
    </div>
  );
}
