import React from 'react';

const Playlist = ({ songs, currentSongIndex, setCurrentSongIndex, isDarkMode }) => {
    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Playlist</h3>
            <ul>
                {songs.map((song, index) => (
                    <li
                        key={index}
                        className={`py-2 px-4 mb-2 rounded-md cursor-pointer ${currentSongIndex === index ? (isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white') : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800')}`}
                        onClick={() => setCurrentSongIndex(index)}
                    >
                        {song.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
