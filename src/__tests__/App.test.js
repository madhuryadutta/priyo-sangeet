import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders music player", () => {
  const { getByTestId } = render(<App />);
  const musicPlayerElement = getByTestId("music-player");
  expect(musicPlayerElement).toBeInTheDocument();
});
