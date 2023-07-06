import type { MutableRefObject } from "react";
import { useState, useEffect } from "react";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import styles from './AudioPlayer.module.css';

interface ProgressBarProps {
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  timeProgress: number;
  duration: number;
}

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }: ProgressBarProps) => {
  const [muteVolume, setMuteVolume] = useState(false);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  const handleProgressChange = () => {
    if (!progressBarRef.current || !audioRef.current) {
      return;
    }

    audioRef.current.currentTime = +progressBarRef.current.value;
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className={styles.progress}>
      <span className={styles.currentTime}>{formatTime(timeProgress)}</span>
      <input
        className={styles.inputRange}
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span className={styles.time}>{formatTime(duration)}</span>
      <div className={styles.volume}>
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
