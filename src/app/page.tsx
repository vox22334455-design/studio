"use client";

import { useState, useEffect } from "react";
import { getCurrentPhase, getRamadanDay, AppPhase } from "@/lib/date-utils";
import { PhaseIntro } from "@/components/PhaseIntro";
import { DuaCard } from "@/components/DuaCard";
import { PhaseEid } from "@/components/PhaseEid";
import { PhaseClosing } from "@/components/PhaseClosing";
import { AmbiencePlayer } from "@/components/AmbiencePlayer";
import { TasbihCounter } from "@/components/TasbihCounter";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase | 'SPLASH'>('SPLASH');
  const [currentDay, setCurrentDay] = useState(1);
  const { toast } = useToast();

  const updateAppData = () => {
    const now = new Date();
    const detectedPhase = getCurrentPhase(now);
    const day = getRamadanDay(now);
    
    setCurrentDay(day);
    
    // Auto-transition to RAMADAN if it's currently Ramadan
    if (phase === 'SPLASH' || (phase === 'INTRO' && detectedPhase === 'RAMADAN')) {
       setPhase(detectedPhase);
    }
  };

  useEffect(() => {
    // Initial update
    updateAppData();
    
    const splashTimer = setTimeout(() => {
      if (phase === 'SPLASH') {
        const now = new Date();
        setPhase(getCurrentPhase(now));
      }
    }, 1500);

    // Auto-refresh every 10 minutes to keep the day updated automatically
    const interval = setInterval(updateAppData, 600000);

    return () => {
      clearTimeout(splashTimer);
      clearInterval(interval);
    };
  }, [phase]);

  const handleEnter = () => {
    setPhase('RAMADAN');
  };

  const ramadanProgress = (currentDay / 30) * 100;

  return (
    <main className="min-h-screen font-body bg-[#192375] relative selection:bg-accent selection:text-primary">
      {phase === 'SPLASH' && (
        <div className="min-h-screen flex items-center justify-center bg-[#192375]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-accent animate-pulse text-lg">اللهم بلغنا رمضان...</p>
          </div>
        </div>
      )}

      {(phase === 'INTRO' || phase === 'RAMADAN') && phase !== 'SPLASH' && (
        <div className="animate-in fade-in duration-1000">
          {phase === 'INTRO' ? (
             <PhaseIntro onEnter={handleEnter} />
          ) : (
            <div className="min-h-screen py-12 flex flex-col">
              <div className="text-center mb-8 px-4 max-w-2xl mx-auto w-full">
                <h1 className="text-4xl md:text-5xl font-headline text-accent mb-4">أدعية رمضان المبارك</h1>
                <div className="space-y-2">
                   <p className="text-xl opacity-90">اليوم {currentDay} من الشهر الفضيل</p>
                   <div className="px-8 mt-4">
                      <Progress value={ramadanProgress} className="h-2 bg-white/10" />
                      <p className="text-xs text-accent/60 mt-2">انقضى {Math.floor(ramadanProgress)}% من رمضان</p>
                   </div>
                </div>
              </div>
              
              <DuaCard currentDay={currentDay} />
              
              <TasbihCounter />
              
              <div className="mt-16 text-center p-8 opacity-60">
                <p>جميع الحقوق محفوظة لمنظومة الحليبي</p>
                <p className="text-xs mt-2">نسخة رمضان 1446هـ - 2025م</p>
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