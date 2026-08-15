interface FilmGrainProps {
  intensity?: number;
}

export function FilmGrain({ intensity = 0.06 }: FilmGrainProps) {
  return (
    <div
      className="film-grain-overlay pointer-events-none fixed inset-0 z-40"
      style={{
        opacity: intensity,
        mixBlendMode: 'overlay',
      }}
      aria-hidden="true"
    />
  );
}
