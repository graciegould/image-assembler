import { useState, useEffect, useRef } from 'react';
import type { Dimensions, TargetPosition, PieceShape, ImagePiece, Offset } from '../types';
import {
  calculateAspectRatioDimensions,
  calculateFitDimensions,
  getDefaultMaxDimensions,
  getParentDimensions,
} from '../utils/dimensions';
import { calculateTargetPosition } from '../utils/position';
import { generatePieces } from '../utils/pieceGenerator';

interface UseContentLoaderOptions {
  imageUrl?: string;
  videoUrl?: string;
  imageWidth?: string | number;
  imageHeight?: string | number;
  divWidth: number;
  divHeight: number;
  gridSize: number;
  shape: PieceShape;
  targetPosition: TargetPosition;
  maintainAspectRatio: boolean;
}

interface UseContentLoaderResult {
  pieces: ImagePiece[];
  imageDimensions: Dimensions;
  originalDimensions: Dimensions;
  targetOffset: Offset;
  contentLoaded: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook for loading image/video content and generating puzzle pieces.
 */
export function useContentLoader(options: UseContentLoaderOptions): UseContentLoaderResult {
  const {
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
  } = options;

  const [pieces, setPieces] = useState<ImagePiece[]>([]);
  const [imageDimensions, setImageDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [originalDimensions, setOriginalDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [targetOffset, setTargetOffset] = useState<Offset>({ x: 0, y: 0 });
  const [contentLoaded, setContentLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Separate effect for target position updates (doesn't regenerate pieces)
  useEffect(() => {
    if (imageDimensions.width > 0) {
      const offset = calculateTargetPosition(imageDimensions.width, imageDimensions.height, targetPosition);
      setTargetOffset(offset);
    }
  }, [targetPosition, imageDimensions.width, imageDimensions.height]);

  useEffect(() => {
    const initializePieces = (width: number, height: number) => {
      const offset = calculateTargetPosition(width, height, targetPosition);
      setTargetOffset(offset);
      setContentLoaded(true);
      // Generate pieces with a fixed offset for random positions
      // The actual target offset is applied separately via containerAnimate
      setPieces(generatePieces(width, height, gridSize, shape, { x: 0, y: 0 }));
    };

    const calculateDimensions = (
      contentWidth: number,
      contentHeight: number
    ): Dimensions => {
      // If custom dimensions provided, use those
      if (imageWidth || imageHeight) {
        const parentDims = getParentDimensions(containerRef.current);
        return calculateAspectRatioDimensions(
          contentWidth,
          contentHeight,
          imageWidth,
          imageHeight,
          parentDims
        );
      }

      // Otherwise fit to default max
      const maxDims = getDefaultMaxDimensions();
      return calculateFitDimensions(
        contentWidth,
        contentHeight,
        maxDims.width,
        maxDims.height
      );
    };

    if (imageUrl) {
      // Image mode
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        const dims = calculateDimensions(img.width, img.height);

        if (maintainAspectRatio) {
          setOriginalDimensions({ width: img.width, height: img.height });
        }

        setImageDimensions(dims);
        initializePieces(dims.width, dims.height);
      };

      img.onerror = () => {
        console.error('Failed to load image:', imageUrl);
        setImageDimensions({ width: divWidth, height: divHeight });
        initializePieces(divWidth, divHeight);
      };
    } else if (videoUrl) {
      // Video mode
      const video = document.createElement('video');
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      video.muted = true;

      video.onloadedmetadata = () => {
        const dims = calculateDimensions(video.videoWidth, video.videoHeight);

        if (maintainAspectRatio) {
          setOriginalDimensions({ width: video.videoWidth, height: video.videoHeight });
        }

        setImageDimensions(dims);
        initializePieces(dims.width, dims.height);
      };

      video.onerror = () => {
        console.error('Failed to load video:', videoUrl);
        setImageDimensions({ width: divWidth, height: divHeight });
        initializePieces(divWidth, divHeight);
      };

      video.load();
    } else {
      // Div mode
      setImageDimensions({ width: divWidth, height: divHeight });
      initializePieces(divWidth, divHeight);
    }
  }, [
    imageUrl,
    videoUrl,
    gridSize,
    shape,
    divWidth,
    divHeight,
    maintainAspectRatio,
    imageWidth,
    imageHeight,
    // Note: targetPosition removed - position changes shouldn't regenerate pieces
  ]);

  return {
    pieces,
    imageDimensions,
    originalDimensions,
    targetOffset,
    contentLoaded,
    containerRef,
  };
}
