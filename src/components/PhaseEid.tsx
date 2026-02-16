
"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, Star, Music, MapPin } from "lucide-react";
import { useState } from "react";

export function PhaseEid() {
  const [isPlayingTakbirat, setIsPlayingTakbirat] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#192375] via-[#4A148C] to-[#192375] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-accent/30 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '4px',
              height: '4px',
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="z-10 space-y-12 max-w-3xl">
        <div className="relative">
          <Sparkles className="w-24 h-24 mx-auto text-accent animate-bounce" />
          <h1 className="text-7xl font-headline text-accent mt-4">عيدكم مبارك</h1>
        </div>

        <p className="text-4xl font-arabic arabic-text leading-relaxed">
          تقبل الله منا ومنكم صالح الأعمال
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white/10 p-8 rounded-3xl border border-accent/30 backdrop-blur-md">
            <Music className="mx-auto mb-4 text-accent w-12 h-12" />
            <h3 className="text-2xl font-bold mb-4">تكبيرات العيد</h3>
            <Button
              onClick={() => setIsPlayingTakbirat(!isPlayingTakbirat)}
              className="bg-accent text-primary hover:bg-accent/90 w-full text-lg py-6"
            >
              {isPlayingTakbirat ? "إيقاف التكبيرات" : "تشغيل التكبيرات"}
            </Button>
            {isPlayingTakbirat && (
              <p className="mt-4 animate-pulse italic">الله أكبر الله أكبر الله أكبر لا إله إلا الله...</p>
            )}
          </div>

          <div className="bg-white/10 p-8 rounded-3xl border border-accent/30 backdrop-blur-md">
            <MapPin className="mx-auto mb-4 text-accent w-12 h-12" />
            <h3 className="text-2xl font-bold mb-4">صلاة العيد</h3>
            <p className="text-xl mb-2">وقت الصلاة المتوقع:</p>
            <p className="text-3xl font-bold text-accent">06:15 ص</p>
            <p className="text-sm opacity-70 mt-2">حسب موقعك الحالي</p>
          </div>
        </div>

        <div className="pt-12 text-accent/60 italic">
          كل عام وأنتم بخير من أسرة الحليبي
        </div>
      </div>
    </div>
  );
}
