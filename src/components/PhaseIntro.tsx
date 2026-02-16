
"use client";

import { Button } from "@/components/ui/button";
import { Moon, Star, Sparkles } from "lucide-react";

interface PhaseIntroProps {
  onEnter: () => void;
}

export function PhaseIntro({ onEnter }: PhaseIntroProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#192375] via-[#121a5a] to-[#0a0f3d] relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="star-animation absolute text-accent/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 15 + 5}px`
            }}
          />
        ))}
      </div>

      <div className="z-10 max-w-2xl space-y-8">
        <div className="flex justify-center mb-8 relative">
          <Moon className="text-accent w-32 h-32 drop-shadow-[0_0_25px_rgba(212,162,78,0.5)]" />
          <Sparkles className="absolute -top-4 -right-4 text-accent/60 w-12 h-12 animate-pulse" />
        </div>

        <h1 className="text-5xl font-headline text-accent mb-4">أدعية رمضان المبارك</h1>
        
        <div className="space-y-6 arabic-text text-xl md:text-2xl leading-relaxed text-white/90 bg-white/5 p-8 rounded-2xl border border-accent/20 backdrop-blur-sm">
          <p>
            اللهم أهلّه علينا بالأمن والإيمان، والسلامة والإسلام، والعافية المجللة، ودفاع الأسقام، والعون على الصلاة والصيام والقيام، وتلاوة القرآن، اللهم سلمنا لشهر رمضان، وتسلمه منا حتى ينقضي عنا شهر رمضان، وقد عفوت عنا وغفرت لنا ورحمتنا.
          </p>
        </div>

        <div className="space-y-4 pt-8 border-t border-accent/20">
          <div className="text-accent font-bold text-xl">إهداء من:</div>
          <p className="text-2xl">المستشار الاقتصادي محمد الحليبي</p>
          <p className="text-2xl">وزوجته الدكتورة سحر عبد الفتاح أبو حسين</p>
          
          <div className="text-accent py-2 px-6 border-2 border-accent rounded-full inline-block mt-4 font-bold text-lg animate-pulse">
            ✨ هذه الأدعية صدقة جارية عنا وعن أهلنا ✨
          </div>
          
          <p className="text-white/70 mt-4">
            هذا التطبيق يحتوي على ثلاثين دعاء بعدد أيام شهر رمضان المبارك - دعاء لكل يوم
          </p>
        </div>

        <Button
          onClick={onEnter}
          className="mt-12 bg-accent text-primary hover:bg-accent/90 text-xl py-8 px-12 rounded-full font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          دخول دعاء اليوم
        </Button>
      </div>
    </div>
  );
}
