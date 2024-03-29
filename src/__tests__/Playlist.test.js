import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Playlist from "../components/Playlist";
import songs from "../songs";

describe("Playlist component", () => {
  test("renders playlist with correct songs and styles", () => {
    const currentSongIndex = 1; // Assuming the second song is the current one
    const setCurrentSongIndex = jest.fn(); // Mocking setCurrentSongIndex function

    const { getByText, getAllByRole } = render(
      <Playlist
        songs={songs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        isDarkMode={false} // Assuming light mode
      />
    );

    // Check if all songs are rendered
    songs.forEach((song) => {
      expect(getByText(song.title)).toBeInTheDocument();
    });

    // Check if current song has correct styles
    const currentSongElement = getAllByRole("listitem")[currentSongIndex];
    expect(currentSongElement).toHaveClass("bg-blue-500 text-white"); // Assuming light mode

    // Simulate click on a song
    fireEvent.click(currentSongElement);

    // Check if setCurrentSongIndex function is called with correct index
    expect(setCurrentSongIndex).toHaveBeenCalledWith(currentSongIndex);
  });
});
