import { useRef, useState } from "react";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import styles from './AudioPlayer.module.css';

export type CurrentTrackType = {
  title: string;
  src: string;
  author: string;
  thumbnail: string;
}

interface AudioPlayerProps {
  title: string;
  src: string;
}

export const AudioPlayer = ({ title, src }: AudioPlayerProps) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={styles.audioPlayer}>
        <div className={styles.inner}>
          <DisplayTrack
            {...{
              audioRef,
              setDuration,
              progressBarRef,
              setIsPlaying,
              title,
              src
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              trackIndex,
              setTrackIndex,
              isPlaying,
              setIsPlaying,
            }}
          />
        </div>
      </div>
    </>
  );
};
