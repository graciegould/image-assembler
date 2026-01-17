import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from '../ImageAssembler.module.scss';

interface CompletionEffectProps {
  lastPieceDelay: number;
  duration: number;
}

// Static values - defined outside to prevent recreation
const INITIAL = { opacity: 0 };
const ANIMATE = { opacity: [0, 1, 0] };
const TIMES = [0, 0.5, 1];

/**
 * Shimmer effect that plays when the puzzle assembly completes.
 * Memoized to prevent unnecessary re-renders.
 */
export const CompletionEffect = memo(function CompletionEffect({
  lastPieceDelay,
  duration,
}: CompletionEffectProps) {
  const transition = useMemo(() => ({
    duration: 1,
    delay: lastPieceDelay + duration,
    times: TIMES,
  }), [lastPieceDelay, duration]);

  return (
    <motion.div
      className={styles.completionEffect}
      initial={INITIAL}
      animate={ANIMATE}
      transition={transition}
    >
      <div className={styles.shimmerGradient} />
    </motion.div>
  );
});
