import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef, useState } from "react";
import { Slider } from "../Slider";

interface IconProps {
  className?: string;
}

export const Pause = ({ className }: IconProps) => (
  <svg
    className={className}
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    height="16"
    width="16"
    fill="currentColor"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = ({ className }: IconProps) => (
  <svg
    className={className}
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    height="16"
    width="16"
    fill="currentColor"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

export const Next = ({ className }: IconProps) => (
  <svg
    className={className}
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    height="16"
    width="16"
    fill="currentColor"
  >
    <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
  </svg>
);

export const Previous = ({ className }: IconProps) => (
  <svg
    className={className}
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    height="16"
    width="16"
    fill="currentColor"
  >
    <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
  </svg>
);

export const VolumeSilence = () => (
  <svg
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    height="16"
    width="16"
    fill="currentColor"
  >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
);

export const Volume = () => (
  <svg
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    height="16"
    width="16"
    fill="currentColor"
  >
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
  </svg>
);

interface CurrentSongProps {
  image: string;
  title: string;
  artists: string[];
}

const CurrentSong = ({ image, title, artists }: CurrentSongProps) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} loading="eager" />
      </picture>

      <div className="flex flex-col">
        <h3 className="font-semibold text-base block text-white">{title}</h3>
        <span className="text-xs opacity-80 text-white">
          {artists?.join(", ")}
        </span>
      </div>
    </div>
  );
};

interface SongControlProps {
  audio: React.RefObject<HTMLAudioElement>;
}

const SongControl = ({ audio }: SongControlProps) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.current?.currentTime || 0);
    };

    audio.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);

  const formatTime = (time: number | null) => {
    if (time == null) return `0:00`;

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const duration = audio.current?.duration ?? 0;

  return (
    <div className="flex gap-x-3 text-white text-xs pt-2">
      <span className="opacity-50 w-12 text-right">
        {formatTime(currentTime)}
      </span>

      <Slider
        defaultValue={[0]}
        value={[currentTime]}
        max={duration}
        min={0}
        className="w-[400px]"
        onValueChange={(value) => {
          audio.current!.currentTime = value[0];
        }}
      />

      <span className="opacity-50 w-12">
        {duration ? formatTime(duration) : "0:00"}
      </span>
    </div>
  );
};

const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previousVolumeRef = useRef(volume);

  const isVolumeSilenced = volume < 0.1;

  const handleClickVolume = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button
        className="opacity-70 hover:opacity-100 transition"
        onClick={handleClickVolume}
      >
        {isVolumeSilenced ? <VolumeSilence /> : <Volume />}
      </button>

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        className="w-[95px]"
        value={[volume * 100]}
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;

          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

export function Player() {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    volume,
    currentIndex,
    setCurrentIndex,
  } = usePlayerStore((state) => state);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { playlist, songs } = currentMusic;

  useEffect(() => {
    if (songs && songs.length > 0) {
      const currentSong = songs[currentIndex];
      const src = `/music/${playlist?.id}/0${currentSong?.id}.mp3`;
      const audio = audioRef.current;

      const playAudio = async () => {
        if (!audio) return;

        if (!audio.paused) {
          audio.pause();
        }
        audio.src = src;
        audio.volume = volume;

        try {
          await audio.play();
        } catch (error) {
          console.error("Failed to play audio:", error);
        }
      };

      playAudio();
    }
  }, [currentIndex, songs, playlist, volume]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      if (currentIndex < songs.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Optional: Repeat from the beginning
        setIsPlaying(false); // Optional: Stop playing at the end of the playlist
      }
    };
    audio?.addEventListener("ended", handleEnded);

    return () => {
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, songs.length, setIsPlaying]);

  return (
    <div className="flex flex-row justify-between w-full pl-2 pr-4 z-50">
      <div className="w-[200px]">
        <CurrentSong {...songs[currentIndex]} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <div className="flex items-center">
            <button
              className="text-white rounded-full p-2 px-8 "
              onClick={handlePrevious}
            >
              <Previous />
            </button>
            <button
              className="bg-white rounded-full p-2"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button
              className="text-white rounded-full p-2 px-8"
              onClick={handleNext}
            >
              <Next />
            </button>
          </div>
          <SongControl audio={audioRef} />
        </div>
      </div>
      <div className="grid place-content-center">
        <VolumeControl />
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
