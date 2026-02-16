
/**
 * Simplified logic for Ramadan 2025.
 * Ramadan 2025 starts approx March 1, 2025.
 * Eid starts approx March 31, 2025.
 * This is a simplified mock for the application logic.
 */

export type AppPhase = 'INTRO' | 'RAMADAN' | 'EID' | 'CLOSING';

export function getCurrentPhase(date: Date): AppPhase {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();

  // For testing purposes, you can manually override this logic.
  // We'll use March 2025 as our Ramadan month.
  
  // If before March 2025
  if (year < 2025 || (year === 2025 && month < 2)) {
    return 'INTRO';
  }

  // Ramadan: March 1 - March 30, 2025
  if (year === 2025 && month === 2 && day <= 30) {
    return 'RAMADAN';
  }

  // Eid Day 1: March 31, 2025
  if (year === 2025 && month === 2 && day === 31) {
    return 'EID';
  }

  // After Eid Day 1 (Day 2 and onwards)
  return 'CLOSING';
}

export function getRamadanDay(date: Date): number {
  if (date.getMonth() === 2 && date.getFullYear() === 2025) {
    return date.getDate();
  }
  return 1;
}

export function getPrayerTimes(lat: number, lon: number) {
  // Mock prayer times calculation based on a common middle-east lat/lon
  return {
    Fajr: "04:50",
    Dhuhr: "12:15",
    Asr: "15:40",
    Maghrib: "18:25",
    Isha: "19:55"
  };
}
