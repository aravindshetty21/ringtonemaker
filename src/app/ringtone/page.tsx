"use client";

import { useState } from "react";
import UploadButton from "@/components/UploadButton";
import WaveformEditor from "@/components/WaveformEditor";
import Controls from "@/components/Controls";

export default function RingtonePage() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [trimRange, setTrimRange] = useState<{
    start: number;
    end: number;
  } | null>(null);

  const handleUpload = (url: string, file: File) => {
    setAudioUrl(url);
    setAudioFile(file);
  };

  const handleRegionChange = (start: number, end: number) => {
    setTrimRange({ start, end });
  };

  return (
    <main
      className="w-full px-4 py-6 sm:px-6 sm:py-8 md:max-w-3xl md:mx-auto"
      itemScope
      itemType="http://schema.org/WebApplication"
    >
      <h1
        className="text-2xl sm:text-3xl font-bold mb-4 text-center"
        itemProp="name"
      >
        Ringtone Maker – Free Online Audio Trimmer & Editor
      </h1>
      <UploadButton onUpload={handleUpload} />

      {audioUrl && (
        <>
          <audio controls className="mt-4 w-full" id={"audio-player"}>
            <source src={audioUrl} />
          </audio>

          <WaveformEditor
            audioUrl={audioUrl}
            onRegionChange={handleRegionChange}
          />

          {trimRange && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              Trim from{" "}
              <b>{trimRange.start.toFixed(2)}s</b> to{" "}
              <b>{trimRange.end.toFixed(2)}s</b>
            </div>
          )}

          {audioFile && trimRange && (
            <Controls
              file={audioFile}
              start={trimRange.start}
              end={trimRange.end}
            />
          )}
        </>
      )}
    </main>
  );
}
