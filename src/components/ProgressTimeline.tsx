import { motion } from 'framer-motion';

interface ProgressTimelineProps {
  currentYear: number;
  visitedYears: number[];
}

const years = [1942, 1943, 1944, 1945, 1946, 1947];

export function ProgressTimeline({ currentYear, visitedYears }: ProgressTimelineProps) {
  return (
    <div className="mx-auto flex max-w-2xl items-center justify-between px-2">
      {years.map((year, i) => {
        const isVisited = visitedYears.includes(year);
        const isCurrent = year === currentYear;
        const isPast = year < currentYear;

        return (
          <div key={year} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.3 : 1,
                  backgroundColor: isCurrent ? '#ef7d2a' : isVisited ? '#d4a857' : '#2e2419',
                  borderColor: isCurrent ? '#f59e3c' : isVisited ? '#d4a857' : '#524031',
                }}
                transition={{ duration: 0.4 }}
                className="h-3 w-3 rounded-full border-2"
                style={{
                  boxShadow: isCurrent ? '0 0 12px rgba(239,125,42,0.6)' : 'none',
                }}
              />
              <span
                className={`font-typewriter text-[10px] sm:text-xs ${
                  isCurrent
                    ? 'font-bold text-ember-400'
                    : isVisited
                    ? 'text-parchment-300'
                    : 'text-parchment-600'
                }`}
              >
                {year}
              </span>
            </div>
            {i < years.length - 1 && (
              <div className="mx-1 h-0.5 flex-1 rounded-full bg-ink-600 sm:mx-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isPast ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-parchment-400 to-ember-500"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
