
"use client";

import { useState, useEffect } from "react";
import { getCurrentPhase, getRamadanDay, getPrayerTimes, AppPhase } from "@/lib/date-utils";
import { PhaseIntro } from "@/components/PhaseIntro";
import { DuaCard } from "@/components/DuaCard";
import { PhaseEid } from "@/components/PhaseEid";
import { PhaseClosing } from "@/components/PhaseClosing";
import { AmbiencePlayer } from "@/components/AmbiencePlayer";
import { TasbihCounter } from "@/components/TasbihCounter";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase | 'SPLASH'>('SPLASH');
  const [currentDay, setCurrentDay] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const now = new Date();
    const detectedPhase = getCurrentPhase(now);
    setCurrentDay(getRamadanDay(now));

    const timer = setTimeout(() => {
      setPhase(detectedPhase);
    }, 800);

    if (detectedPhase === 'RAMADAN') {
      const maghribToastTimer = setTimeout(() => {
        toast({
          title: "تذكير قبل المغرب",
          description: "تبقى 15 دقيقة على أذان المغرب — لا تنسَ دعاء اليوم",
          action: <Bell className="text-accent" />
        });
      }, 5000);
      return () => clearTimeout(maghribToastTimer);
    }

    return () => clearTimeout(timer);
  }, [toast]);

  const handleEnter = () => {
    setPhase('RAMADAN');
  };

  return (
    <main className="min-h-screen font-body bg-[#192375] relative">
      {phase === 'SPLASH' && (
        <div className="min-h-screen flex items-center justify-center bg-[#192375]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-accent animate-pulse">جاري التحميل...</p>
          </div>
        </div>
      )}

      {(phase === 'INTRO' || phase === 'RAMADAN') && phase !== 'SPLASH' && (
        <div className="animate-in fade-in duration-1000">
          {phase === 'INTRO' ? (
             <PhaseIntro onEnter={handleEnter} />
          ) : (
            <div className="min-h-screen py-12 flex flex-col">
              <div className="text-center mb-8 px-4">
                <h1 className="text-4xl md:text-5xl font-headline text-accent mb-4">أدعية رمضان المبارك</h1>
                <p className="text-xl opacity-80">دعاء يوم {currentDay} من الشهر الفضيل</p>
              </div>
              
              <DuaCard currentDay={currentDay} />
              
              <TasbihCounter />
              
              <div className="mt-16 text-center p-8 opacity-60">
                <p>جميع الحقوق محفوظة لمنظومة الحليبي</p>
              </div>
              <AmbiencePlayer />
            </div>
          )}
        </div>
      )}

      {phase === 'EID' && (
        <div className="animate-in slide-in-from-bottom duration-1000">
          <PhaseEid />
          <AmbiencePlayer />
        </div>
      )}

      {phase === 'CLOSING' && (
        <div className="animate-in zoom-in duration-1000">
          <PhaseClosing />
        </div>
      )}
      <Toaster />
    </main>
  );
}
