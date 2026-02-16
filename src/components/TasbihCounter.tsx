
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TasbihCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const reset = () => setCount(0);

  return (
    <Card className="max-w-xs mx-auto mt-8 islamic-border bg-white/5 border-accent/20 backdrop-blur-sm">
      <CardContent className="p-6 text-center">
        <h3 className="text-accent text-lg mb-4 font-headline">السبحة الإلكترونية</h3>
        <div className="text-6xl font-bold mb-6 text-white tabular-nums">
          {count}
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={increment}
            size="lg"
            className="rounded-full w-20 h-20 bg-accent text-primary hover:bg-accent/90 shadow-xl"
          >
            <Plus size={32} />
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            size="icon"
            className="rounded-full border-accent text-accent hover:bg-accent/10"
          >
            <RotateCcw size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
