
"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { QrCode, X, Download } from "lucide-react";
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
    // الحصول على الرابط الحالي عند تحميل المكون في المتصفح
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-14 h-14 bg-accent text-primary shadow-2xl hover:bg-accent/90 transition-transform hover:scale-110"
            title="نشر التطبيق عبر QR"
          >
            <QrCode size={28} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-primary border-accent/30 text-white rounded-[32px] islamic-border">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-headline text-accent">شارك الأجر 🌙</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 space-y-6">
            <div className="p-4 bg-white rounded-2xl shadow-inner">
              {currentUrl && (
                <QRCodeSVG
                  value={currentUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: "/favicon.ico", // يمكن تغييرها لاحقاً بشعار المنظومة
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              )}
            </div>
            <p className="text-center text-sm text-white/80 arabic-text">
              امسح الكود بجوالك لفتح التطبيق، أو قم بتصوير الشاشة لمشاركتها مع الآخرين كصدقة جارية.
            </p>
            <div className="text-xs text-accent font-mono break-all opacity-60">
              {currentUrl}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
