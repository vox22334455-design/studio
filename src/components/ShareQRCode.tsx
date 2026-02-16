
"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { QrCode, X, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ShareQRCode() {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <Dialog>
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
        <DialogContent className="sm:max-w-[450px] bg-[#192375] border-2 border-accent text-white rounded-[40px] islamic-border p-0 overflow-hidden shadow-2xl">
          <div className="bg-accent/10 p-8 flex flex-col items-center space-y-8">
            <DialogHeader className="w-full">
              <DialogTitle className="text-center text-3xl font-headline text-accent flex items-center justify-center gap-3">
                <Share2 size={28} />
                <span>شارك الأجر 🌙</span>
              </DialogTitle>
              <div className="h-px bg-accent/30 w-1/2 mx-auto mt-4" />
            </DialogHeader>

            <div className="relative p-6 bg-white rounded-[32px] shadow-[0_0_50px_rgba(255,255,255,0.1)] group">
              {currentUrl && (
                <QRCodeSVG
                  value={currentUrl}
                  size={240}
                  level="H"
                  includeMargin={true}
                  className="rounded-xl"
                />
              )}
              <div className="absolute inset-0 border-4 border-accent/20 rounded-[32px] pointer-events-none" />
            </div>

            <div className="text-center space-y-4 px-4">
              <p className="text-xl arabic-text text-white leading-relaxed">
                امسح الكود بجوالك لفتح التطبيق، أو صوّر الشاشة لمشاركتها كصدقة جارية.
              </p>
              <div className="bg-primary/50 py-3 px-6 rounded-full border border-white/10 select-all overflow-hidden text-ellipsis whitespace-nowrap text-sm text-accent/80 font-mono">
                {currentUrl}
              </div>
            </div>

            <div className="text-accent/60 text-xs font-bold tracking-widest uppercase pb-2">
              Industrial Vision … Global Presence
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
