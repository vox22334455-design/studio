"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Bell, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculatePrayerTimes, PrayerTimes } from "@/lib/date-utils";
import { useToast } from "@/hooks/use-toast";

export function AmbiencePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdhanEnabled, setIsAdhanEnabled] = useState(true);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [locationName, setLocationName] = useState("جاري تحديد الموقع...");
  const [isLocating, setIsLocating] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const adhanRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const times = calculatePrayerTimes(latitude, longitude);
          setPrayerTimes(times);
          setLocationName("موقعك الحالي (تلقائي)");
          setIsLocating(false);
          toast({ title: "تم تحديد الموقع", description: "تم تحديث مواقيت الصلوات الخمس حسب موقعك بنجاح." });
        },
        () => {
          const times = calculatePrayerTimes();
          setPrayerTimes(times);
          setLocationName("مكة المكرمة (افتراضي)");
          setIsLocating(false);
          toast({ variant: "destructive", title: "تعذر تحديد الموقع", description: "تم اعتماد توقيت الحرم المكي الشريف كخيار افتراضي." });
        }
      );
    } else {
      setPrayerTimes(calculatePrayerTimes());
      setLocationName("مكة المكرمة (افتراضي)");
      setIsLocating(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!prayerTimes) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const prayers = [
        { name: "الفجر", time: prayerTimes.Fajr },
        { name: "الظهر", time: prayerTimes.Dhuhr },
        { name: "العصر", time: prayerTimes.Asr },
        { name: "المغرب", time: prayerTimes.Maghrib },
        { name: "العشاء", time: prayerTimes.Isha },
      ];

      prayers.forEach(prayer => {
        if (isAdhanEnabled && currentTime === prayer.time) {
          if (adhanRef.current && adhanRef.current.paused) {
             adhanRef.current.play().catch(() => {});
             toast({ title: `حان الآن وقت صلاة ${prayer.name}`, description: "أذان الحرم المكي الشريف - تقبل الله منكم.", duration: 20000 });
          }
        }
      });

      // تنبيه المغرب بـ 15 دقيقة
      const [maghribH, maghribM] = prayerTimes.Maghrib.split(':').map(Number);
      const maghribTotalMinutes = maghribH * 60 + maghribM;
      const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
      
      if (maghribTotalMinutes - currentTotalMinutes === 15) {
        toast({ title: "تذكير صائم 🌙", description: "تبقى 15 دقيقة على أذان المغرب — لا تنسَ دعاء اليوم.", duration: 10000 });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAdhanEnabled, toast, prayerTimes]);

  const toggleAmbience = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50 rtl:left-auto rtl:right-6">
      <audio ref={audioRef} loop src="https://www.islamcan.com/audio/anasheed/ramadan.mp3" />
      <audio ref={adhanRef} src="https://www.islamcan.com/audio/adhan/makkah.mp3" />
      
      <div className="bg-primary/90 backdrop-blur-xl p-4 rounded-2xl border border-accent/30 text-accent text-xs mb-2 shadow-2xl animate-in slide-in-from-bottom-4">
        <div className="flex items-center gap-2 mb-2 font-bold">
          {isLocating ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />}
          <span>{locationName}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-white/90">
          <div className="flex items-center gap-1"><span>الفجر:</span> <span>{prayerTimes?.Fajr || "--:--"}</span></div>
          <div className="flex items-center gap-1"><span>الظهر:</span> <span>{prayerTimes?.Dhuhr || "--:--"}</span></div>
          <div className="flex items-center gap-1"><span>العصر:</span> <span>{prayerTimes?.Asr || "--:--"}</span></div>
          <div className="flex items-center gap-1 text-accent font-bold"><span>المغرب:</span> <span>{prayerTimes?.Maghrib || "--:--"}</span></div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={toggleAmbience} variant="secondary" size="icon" className="rounded-full shadow-2xl bg-accent text-primary w-14 h-14"><Music className={isPlaying ? "animate-pulse" : ""} size={24} /></Button>
        <Button onClick={() => setIsAdhanEnabled(!isAdhanEnabled)} variant="secondary" size="icon" className="rounded-full shadow-2xl bg-accent text-primary w-14 h-14">{isAdhanEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}</Button>
      </div>
    </div>
  );
}
