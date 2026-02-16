
"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculatePrayerTimes } from "@/lib/date-utils";
import { useToast } from "@/hooks/use-toast";

export function AmbiencePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdhanEnabled, setIsAdhanEnabled] = useState(true);
  const [nextMaghrib, setNextMaghrib] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const adhanRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const times = calculatePrayerTimes();
    setNextMaghrib(times.Maghrib);

    const interval = setInterval(() => {
      const now = new Date();
      const currentH = now.getHours().toString().padStart(2, '0');
      const currentM = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentH}:${currentM}`;
      
      const [maghribH, maghribM] = times.Maghrib.split(':').map(Number);
      const maghribTotalMinutes = maghribH * 60 + maghribM;
      const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
      
      if (maghribTotalMinutes - currentTotalMinutes === 15) {
        toast({
          title: "تذكير صائم 🌙",
          description: "تبقى 15 دقيقة على أذان المغرب — لا تنسَ دعاء اليوم.",
          duration: 10000,
        });
      }

      if (isAdhanEnabled && currentTime === times.Maghrib) {
        if (adhanRef.current) {
           adhanRef.current.play().catch(e => console.log("Adhan play blocked:", e));
           toast({ 
             title: "حان الآن أذان المغرب", 
             description: "أذان الحرم المكي الشريف - تقبل الله صيامكم." 
           });
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAdhanEnabled, toast]);

  const toggleAmbience = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50 rtl:left-auto rtl:right-6">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />
      <audio
        ref={adhanRef}
        src="https://www.islamcan.com/audio/adhan/makkah.mp3" 
      />
      
      <div className="bg-primary/90 backdrop-blur-xl p-4 rounded-2xl border border-accent/30 text-accent text-xs mb-2 shadow-2xl animate-in slide-in-from-bottom-4">
        <div className="flex items-center gap-2 mb-2 font-bold">
          <MapPin size={14} />
          <span>مكة المكرمة (افتراضي)</span>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <Bell size={14} className="text-accent" />
          <span>المغرب المتوقع: <span className="font-bold text-accent">{nextMaghrib}</span></span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={toggleAmbience}
          variant="secondary"
          size="icon"
          className="rounded-full shadow-2xl bg-accent text-primary hover:bg-accent/90 w-14 h-14"
          title="أجواء روحانية"
        >
          <Music className={isPlaying ? "animate-pulse" : ""} size={24} />
        </Button>

        <Button
          onClick={() => setIsAdhanEnabled(!isAdhanEnabled)}
          variant="secondary"
          size="icon"
          className="rounded-full shadow-2xl bg-accent text-primary hover:bg-accent/90 w-14 h-14"
          title={isAdhanEnabled ? "إيقاف الأذان" : "تشغيل الأذان"}
        >
          {isAdhanEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </Button>
      </div>
    </div>
  );
}
