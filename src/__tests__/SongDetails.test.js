import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SongDetails from "../components/SongDetails"; // Update the import path as needed

describe("SongDetails Component", () => {
  const currentSong = {
    title: "Test Song",
    artist: "Test Artist",
    imgSrc: "test_image.jpg",
  };
  const currentTime = 30;
  const duration = 180;
  const formatTime = (time) => `${Math.floor(time / 60)}:${time % 60}`;
  const isDarkMode = false;
  const defaultImageSrc = "default_image.jpg";
  const audioRef = { current: { currentTime: 0 } };

  test("audio time updates when user changes the range input", () => {
    render(
      <SongDetails
        currentSong={currentSong}
        currentTime={currentTime}
        duration={duration}
        formatTime={formatTime}
        isDarkMode={isDarkMode}
        defaultImageSrc={defaultImageSrc}
        audioRef={audioRef}
      />
    );

    const rangeInput = screen.getByRole("slider");

    // Simulate user interaction to change the range input
    fireEvent.change(rangeInput, { target: { value: 60 } });

    // Check if audio time updates correctly
    expect(Number(audioRef.current.currentTime)).toBe(60); // Convert to number before comparing
  });
});
