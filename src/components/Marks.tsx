/** The app's mark: a 2x2 cluster of cyan, magenta, yellow and key dots. */
export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

/** Per-ink offsets, so the mark looks slightly out of register. */
const REGISTRATION_INKS = [
  { color: 'var(--ink-c)', dx: -0.7, dy: 0 },
  { color: 'var(--ink-m)', dx: 0.7, dy: 0.4 },
  { color: 'var(--ink-y)', dx: 0, dy: -0.7 },
];

/** A printer's registration target. */
function RegistrationMark({ side }: { side: 'top' | 'bottom' | 'left' | 'right' }) {
  return (
    <svg className={`reg ${side}`} viewBox="0 0 16 16" aria-hidden="true">
      {REGISTRATION_INKS.map(({ color, dx, dy }) => (
        <g key={color} transform={`translate(${dx} ${dy})`} stroke={color} strokeWidth="1" fill="none">
          <circle cx="8" cy="8" r="4.5" />
          <path d="M8 0v16M0 8h16" />
        </g>
      ))}
    </svg>
  );
}

/** Crop marks at the corners and registration marks on each side of the sheet. */
export function SheetMarks() {
  return (
    <>
      <span className="crop tl" aria-hidden="true" />
      <span className="crop tr" aria-hidden="true" />
      <span className="crop bl" aria-hidden="true" />
      <span className="crop br" aria-hidden="true" />
      <RegistrationMark side="top" />
      <RegistrationMark side="bottom" />
      <RegistrationMark side="left" />
      <RegistrationMark side="right" />
    </>
  );
}
