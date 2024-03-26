import React from "react";

const SongDetails = ({
  currentSong,
  currentTime,
  duration,
  formatTime,
  isDarkMode,
  defaultImageSrc,
  audioRef,
}) => {
  return (
    <div className="p-6">
      <img
        src={currentSong.imgSrc || defaultImageSrc}
        alt="Album Cover"
        className={`w-full h-64 object-cover ${isDarkMode ? "bg-gray-800" : "bg-gray-200"} animate-pulse`}
      />
      <h2 className="text-2xl font-bold">{currentSong.title}</h2>
      <p className="text-sm text-gray-600">{currentSong.artist}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">{formatTime(currentTime)}</p>
        <input
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={(e) => (audioRef.current.currentTime = e.target.value)}
          className="flex-grow mx-2 h-1 appearance-none bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none"
        />
        <p className="text-sm text-gray-500">{formatTime(duration)}</p>
      </div>
    </div>
  );
};

export default SongDetails;
