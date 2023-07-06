import type { MutableRefObject, SetStateAction, Dispatch } from "react";
import { useEffect } from 'react';

interface DisplayTrackProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  setDuration: Dispatch<SetStateAction<number>>;
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  title: string;
  src: string;
}

const DisplayTrack = ({
  audioRef,
  setDuration,
  progressBarRef,
  setIsPlaying,
  title,
  src,
}: DisplayTrackProps) => {
  const onLoadedMetadata = () => {
    if (!audioRef.current || !progressBarRef.current) {
      return;
    }

    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = `${Math.floor(seconds)}`;
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (audioRef.current?.readyState > 0) {
      onLoadedMetadata();
    }
  }, []);

  return (
    <>
      <h4>{title}</h4>
      <audio
        src={src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying((prev) => !prev)}
      />
    </>
  );
};
export default DisplayTrack;
