"use client";

import { useRef } from "react";

type Props = {
  onUpload: (fileUrl: string, file: File) => void;
};

export default function UploadButton({ onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file);
      onUpload(url, file);
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center">
      <input
        type="file"
        accept="audio/*"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Upload Audio
      </button>
    </div>
  );
}
