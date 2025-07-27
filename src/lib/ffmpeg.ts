import { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpegInstance: FFmpeg | null = null;

export async function loadFFmpeg() {
  if (!ffmpegInstance) {
    ffmpegInstance = new FFmpeg();
    await ffmpegInstance.load();
  } else if (!ffmpegInstance.loaded) {
    await ffmpegInstance.load();
  }
}

export async function trimAudio(
  file: File,
  start: number,
  end: number
): Promise<Blob> {
  await loadFFmpeg();

  const inputName = "input.mp3";
  const outputName = "trimmed.mp3";
  const duration = end - start;

  const fileData = await file.arrayBuffer();
  await ffmpegInstance!.writeFile(inputName, new Uint8Array(fileData));

  await ffmpegInstance!.exec([
    "-i", inputName,
    "-ss", start.toString(),
    "-t", duration.toString(),
    "-acodec", "copy",
    outputName
  ]);

  const data = await ffmpegInstance!.readFile(outputName);
  return new Blob([data], { type: "audio/mp3" });
}