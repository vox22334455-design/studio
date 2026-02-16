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

/**
 * حساب مواقيت الصلاة بشكل تقريبي بناءً على الموقع.
 * في التطبيق الحقيقي يفضل استخدام مكتبة مثل 'adhan' أو API خارجي.
 * هنا نقوم بتعديل التوقيت بناءً على خط الطول (كل 15 درجة تساوي ساعة).
 */
export function calculatePrayerTimes(lat?: number, lon?: number): PrayerTimes {
  // التوقيت الافتراضي لمكة المكرمة
  let baseMaghribMinutes = 18 * 60 + 38; // 18:38
  
  if (lon !== undefined) {
    // تعديل تقريبي: خط طول مكة هو 39.8. الفرق في خط الطول يؤثر على الوقت.
    // كل درجة واحدة فرق تساوي 4 دقائق تقريباً.
    const lonDiff = lon - 39.82;
    baseMaghribMinutes += Math.round(lonDiff * 4);
  }

  const formatTime = (totalMinutes: number) => {
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = Math.abs(totalMinutes % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return {
    Fajr: formatTime(baseMaghribMinutes - 13 * 60 - 26), // تقريباً قبل المغرب بـ 13 ساعة
    Dhuhr: "12:24",
    Asr: "15:48",
    Maghrib: formatTime(baseMaghribMinutes),
    Isha: formatTime(baseMaghribMinutes + 90) // العشاء بعد المغرب بـ 90 دقيقة
  };
}
