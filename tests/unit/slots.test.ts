import { describe, it, expect } from 'vitest';
import { getTimeSlots, addMinutes, isTimeInRange } from '@/lib/time';

describe('Time utilities', () => {
  it('should generate time slots correctly', () => {
    const start = new Date('2024-01-15T09:00:00Z');
    const end = new Date('2024-01-15T17:00:00Z');
    const slots = getTimeSlots(start, end, 30, 'UTC');
    
    expect(slots).toHaveLength(16); // 8 hours * 2 slots per hour
    expect(slots[0]).toEqual(start);
    expect(slots[slots.length - 1]).toEqual(new Date('2024-01-15T16:30:00Z'));
  });

  it('should add minutes correctly', () => {
    const date = new Date('2024-01-15T09:00:00Z');
    const result = addMinutes(date, 30, 'UTC');
    expect(result).toEqual(new Date('2024-01-15T09:30:00Z'));
  });

  it('should check time in range correctly', () => {
    const start = new Date('2024-01-15T09:00:00Z');
    const end = new Date('2024-01-15T10:00:00Z');
    const time = new Date('2024-01-15T09:30:00Z');
    
    expect(isTimeInRange(time, start, end)).toBe(true);
    expect(isTimeInRange(new Date('2024-01-15T08:30:00Z'), start, end)).toBe(false);
    expect(isTimeInRange(new Date('2024-01-15T10:30:00Z'), start, end)).toBe(false);
  });
});
