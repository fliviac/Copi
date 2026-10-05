import { MOODS } from '../moods'

type MoodPickerProps = {
  value: string
  onChange: (label: string) => void
}

/** Radio-style mood selector showing emoji + label options. */
export const MoodPicker = ({ value, onChange }: MoodPickerProps) => {
  return (
    <div role="radiogroup" aria-label="Mood" className="flex flex-wrap gap-2">
      {MOODS.map((mood) => {
        const selected = value === mood.label
        return (
          <button
            key={mood.label}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(mood.label)}
            className={[
              'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
              selected
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
            ].join(' ')}
          >
            <span aria-hidden="true" className="text-lg">
              {mood.emoji}
            </span>
            <span>{mood.label}</span>
          </button>
        )
      })}
    </div>
  )
}
