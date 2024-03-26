import React, { useState, useRef, useEffect } from "react";
import PlayerControls from "./PlayerControls";
import SongDetails from "./SongDetails";
import Playlist from "./Playlist";
import songs from "../songs";

const defaultImageSrc = "default.png";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleCanPlayThrough = () => {
      setIsAudioReady(true);
    };

    if (audioElement) {
      audioElement.addEventListener("canplaythrough", handleCanPlayThrough);
      return () => {
        audioElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough,
        );
      };
    }
  }, [audioRef]);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleEnded = () => {
      if (!isLoop) {
        const nextIndex = isShuffle
          ? Math.floor(Math.random() * songs.length)
          : (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
      }
    };

    if (audioElement) {
      audioElement.addEventListener("ended", handleEnded);
      return () => {
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentSongIndex, isShuffle, isLoop]);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedMetadata = () => {
      audioElement.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });
    };

    if (audioElement && isAudioReady) {
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
      };
    }
  }, [currentSong, isAudioReady]);

  useEffect(() => {
    if (audioRef.current && isAudioReady) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isAudioReady]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = (e) => {
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipTrackHandler = (direction) => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(randomIndex);
    } else {
      if (direction === "forward") {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
      } else {
        setCurrentSongIndex(
          (prevIndex) => (prevIndex - 1 + songs.length) % songs.length,
        );
      }
    }
  };

  const shuffleHandler = () => {
    setIsShuffle(!isShuffle);
  };

  const loopHandler = () => {
    setIsLoop(!isLoop);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`container mx-auto p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
    >
      <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <SongDetails
          currentSong={currentSong}
          currentTime={currentTime}
          duration={duration}
          formatTime={formatTime}
          isDarkMode={isDarkMode}
          defaultImageSrc={defaultImageSrc}
          audioRef={audioRef}
        />
        <div className="p-6">
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={playPauseHandler}
            onSkipTrack={skipTrackHandler}
            onShuffle={shuffleHandler}
            isShuffle={isShuffle}
            onLoop={loopHandler}
            isLoop={isLoop}
            onToggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
      <Playlist
        songs={songs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        isDarkMode={isDarkMode}
      />
      <audio
        ref={audioRef}
        src={currentSong.songSrc}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        className="hidden"
        loop={isLoop}
      />
    </div>
  );
};

export default MusicPlayer;
