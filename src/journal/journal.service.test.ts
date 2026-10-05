import { beforeEach, describe, expect, it } from 'vitest'
import {
  createOrUpdateEntry,
  deleteEntry,
  getEntryByDate,
  listEntries,
} from './journal.service'

const STORAGE_KEY = 'daily-journal:entries'

describe('journal.service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lists an empty array when no entries exist', async () => {
    await expect(listEntries()).resolves.toEqual([])
  })

  it('creates an entry and lists it back', async () => {
    await createOrUpdateEntry({
      date: '2026-01-05',
      mood: 'Good',
      text: 'A calm day.',
    })

    const entries = await listEntries()
    expect(entries).toHaveLength(1)
    expect(entries[0]).toEqual({
      date: '2026-01-05',
      mood: 'Good',
      text: 'A calm day.',
    })
  })

  it('enforces one entry per calendar day (upsert)', async () => {
    await createOrUpdateEntry({
      date: '2026-01-05',
      mood: 'Good',
      text: 'First version.',
    })
    await createOrUpdateEntry({
      date: '2026-01-05',
      mood: 'Great',
      text: 'Updated version.',
    })

    const entries = await listEntries()
    expect(entries).toHaveLength(1)
    expect(entries[0].text).toBe('Updated version.')
  })

  it('keeps distinct dates as separate entries', async () => {
    await createOrUpdateEntry({
      date: '2026-01-05',
      mood: 'Good',
      text: 'Day one.',
    })
    await createOrUpdateEntry({
      date: '2026-01-06',
      mood: 'Low',
      text: 'Day two.',
    })

    await expect(listEntries()).resolves.toHaveLength(2)
  })

  it('lists entries newest date first', async () => {
    await createOrUpdateEntry({
      date: '2026-01-05',
      mood: 'Good',
      text: 'Older.',
    })
    await createOrUpdateEntry({
      date: '2026-01-09',
      mood: 'Great',
      text: 'Newer.',
    })

    const entries = await listEntries()
    expect(entries.map((entry) => entry.date)).toEqual([
      '2026-01-09',
      '2026-01-05',
    ])
  })

  it('returns an entry by date', async () => {
    await createOrUpdateEntry({
      date: '2026-01-05',
      mood: 'Good',
      text: 'Hello.',
    })

    await expect(getEntryByDate('2026-01-05')).resolves.toMatchObject({
      date: '2026-01-05',
      text: 'Hello.',
    })
    await expect(getEntryByDate('2026-01-06')).resolves.toBeUndefined()
  })

  it('deletes an entry by date', async () => {
    await createOrUpdateEntry({
      date: '2026-01-05',
      mood: 'Good',
      text: 'Hello.',
    })

    await expect(deleteEntry('2026-01-05')).resolves.toBe(true)
    await expect(listEntries()).resolves.toEqual([])
  })

  it('returns false when deleting a missing date', async () => {
    await expect(deleteEntry('2026-01-05')).resolves.toBe(false)
  })

  it('ignores corrupt stored data instead of throwing', async () => {
    localStorage.setItem(STORAGE_KEY, '{not json')
    await expect(listEntries()).resolves.toEqual([])
  })
})
