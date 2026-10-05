import { describe, expect, it } from 'vitest'
import { parseDateKey, toDateKey, todayKey } from './date'

describe('date utils', () => {
  it('formats a date as a zero-padded YYYY-MM-DD key', () => {
    expect(toDateKey(new Date(2026, 0, 5))).toBe('2026-01-05')
    expect(toDateKey(new Date(2026, 11, 31))).toBe('2026-12-31')
  })

  it('round-trips a date key through parseDateKey', () => {
    const parsed = parseDateKey('2026-03-09')
    expect(parsed.getFullYear()).toBe(2026)
    expect(parsed.getMonth()).toBe(2)
    expect(parsed.getDate()).toBe(9)
  })

  it('returns today as a YYYY-MM-DD key', () => {
    const key = todayKey()
    expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(toDateKey(new Date())).toBe(key)
  })
})
