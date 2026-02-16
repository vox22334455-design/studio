
"use client";

import { useState, useEffect } from "react";
import { getCurrentPhase, getRamadanDay, getPrayerTimes, AppPhase } from "@/lib/date-utils";
import { PhaseIntro } from "@/components/PhaseIntro";
import { DuaCard } from "@/components/DuaCard";
import { PhaseEid } from "@/components/PhaseEid";
import { PhaseClosing } from "@/components/PhaseClosing";
import { AmbiencePlayer } from "@/components/AmbiencePlayer";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase | 'SPLASH'>('SPLASH');
  const [currentDay, setCurrentDay] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const now = new Date();
    // Default phase logic
    const detectedPhase = getCurrentPhase(now);
    setCurrentDay(getRamadanDay(now));

    // Handle initial splash
    const timer = setTimeout(() => {
      setPhase(detectedPhase);
    }, 100);

    // Mock notification logic
    const prayers = getPrayerTimes(0, 0);
    const maghribTime = prayers.Maghrib;
    
    // In a real app, we'd schedule a web notification or background worker.
    // Here we'll show a toast to simulate the Maghrib reminder.
    if (detectedPhase === 'RAMADAN') {
      const maghribToastTimer = setTimeout(() => {
        toast({
          title: "تذكير قبل المغرب",
          description: "تبقى 15 دقيقة على أذان المغرب — لا تنسَ دعاء اليوم",
          action: <Bell className="text-accent" />
        });
      }, 5000); // Trigger after 5s for demo purposes
      return () => clearTimeout(maghribToastTimer);
    }

    return () => clearTimeout(timer);
  }, [toast]);

  const handleEnter = () => {
    // If user is in INTRO phase, force RAMADAN view for demo/manual entry
    if (phase === 'INTRO') {
      setPhase('RAMADAN');
    }
  };

  return (
    <main className="min-h-screen font-body bg-[#192375] relative">
      {phase === 'SPLASH' && (
        <div className="min-h-screen flex items-center justify-center bg-[#192375]">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {(phase === 'INTRO' || phase === 'RAMADAN') && phase !== 'SPLASH' && (
        <div className="animate-in fade-in duration-1000">
          {/* We show Intro first even if it's Ramadan, per requirements "Upon first opening" */}
          {phase === 'INTRO' ? (
             <PhaseIntro onEnter={handleEnter} />
          ) : (
            <div className="min-h-screen py-12 flex flex-col">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-headline text-accent mb-4">أدعية رمضان المبارك</h1>
                <p className="text-xl opacity-80">دعاء يوم {currentDay} من الشهر الفضيل</p>
              </div>
              
              <DuaCard currentDay={currentDay} />
              
              <div className="mt-auto text-center p-8 opacity-60">
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
    </main>
  );
}
