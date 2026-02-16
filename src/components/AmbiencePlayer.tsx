
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

    // تفقد وقت أذان المغرب كل دقيقة لإرسال التنبيه
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // حساب 15 دقيقة قبل المغرب (تبسيط للمحاكاة)
      if (currentTime === "18:09") { // مثال إذا كان المغرب 18:24
        toast({
          title: "تذكير صائم",
          description: "تبقى 15 دقيقة على أذان المغرب — لا تنسَ دعاء اليوم.",
          duration: 10000,
        });
      }

      // وقت الأذان الفعلي
      if (isAdhanEnabled && currentTime === times.Maghrib) {
        if (adhanRef.current) {
           adhanRef.current.play();
           toast({ title: "حان الآن أذان المغرب", description: "أذان الحرم المكي الشريف" });
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
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />
      <audio
        ref={adhanRef}
        src="https://www.islamcan.com/audio/adhan/makkah.mp3" 
      />
      
      <div className="bg-primary/80 backdrop-blur-md p-3 rounded-2xl border border-accent/20 text-accent text-xs mb-2 shadow-2xl animate-in slide-in-from-right">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={12} />
          <span>مكة المكرمة (افتراضي)</span>
        </div>
        <div className="flex items-center gap-2">
          <Bell size={12} />
          <span>المغرب: {nextMaghrib}</span>
        </div>
      </div>

      <Button
        onClick={toggleAmbience}
        variant="secondary"
        size="icon"
        className="rounded-full shadow-2xl bg-accent text-primary hover:bg-accent/90 w-12 h-12"
        title="أجواء روحانية"
      >
        <Music className={isPlaying ? "animate-pulse" : ""} />
      </Button>

      <Button
        onClick={() => setIsAdhanEnabled(!isAdhanEnabled)}
        variant="secondary"
        size="icon"
        className="rounded-full shadow-2xl bg-accent text-primary hover:bg-accent/90 w-12 h-12"
        title={isAdhanEnabled ? "إيقاف الأذان" : "تشغيل الأذان"}
      >
        {isAdhanEnabled ? <Volume2 /> : <VolumeX />}
      </Button>
    </div>
  );
}
