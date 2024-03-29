import React from "react";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div data-testid="music-player" className="music-player">
          <MusicPlayer />
        </div>
      </header>
    </div>
  );
}

export default App;
