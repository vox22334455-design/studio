
"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { QrCode, Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function ShareQRCode() {
  const [currentUrl, setCurrentUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // جلب الرابط الحالي للمتصفح
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: "تم نسخ الرابط",
      description: "يمكنك الآن مشاركة الرابط مع الآخرين.",
    });
  };

  return (
    <>
      <Dialog>
        <div className="fixed bottom-6 right-6 z-[100] rtl:right-auto rtl:left-6">
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full w-16 h-16 bg-accent text-primary shadow-[0_0_20px_rgba(212,162,78,0.4)] hover:bg-accent/90 transition-all hover:scale-110 border-2 border-white/20"
              title="نشر التطبيق عبر QR"
            >
              <QrCode size={32} />
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="max-w-[90vw] sm:max-w-[450px] bg-[#192375] border-2 border-accent text-white rounded-[40px] islamic-border p-0 overflow-hidden shadow-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[150]">
          <div className="bg-accent/10 p-6 md:p-8 flex flex-col items-center space-y-6">
            <DialogHeader className="w-full">
              <DialogTitle className="text-center text-2xl md:text-3xl font-headline text-accent flex items-center justify-center gap-3">
                <Share2 size={28} />
                <span>شارك الأجر 🌙</span>
              </DialogTitle>
              <div className="h-px bg-accent/30 w-1/2 mx-auto mt-4" />
            </DialogHeader>

            <div className="relative p-4 bg-white rounded-[32px] shadow-2xl">
              {currentUrl && (
                <QRCodeSVG
                  value={currentUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="rounded-xl mx-auto"
                />
              )}
            </div>

            <div className="text-center space-y-4 w-full px-4">
              <p className="text-sm arabic-text text-white/90 leading-relaxed">
                امسح الكود أو انسخ الرابط لمشاركة التطبيق كصدقة جارية.
              </p>
              
              <div className="flex items-center gap-2 bg-primary/40 p-3 rounded-2xl border border-accent/20">
                <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-accent font-mono select-all">
                  {currentUrl}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleCopyLink}
                  className="text-accent hover:bg-accent/10"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>

            <div className="text-accent/40 text-[10px] font-bold tracking-widest uppercase pb-2">
              Industrial Vision … Global Presence
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
