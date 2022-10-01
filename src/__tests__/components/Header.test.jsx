import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";
import "@testing-library/jest-dom";

test("should show advice text in header's component", () => {
  render(<Header />);

  expect(screen.getByText("Advice")).toBeInTheDocument();
});
