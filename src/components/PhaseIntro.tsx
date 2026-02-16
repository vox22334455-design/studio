"use client";

import { Button } from "@/components/ui/button";
import { Moon, Star, Sparkles } from "lucide-react";

interface PhaseIntroProps {
  onEnter: () => void;
}

export function PhaseIntro({ onEnter }: PhaseIntroProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#192375] via-[#121a5a] to-[#0a0f3d] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <Star
            key={i}
            className="star-animation absolute text-accent/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 10 + 5}px`
            }}
          />
        ))}
      </div>

      <div className="z-10 max-w-2xl space-y-10">
        <div className="flex justify-center relative">
          <Moon className="text-accent w-28 h-28 drop-shadow-[0_0_20px_rgba(212,162,78,0.4)]" />
          <Sparkles className="absolute -top-2 -right-2 text-accent/60 w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-headline text-accent font-bold">أدعية رمضان المبارك</h1>
          <p className="text-xl text-white/80">صدقة جارية عنا وعن أهلنا</p>
        </div>
        
        <div className="space-y-6 arabic-text text-xl md:text-2xl leading-relaxed text-white/90 bg-white/5 p-8 rounded-3xl border border-accent/20 backdrop-blur-md shadow-2xl">
          <p className="italic">
            "اللهم أهلّه علينا بالأمن والإيمان، والسلامة والإسلام، والعافية المجللة، ودفاع الأسقام، والعون على الصلاة والصيام والقيام، وتلاوة القرآن، اللهم سلمنا لشهر رمضان، وتسلمه منا حتى ينقضي عنا شهر رمضان، وقد عفوت عنا وغفرت لنا ورحمتنا."
          </p>
        </div>

        <div className="space-y-4 py-6">
          <div className="text-accent font-bold text-lg tracking-widest uppercase">إهداء من:</div>
          <div className="space-y-1">
            <p className="text-2xl font-headline text-white">المستشار الاقتصادي محمد الحليبي</p>
            <p className="text-2xl font-headline text-white">وزوجته الدكتورة سحر عبد الفتاح أبو حسين</p>
          </div>
          
          <div className="bg-accent/10 border-2 border-accent text-accent py-3 px-8 rounded-full inline-block mt-6 font-bold text-xl animate-pulse">
            ✨ هذه الأدعية صدقة جارية عنا وعن أهلنا ✨
          </div>
          
          <p className="text-white/60 mt-4 text-sm md:text-base">
            هذا التطبيق يحتوي على ثلاثين دعاء بعدد أيام شهر رمضان المبارك - دعاء لكل يوم
          </p>
        </div>

        <Button
          onClick={onEnter}
          className="bg-accent text-primary hover:bg-accent/90 text-xl py-8 px-14 rounded-full font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          دخول دعاء اليوم
        </Button>
      </div>
    </div>
  );
}
