
/**
 * نظام إدارة الوقت والتاريخ لتطبيق رمضان 2025
 * يحدد مراحل التطبيق تلقائياً بناءً على التاريخ الحالي.
 */

export type AppPhase = 'INTRO' | 'RAMADAN' | 'EID' | 'CLOSING';

export function getCurrentPhase(date: Date): AppPhase {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed (2 is March)
  const day = date.getDate();

  // تحديد المراحل لعام 2025 (افتراض أن رمضان يبدأ 1 مارس)
  // قبل مارس 2025: شاشة المقدمة
  if (year < 2025 || (year === 2025 && month < 2)) {
    return 'INTRO';
  }

  // شهر رمضان: من 1 مارس إلى 30 مارس 2025
  if (year === 2025 && month === 2 && day <= 30) {
    return 'RAMADAN';
  }

  // يوم العيد الأول: 31 مارس 2025
  if (year === 2025 && month === 2 && day === 31) {
    return 'EID';
  }

  // من اليوم الثاني للعيد فصاعداً: مرحلة الإغلاق والرؤية المستقبلية
  return 'CLOSING';
}

export function getRamadanDay(date: Date): number {
  if (date.getFullYear() === 2025 && date.getMonth() === 2) {
    const day = date.getDate();
    return day > 30 ? 30 : (day < 1 ? 1 : day);
  }
  // افتراضي لليوم الأول إذا لم نكن في مارس 2025 (لأغراض العرض)
  return 1;
}

export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export function calculatePrayerTimes(lat?: number, lon?: number): PrayerTimes {
  // محاكاة لمواقيت الصلاة - في النسخة النهائية يمكن ربطها بـ API مثل Aladhan
  return {
    Fajr: "04:52",
    Dhuhr: "12:14",
    Asr: "15:42",
    Maghrib: "18:24",
    Isha: "19:54"
  };
}
