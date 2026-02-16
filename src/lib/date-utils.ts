
/**
 * نظام إدارة الوقت والتاريخ لتطبيق رمضان 2026
 * يحدد مراحل التطبيق تلقائياً بناءً على التاريخ الحالي لعام 2026.
 */

export type AppPhase = 'INTRO' | 'RAMADAN' | 'EID' | 'CLOSING';

// بداية رمضان المتوقعة لعام 2026 هي 18 فبراير تقريباً
const RAMADAN_START_2026 = new Date(2026, 1, 18); // 18 فبراير (الشهر 1 في JS)
const EID_START_2026 = new Date(2026, 2, 20);    // 20 مارس (بداية العيد)
const CLOSING_START_2026 = new Date(2026, 2, 22); // بعد ثاني أيام العيد

export function getCurrentPhase(date: Date): AppPhase {
  if (date < RAMADAN_START_2026) {
    return 'INTRO';
  }

  if (date >= RAMADAN_START_2026 && date < EID_START_2026) {
    return 'RAMADAN';
  }

  if (date >= EID_START_2026 && date < CLOSING_START_2026) {
    return 'EID';
  }

  return 'CLOSING';
}

export function getRamadanDay(date: Date): number {
  const diffTime = date.getTime() - RAMADAN_START_2026.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // حصر اليوم بين 1 و 30
  return Math.max(1, Math.min(30, diffDays));
}

export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export function calculatePrayerTimes(lat?: number, lon?: number): PrayerTimes {
  // محاكاة لمواقيت الصلاة في مكة المكرمة لعام 2026
  return {
    Fajr: "05:12",
    Dhuhr: "12:24",
    Asr: "15:48",
    Maghrib: "18:38",
    Isha: "20:08"
  };
}
