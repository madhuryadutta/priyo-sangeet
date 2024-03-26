import React from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedo } from 'react-icons/fa';

const PlayerControls = ({
    isPlaying,
    onPlayPause,
    onSkipTrack,
    onShuffle,
    isShuffle,
    onLoop,
    isLoop,
    onToggleDarkMode,
    isDarkMode
}) => {
    return (
        <div className="flex justify-center mt-4">
            <button onClick={() => onSkipTrack("backward")} className="mx-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
                <FaStepBackward />
            </button>
            <button onClick={onPlayPause} className="mx-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={() => onSkipTrack("forward")} className="mx-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
                <FaStepForward />
            </button>
            <button onClick={onShuffle} className={`mx-2 p-2 rounded-full ${isShuffle ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                <FaRandom />
            </button>
            <button onClick={onLoop} className={`mx-2 p-2 rounded-full ${isLoop ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                <FaRedo />
            </button>
            <button onClick={onToggleDarkMode} className={`mx-2 p-2 rounded-full ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                {isDarkMode ? "Light" : "Dark"} Mode
            </button>
        </div>
    );
};

export default PlayerControls;
