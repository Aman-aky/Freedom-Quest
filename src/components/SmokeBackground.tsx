import { motion } from 'framer-motion';

export function SmokeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 400 + i * 120,
            height: 400 + i * 120,
            left: `${10 + i * 18}%`,
            top: `${5 + (i % 2) * 35}%`,
            background: `radial-gradient(circle, rgba(135,90,42,${0.06 - i * 0.008}) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30 - i * 5, 0],
            y: [0, -20 + i * 3, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
