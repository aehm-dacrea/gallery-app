import {
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";
import styles from './AudioPlayer.module.css';

interface ControlsProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  progressBarRef: MutableRefObject<HTMLInputElement | null>;
  duration: number;
  setTimeProgress: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  isPlaying,
  setIsPlaying,
}: ControlsProps) => {

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = useRef<number>();

  const repeat = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current) {
      return;
    }

    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = `${currentTime}`;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(+progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime += 5;
  };

  const skipBackward = () => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime -= 5;
  };

  return (
    <div className={styles.controls}>
      <button onClick={skipBackward}>
        <IoPlayBackSharp />
      </button>

      <button onClick={togglePlayPause}>
        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
      </button>
      <button onClick={skipForward}>
        <IoPlayForwardSharp />
      </button>
    </div>
  );
};

export default Controls;
