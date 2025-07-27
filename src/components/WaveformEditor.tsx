"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

type Props = {
  audioUrl: string;
  onRegionChange?: (start: number, end: number) => void;
};

type Region = {
  start: number;
  end: number;
};

export default function WaveformEditor({ audioUrl, onRegionChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<any>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const clickTimes = useRef<number[]>([]);
  const [region, setRegion] = useState<Region>({
    start: 0,
    end: 5,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Create plugin instance inside effect
    const regionsPlugin = RegionsPlugin.create();

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      media: document.getElementById('audio-player') as HTMLAudioElement,
      waveColor: "#888",
      progressColor: "#888",
      cursorColor: "#000",
      height: 100,
      url: audioUrl,
      plugins: [regionsPlugin],
    });

    waveSurferRef.current = wavesurfer;

    wavesurfer.on("interaction", () => {
      const time = wavesurfer.getCurrentTime();
      clickTimes.current.push(time);
      if (clickTimes.current.length === 2) {
        const [start, end] = clickTimes.current.sort((a, b) => a - b);

        if (regionRef.current) {
          regionRef.current?.remove();
        }
        setRegion({ start, end });
        onRegionChange?.(start, end);
        // Add region
        regionRef.current = regionsPlugin.addRegion({
          start,
          end,
          color: "rgba(0, 200, 0, 0.3)",
        });

        // Reset for next selection
        clickTimes.current = [];
      }
    });


  // wavesurfer.on("ready", () => {
    //   regionsPlugin.enableDragSelection({
    //     color: "rgba(0, 182, 212, 0.5)",
    //   });

    //   regionsPlugin.on("region-created", (region: any) => {
    //     if (regionRef.current) {
    //       regionRef.current?.remove();
    //     }
    //     regionRef.current = region;
    //     const { start, end } = region;
    //     setRegion({ start, end });
    //     onRegionChange?.(start, end);
    //   });

    //   regionsPlugin.on("region-updated", (region: any) => {
    //     const { start, end } = region;
    //     setRegion({ start, end });
    //     onRegionChange?.(start, end);
    //   });
    // });

    return () => {
      wavesurfer.destroy();
      waveSurferRef.current = null;
      // regionsPlugin is destroyed by wavesurfer.destroy()
    };
  }, [audioUrl]);

  // useEffect(() => {
  //   if (waveSurferRef.current) {
  //     if (isPlaying) {
  //       waveSurferRef.current.play();
  //     } else {
  //       waveSurferRef.current.pause();
  //     }
  //   }
  // }, [isPlaying]);

  return (
    <div className="mt-6">
      <h2 className="text-base sm:text-lg font-semibold mb-2 text-center">Trim Audio</h2>
      <div ref={containerRef} className="w-full rounded overflow-hidden bg-gray-100" />
      <p className="text-center text-xs sm:text-sm text-gray-500 mt-2">
        Trim Start: {region.start.toFixed(2)}s &nbsp; | &nbsp; End:{" "}
        {region.end.toFixed(2)}s
      </p>
    </div>
  );
}
