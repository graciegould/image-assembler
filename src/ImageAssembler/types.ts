/**
 * Type definitions for ImageAssembler component
 */

// ============================================================================
// Spring Animation Types
// ============================================================================

/**
 * Configuration for spring-based animations.
 *
 * Think of the assembled image as being attached to the target position by a spring.
 * When the window resizes, the spring pulls the image to its new location.
 */
export interface SpringConfig {
  /**
   * How "tight" the spring is (50-300)
   * - Lower (50): Loose, slow, more bouncy
   * - Higher (300): Tight, fast, snappy
   * @default 100
   */
  stiffness?: number;

  /**
   * How much friction/resistance there is (10-40)
   * - Lower (10): Bouncy, oscillates back and forth
   * - Higher (40): Smooth, settles quickly without bounce
   * @default 20
   */
  damping?: number;

  /**
   * How "heavy" the object feels (0.1-2)
   * - Lower (0.1): Light, quick, responsive
   * - Higher (2): Heavy, slow, momentum-driven
   * @default 0.5
   */
  mass?: number;
}

// ============================================================================
// Position Types
// ============================================================================

export type TargetPositionPreset =
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type TargetPositionCustom = { x: number; y: number };

export type TargetPosition = TargetPositionPreset | TargetPositionCustom;

export interface Offset {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

// ============================================================================
// Piece Types
// ============================================================================

export type PieceShape = 'triangle' | 'square';

export interface ImagePiece {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  startX: number;
  startY: number;
  startRotate: number;
  delay: number;
  clipPath: string;
  initialClipPath: string;
  trianglePoints: Point[];
}

// ============================================================================
// Component Props
// ============================================================================

export interface ImageAssemblerProps {
  /** URL of the image to display */
  imageUrl?: string;

  /** URL of the video to display */
  videoUrl?: string;

  /** Number of grid divisions (creates gridSize × gridSize cells) */
  gridSize: number;

  /**
   * Where the assembled image should appear
   * Can be a preset string or custom { x, y } percentages
   * @default 'center'
   */
  targetPosition?: TargetPosition;

  /** Starting opacity of pieces @default 0.1 */
  startOpacity?: number;

  /** Final opacity of pieces @default 1 */
  endOpacity?: number;

  /** Animation duration in seconds @default 4 */
  duration?: number;

  /** Shape of the puzzle pieces @default 'triangle' */
  shape?: PieceShape;

  /** Background color/gradient for div mode @default 'linear-gradient(...)' */
  color?: string;

  /** Width for div mode (no image/video) @default 600 */
  width?: number;

  /** Height for div mode (no image/video) @default 400 */
  height?: number;

  /**
   * Image/video width - supports pixels, percentages, or numbers
   * Examples: "80%", "500px", 500
   */
  imageWidth?: string | number;

  /**
   * Image/video height - supports pixels, percentages, or numbers
   * Examples: "80%", "500px", 500
   */
  imageHeight?: string | number;

  /** Whether to show the assembly animation @default true */
  animate?: boolean;

  /** Whether to scale with window resize @default false */
  maintainAspectRatio?: boolean;

  /** Configure spring animation behavior */
  springConfig?: SpringConfig;

  /**
   * Enable dynamic/controlled animation mode.
   * When true, animation state is controlled by animationState prop.
   * When false, animation plays once automatically.
   * @default false
   */
  dynamicAnimation?: boolean;

  /**
   * Animation progress from 0 to 100.
   * Only used when dynamicAnimation is true.
   * 0 = start of animation (pieces scattered)
   * 100 = end of animation (pieces assembled)
   * @default 0
   */
  animationState?: number;
}

// ============================================================================
// Content Types (for rendering different media)
// ============================================================================

export type ContentType = 'image' | 'video' | 'color';

export interface ContentConfig {
  type: ContentType;
  imageUrl?: string;
  videoUrl?: string;
  color?: string;
}
