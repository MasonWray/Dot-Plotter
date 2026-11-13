import { useId, useState } from 'react';

interface Props {
  label: string;
  unit?: string;
  value: number;
  min?: number;
  step?: number;
  disabled?: boolean;
  onChange(value: number): void;
}

/**
 * A number input that lets you type freely (e.g. "0." on the way to "0.4") and only reports
 * values that parse and are above the minimum.
 */
export function NumberField({ label, unit, value, min = 0, step, disabled, onChange }: Props) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const parsed = draft === null ? value : Number(draft);
  const invalid = draft !== null && (draft.trim() === '' || !Number.isFinite(parsed) || parsed <= min);

  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {unit && <span className="unit"> ({unit})</span>}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        value={draft ?? String(value)}
        onChange={(e) => {
          const text = e.target.value;
          setDraft(text);
          const n = Number(text);
          if (text.trim() !== '' && Number.isFinite(n) && n > min) onChange(n);
        }}
        onBlur={() => setDraft(null)}
      />
    </div>
  );
}
