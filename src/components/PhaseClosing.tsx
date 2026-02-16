"use client";

import { useEffect, useState } from "react";
import { Mail, Globe, Rocket, ShieldCheck } from "lucide-react";
import { elHeliebiVersePromotionGeneration } from "@/ai/flows/el-heliebi-verse-promotion-generation";

export function PhaseClosing() {
  const [promoText, setPromoText] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const text = await elHeliebiVersePromotionGeneration();
        setPromoText(text);
      } catch (e) {
        setPromoText(`قريباً بإذن الله... إطلاق تطبيق EL-Heliebi Live. أول ذكاء اصطناعي متطور بالكامل من إنتاج عربي. رؤية طموحة لمستقبل رقمي متكامل يجمع بين الابتكار والاحترافية.`);
      }
    };
    fetchPromo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#0a0f3d] text-white selection:bg-accent selection:text-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl z-10 space-y-12 w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-accent/10 rounded-full border border-accent/20 animate-bounce">
            <Rocket className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-2xl font-headline tracking-widest text-accent/80 uppercase">إعلان رسمي</h2>
        </div>

        <div className="bg-white/5 p-8 md:p-12 rounded-[40px] border border-accent/20 space-y-10 backdrop-blur-2xl shadow-2xl">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-accent">EL-Heliebi Live</h1>
            <p className="text-accent/60 tracking-[0.3em] uppercase text-sm font-medium">Artificial Intelligence . Arabic Vision</p>
          </div>
          
          <div className="arabic-text text-2xl md:text-3xl leading-relaxed text-white/95 font-body">
            {promoText ? (
              <div dangerouslySetInnerHTML={{ __html: promoText.replace(/\n/g, '<br/>') }} />
            ) : (
              <div className="flex flex-col items-center gap-4 py-10">
                 <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                 <p className="animate-pulse">جاري تحميل الرؤية المستقبلية للمنظومة...</p>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-white/10">
            <h3 className="text-3xl font-headline text-accent mb-4">EL-Heliebi Verse</h3>
            <p className="text-xl text-white/70">أكبر منصة رقمية عالمية متكاملة تجمع بين الذكاء الاصطناعي والتطبيقات الذكية والتقنيات الرقمية الحديثة.</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-accent/40 text-xs">
            <ShieldCheck size={14} />
            <span>صناعة عربية… برؤية عالمية</span>
          </div>
        </div>

        <div className="space-y-8">
          <p className="text-xl text-white/60">للتواصل والمشاركة في هذا المشروع العالمي:</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href="mailto:elheliebi@outlook.sa"
              className="inline-flex items-center gap-4 bg-accent text-primary font-bold px-10 py-5 rounded-full text-xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,162,78,0.4)]"
            >
              <Mail size={24} />
              elheliebi@outlook.sa
            </a>
          </div>
        </div>

        <div className="pt-20 opacity-50 flex flex-col items-center gap-3 border-t border-white/5 w-full">
          <div className="flex items-center gap-3 text-lg">
             <Globe size={20} className="text-accent" />
             <span>Industrial Vision … Global Presence</span>
          </div>
          <p className="text-xs tracking-widest uppercase font-medium">جميع الحقوق محفوظة لمنظومة الحليبي فرس OS © 2026</p>
        </div>
      </div>
    </div>
  );
}
