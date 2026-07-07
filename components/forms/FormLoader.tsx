const slices = [
  { clip: '0% 0%, 14.28% 0%, 14.28% 100%, 0% 100%', size: '0.35em', left: '-2.8em', opacity: 0.55 },
  { clip: '14.28% 0%, 28.57% 0%, 28.57% 100%, 14.28% 100%', size: '0.45em', left: '-1.4em', opacity: 0.65 },
  { clip: '28.57% 0%, 42.85% 0%, 42.85% 100%, 28.57% 100%', size: '0.55em', left: '-0.6em', opacity: 0.75 },
  { clip: '42.85% 0%, 57.14% 0%, 57.14% 100%, 42.85% 100%', size: '0.65em', left: '-0.1em', opacity: 0.9 },
  { clip: '57.14% 0%, 71.42% 0%, 71.42% 100%, 57.14% 100%', size: '0.7em', left: '0em', opacity: 1 },
  { clip: '71.42% 0%, 85.71% 0%, 85.71% 100%, 71.42% 100%', size: '0.65em', left: '0.1em', opacity: 0.9 },
  { clip: '85.71% 0%, 100% 0%, 100% 100%, 85.71% 100%', size: '0.45em', left: '1.4em', opacity: 0.65 },
]

const gradientStyles = (idx: number) => {
  const isLeft = idx <= 3
  const start = isLeft ? 8 + idx * 5 : 30 + (idx - 4) * 5
  const end = start + 4
  return {
    background: `linear-gradient(to right, #ffffff ${start}%, rgba(255,255,255,0.3) ${end}%)`,
    backgroundSize: '200% auto',
    backgroundClip: 'text' as const,
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent',
  }
}

export function FormLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6" role="status" aria-live="polite" aria-label="Sending your enquiry">
      <div className="loader-text relative flex items-center justify-center h-8 overflow-hidden select-none w-full">
        {slices.map((s, i) => (
          <span
            key={i}
            className="loader-char"
            style={{
              clipPath: `polygon(${s.clip})`,
              fontSize: s.size,
              marginLeft: s.left,
              opacity: s.opacity,
            }}
          >
            <span style={gradientStyles(i)}>Sending</span>
          </span>
        ))}
      </div>
      <div className="relative flex items-center justify-center overflow-hidden h-[3px] w-32 rounded-full">
        <div className="absolute inset-0 rounded-full bg-white/20" />
        <div className="loader-line absolute inset-0 rounded-full bg-white" />
      </div>
      <p className="text-sm text-white/40">Please wait while we process your enquiry</p>
    </div>
  )
}
