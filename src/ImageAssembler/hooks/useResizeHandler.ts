import { useEffect, useRef } from 'react';
import type { Dimensions, TargetPosition, Offset } from '../types';
import { calculateTargetPosition } from '../utils/position';
import { calculateFitDimensions } from '../utils/dimensions';

interface UseResizeHandlerOptions {
  contentLoaded: boolean;
  imageDimensions: Dimensions;
  originalDimensions: Dimensions;
  targetPosition: TargetPosition;
  maintainAspectRatio: boolean;
  onDimensionsChange: (dims: Dimensions) => void;
  onOffsetChange: (offset: Offset) => void;
}

const RESIZE_DEBOUNCE_MS = 200;

/**
 * Hook for handling window resize with debouncing and spring transitions.
 */
export function useResizeHandler(options: UseResizeHandlerOptions): void {
  const {
    contentLoaded,
    imageDimensions,
    originalDimensions,
    targetPosition,
    maintainAspectRatio,
    onDimensionsChange,
    onOffsetChange,
  } = options;

  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!contentLoaded || imageDimensions.width === 0) return;

    const handleResize = () => {
      // Debounce resize events for smoother transitions
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (maintainAspectRatio && originalDimensions.width > 0) {
          // Recalculate and scale the content
          const maxWidth = Math.min(800, window.innerWidth - 100);
          const maxHeight = Math.min(600, window.innerHeight - 300);

          const newDims = calculateFitDimensions(
            originalDimensions.width,
            originalDimensions.height,
            maxWidth,
            maxHeight
          );

          onDimensionsChange(newDims);
          onOffsetChange(calculateTargetPosition(newDims.width, newDims.height, targetPosition));
        } else {
          // Just update position, not dimensions
          onOffsetChange(
            calculateTargetPosition(imageDimensions.width, imageDimensions.height, targetPosition)
          );
        }
      }, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [
    contentLoaded,
    imageDimensions,
    targetPosition,
    maintainAspectRatio,
    originalDimensions,
    onDimensionsChange,
    onOffsetChange,
  ]);
}
