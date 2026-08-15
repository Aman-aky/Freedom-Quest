import { motion } from 'framer-motion';
import { Flame, ShieldAlert, Sparkles } from 'lucide-react';

interface StatMeterProps {
  label: string;
  value: number;
  delta?: number;
  icon: 'courage' | 'risk' | 'impact';
  delay?: number;
}

const iconMap = {
  courage: Flame,
  risk: ShieldAlert,
  impact: Sparkles,
};

const colorMap = {
  courage: 'from-ember-500 to-ember-400',
  risk: 'from-red-600 to-orange-500',
  impact: 'from-parchment-400 to-parchment-200',
};

export function StatMeter({ label, value, delta, icon, delay = 0 }: StatMeterProps) {
  const Icon = iconMap[icon];
  const gradient = colorMap[icon];
  const max = 200;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="flex items-center gap-3" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-700 ring-1 ring-parchment-700/40">
        <Icon className="h-4 w-4 text-parchment-300" />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-parchment-400">{label}</span>
          <div className="flex items-baseline gap-1.5">
            <motion.span
              key={value}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-typewriter text-sm text-parchment-100"
            >
              {value}
            </motion.span>
            {delta !== undefined && delta !== 0 && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-xs font-medium ${delta > 0 ? 'text-ember-400' : 'text-red-400'}`}
              >
                {delta > 0 ? `+${delta}` : delta}
              </motion.span>
            )}
          </div>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink-600">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay }}
          />
        </div>
      </div>
    </div>
  );
}
