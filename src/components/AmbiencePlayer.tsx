
"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AmbiencePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAmbience = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with real ambient sound
      />
      <Button
        onClick={toggleAmbience}
        variant="secondary"
        size="icon"
        className="rounded-full shadow-lg bg-accent text-primary hover:bg-accent/90"
        title="تشغيل أجواء رمضانية"
      >
        {isPlaying ? <Music className="animate-pulse" /> : <Music />}
      </Button>
      <Button
        onClick={() => setIsMuted(!isMuted)}
        variant="secondary"
        size="icon"
        className="rounded-full shadow-lg bg-accent text-primary hover:bg-accent/90"
        title="كتم الصوت"
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </Button>
    </div>
  );
}
