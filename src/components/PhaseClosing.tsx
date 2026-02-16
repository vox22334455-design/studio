
"use client";

import { useEffect, useState } from "react";
import { Mail, Globe, BrainCircuit } from "lucide-react";
import { elHeliebiVersePromotionGeneration } from "@/ai/flows/el-heliebi-verse-promotion-generation";

export function PhaseClosing() {
  const [promoText, setPromoText] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const text = await elHeliebiVersePromotionGeneration();
        setPromoText(text);
      } catch (e) {
        // Fallback text if AI flow fails
        setPromoText(`قريباً بإذن الله... إطلاق تطبيق EL-Heliebi Live.`);
      }
    };
    fetchPromo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white selection:bg-accent selection:text-primary">
      <div className="max-w-4xl space-y-12">
        <div className="animate-pulse flex flex-col items-center">
          <BrainCircuit className="w-20 h-20 text-accent mb-4" />
          <h2 className="text-3xl font-headline tracking-widest text-accent uppercase">Coming Soon</h2>
        </div>

        <div className="bg-white/5 p-10 rounded-3xl border border-accent/20 space-y-8 backdrop-blur-xl">
          <h1 className="text-5xl font-bold font-headline text-accent">EL-Heliebi Verse</h1>
          
          <div className="arabic-text text-2xl md:text-3xl leading-relaxed text-white/90 min-h-[200px]">
            {promoText ? (
              <div dangerouslySetInnerHTML={{ __html: promoText.replace(/\n/g, '<br/>') }} />
            ) : (
              <p>جاري تحميل الرؤية المستقبلية...</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xl">للمهتمين بالمشاركة في المشروع العالمي:</p>
          <a
            href="mailto:elheliebi@outlook.sa"
            className="inline-flex items-center gap-3 bg-accent text-primary font-bold px-8 py-4 rounded-full text-xl transition-transform hover:scale-105"
          >
            <Mail size={24} />
            elheliebi@outlook.sa
          </a>
        </div>

        <div className="pt-16 border-t border-white/10 w-full opacity-60 flex flex-col items-center gap-2">
          <p className="text-sm">جميع الحقوق محفوظة لمنظومة الحليبي فرس OS</p>
          <div className="flex gap-4">
            <Globe size={18} />
            <span>Industrial Vision Global Presence</span>
          </div>
        </div>
      </div>
    </div>
  );
}
