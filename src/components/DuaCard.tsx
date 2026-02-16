"use client";

import { RAMADAN_DUAS } from "@/lib/dua-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, RotateCcw, Star, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DuaCardProps {
  currentDay: number;
}

export function DuaCard({ currentDay }: DuaCardProps) {
  const [viewedDay, setViewedDay] = useState(currentDay);
  const { toast } = useToast();

  const goToNext = () => setViewedDay((prev) => Math.min(prev + 1, 30));
  const goToPrev = () => setViewedDay((prev) => Math.max(prev - 1, 1));
  const goToCurrent = () => setViewedDay(currentDay);

  const duaText = RAMADAN_DUAS[viewedDay - 1];

  const handleShare = async () => {
    const textToShare = `🌙 *دعاء اليوم ${viewedDay} من رمضان* 🌙\n\n"${duaText}"\n\n✨ *تقبل الله منا ومنكم صالح الأعمال*\n📥 تمت المشاركة من تطبيق أدعية رمضان المبارك - صدقة جارية.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'دعاء رمضان',
          text: textToShare,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      toast({
        title: "تم نسخ النص بنجاح!",
        description: "يمكنك الآن لصق الدعاء في واتساب أو أي تطبيق آخر لمشاركته.",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4 w-full">
      <Card className="islamic-border overflow-hidden bg-gradient-to-br from-[#192375] to-[#121a5a] text-white border-accent shadow-2xl transition-all">
        <CardHeader className="text-center pb-2 border-b border-accent/20">
          <div className="flex justify-between items-center mb-2">
             <Button
                onClick={handleShare}
                variant="ghost"
                size="icon"
                className="text-accent hover:text-accent/80 hover:bg-accent/10 rounded-full"
                title="مشاركة الدعاء"
              >
                <Share2 size={20} />
              </Button>
              <Star size={32} className="star-animation fill-accent text-accent" />
              <div className="w-10" />
          </div>
          <CardTitle className="text-4xl font-headline text-accent">اليوم {viewedDay}</CardTitle>
          <div className="h-px bg-accent/30 w-1/2 mx-auto mt-4" />
        </CardHeader>
        <CardContent className="pt-8 pb-12 text-center">
          <p className="arabic-text text-2xl md:text-3xl leading-relaxed font-arabic mb-12 min-h-[160px] px-2">
            {duaText}
          </p>
          
          <div className="flex items-center justify-between gap-2 md:gap-4 mt-8">
            <Button
              onClick={goToNext}
              disabled={viewedDay === 30}
              variant="outline"
              size="icon"
              className="border-accent text-accent hover:bg-accent hover:text-primary rounded-full w-12 h-12"
            >
              <ChevronRight size={24} />
            </Button>

            <Button
              onClick={goToCurrent}
              variant="secondary"
              className="bg-accent text-primary hover:bg-accent/90 font-bold px-4 md:px-6 flex items-center gap-2"
            >
              <RotateCcw size={18} />
              <span className="hidden xs:inline">اليوم الحالي</span>
            </Button>

            <Button
              onClick={goToPrev}
              disabled={viewedDay === 1}
              variant="outline"
              size="icon"
              className="border-accent text-accent hover:bg-accent hover:text-primary rounded-full w-12 h-12"
            >
              <ChevronLeft size={24} />
            </Button>
          </div>
        </CardContent>
        <div className="bg-accent/10 py-4 text-center text-accent/80 text-sm">
          ✨ صدقة جارية - نسألكم الدعاء ✨
        </div>
      </Card>
    </div>
  );
}