
"use client";

import { useState, useEffect } from "react";
import { getCurrentPhase, getRamadanDay, AppPhase } from "@/lib/date-utils";
import { PhaseIntro } from "@/components/PhaseIntro";
import { DuaCard } from "@/components/DuaCard";
import { PhaseEid } from "@/components/PhaseEid";
import { PhaseClosing } from "@/components/PhaseClosing";
import { AmbiencePlayer } from "@/components/AmbiencePlayer";
import { TasbihCounter } from "@/components/TasbihCounter";
import { ShareQRCode } from "@/components/ShareQRCode";
import { Toaster } from "@/components/ui/toaster";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase | 'SPLASH'>('SPLASH');
  const [currentDay, setCurrentDay] = useState(1);

  const updateAppData = () => {
    const now = new Date();
    const detectedPhase = getCurrentPhase(now);
    const day = getRamadanDay(now);
    
    setCurrentDay(day);
    setPhase(detectedPhase);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateAppData();
    }, 1500);

    const interval = setInterval(updateAppData, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleEnter = () => {
    setPhase('RAMADAN');
  };

  const ramadanProgress = (currentDay / 30) * 100;

  return (
    <main className="min-h-screen font-body bg-[#192375] relative selection:bg-accent selection:text-primary overflow-x-hidden">
      {phase === 'SPLASH' && (
        <div className="min-h-screen flex items-center justify-center bg-[#192375] z-50 fixed inset-0">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-accent animate-pulse text-2xl font-headline">اللهم بلغنا رمضان 2026...</h2>
          </div>
        </div>
      )}

      {phase === 'INTRO' && (
        <div className="animate-in fade-in duration-1000">
          <PhaseIntro onEnter={handleEnter} />
          <ShareQRCode />
        </div>
      )}

      {phase === 'RAMADAN' && (
        <div className="min-h-screen py-12 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-10 px-4 max-w-2xl mx-auto w-full">
            <h1 className="text-4xl md:text-6xl font-headline text-accent mb-6 font-bold drop-shadow-lg">أدعية رمضان المبارك</h1>
            <div className="space-y-4">
               <p className="text-2xl text-white/90">اليوم <span className="text-accent font-bold">{currentDay}</span> من الشهر الفضيل</p>
               <div className="px-10 mt-6">
                  <Progress value={ramadanProgress} className="h-3 bg-white/10 border border-white/5" />
                  <p className="text-sm text-accent/70 mt-3 font-medium">انقضى {Math.floor(ramadanProgress)}% من رمضان 2026</p>
               </div>
            </div>
          </div>
          
          <DuaCard currentDay={currentDay} />
          
          <TasbihCounter />
          
          <div className="mt-20 text-center p-8 opacity-40 border-t border-white/5 max-w-md mx-auto">
            <p className="text-lg">جميع الحقوق محفوظة لمنظومة الحليبي</p>
            <p className="text-xs mt-2 tracking-widest uppercase">Version 1.46.2026 - OS Firas</p>
          </div>
          <AmbiencePlayer />
          <ShareQRCode />
        </div>
      )}

      {phase === 'EID' && (
        <div className="animate-in zoom-in duration-1000">
          <PhaseEid />
          <AmbiencePlayer />
          <ShareQRCode />
        </div>
      )}

      {phase === 'CLOSING' && (
        <div className="animate-in fade-in duration-1000">
          <PhaseClosing />
        </div>
      )}
      <Toaster />
    </main>
  );
}
