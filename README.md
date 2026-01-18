# Image Assembler

A React component that breaks images, videos, or solid colors into puzzle pieces and animates them assembling together. 

![Demo 1](./demo1.gif)

## Installation

```bash
npm install
npm start
```

## Basic Usage

### Auto-Play Animation

```tsx
import { ImageAssembler } from './ImageAssembler';

<ImageAssembler
  imageUrl="/path/to/image.png"
  gridSize={10}
  shape="triangle"
  duration={4}
  targetPosition="center"
/>
```
 ![Demo 2](./demo2.gif)

### Controlled Animation
![Demo 1](./demo3.gif)

```tsx
import { ImageAssembler } from './ImageAssembler';

const [progress, setProgress] = useState(0);

<ImageAssembler
  imageUrl="/path/to/image.png"
  gridSize={10}
  dynamicAnimation={true}
  animationState={progress}  // 0-100
/>

<input
  type="range"
  min={0}
  max={100}
  value={progress}
  onChange={(e) => setProgress(Number(e.target.value))}
/>
```

### Color/Gradient Mode

```tsx
<ImageAssembler
  color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  width={600}
  height={400}
  gridSize={8}
  shape="square"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string` | - | URL of the image to display |
| `videoUrl` | `string` | - | URL of the video to display |
| `color` | `string` | - | Background color/gradient (for div mode) |
| `gridSize` | `number` | **required** | Number of grid divisions (creates gridSize x gridSize cells) |
| `shape` | `'triangle' \| 'square'` | `'triangle'` | Shape of puzzle pieces |
| `duration` | `number` | `4` | Animation duration in seconds |
| `targetPosition` | `TargetPosition` | `'center'` | Where the assembled image appears (see below) |
| `startOpacity` | `number` | `0.1` | Starting opacity of pieces |
| `endOpacity` | `number` | `1` | Final opacity of pieces |
| `animate` | `boolean` | `true` | Whether to show animation |
| `dynamicAnimation` | `boolean` | `false` | Enable controlled animation mode |
| `animationState` | `number` | `0` | Animation progress 0-100 (when `dynamicAnimation` is true) |
| `imageWidth` | `string \| number` | - | Custom width (`"80%"`, `"500px"`, or `500`) |
| `imageHeight` | `string \| number` | - | Custom height (`"80%"`, `"500px"`, or `500`) |
| `width` | `number` | `600` | Width for div mode (no image/video) |
| `height` | `number` | `400` | Height for div mode (no image/video) |
| `maintainAspectRatio` | `boolean` | `false` | Scale with window resize |
| `springConfig` | `SpringConfig` | - | Configure spring animation behavior |

### TargetPosition

Position presets: `'center'`, `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`

Or custom coordinates: `{ x: 50, y: 50 }` (percentages)

### SpringConfig

```tsx
{
  stiffness?: number;  // 50-300, default 100 (higher = snappier)
  damping?: number;    // 10-40, default 20 (higher = less bounce)
  mass?: number;       // 0.1-2, default 0.5 (higher = heavier feel)
}
```

## Animation Modes

**Auto-play** (default): Animation plays once automatically when the component mounts. Each piece has a staggered delay creating a cascade effect.

**Controlled**: Set `dynamicAnimation={true}` and control progress via `animationState` (0-100). Enables scrubbing, pausing, and reversing the animation.
