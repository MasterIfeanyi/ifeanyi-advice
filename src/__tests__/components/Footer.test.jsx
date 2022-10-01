import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

test("should show footer text with today's date", () => {
  const mockDate = new Date(1466424490000);
  const dateSpy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);
  const today = mockDate;

  render(<Footer />);

  expect(screen.getByTestId("test-footer-text").textContent).toEqual(
    `Chima Ifeanyi © ${today.getFullYear()}`
  );
  dateSpy.mockRestore();
});
