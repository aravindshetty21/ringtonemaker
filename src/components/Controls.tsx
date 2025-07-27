"use client";

import { useState } from "react";
import { trimAudio } from "@/lib/ffmpeg";

type Props = {
  file: File;
  start: number;
  end: number;
};

export default function Controls({ file, start, end }: Props) {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleTrim = async () => {
    setLoading(true);
    setDownloadUrl(null);

    try {
      const blob = await trimAudio(file, start, end);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error("Trimming failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <button
        onClick={handleTrim}
        disabled={loading}
        className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        {loading ? "Processing..." : "Trim & Export"}
      </button>

      {downloadUrl && (
        <div className="mt-4">
          <a
            href={downloadUrl}
            download="ringtone.mp3"
            className="text-blue-600 underline"
          >
            Download Ringtone
          </a>
        </div>
      )}
    </div>
  );
}
