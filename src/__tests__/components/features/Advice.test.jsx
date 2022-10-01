import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Advice from "../../../features/advice/Advice";
import * as adviceApiSlice from "../../../features/advice/adviceApiSlice";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Advice Component", () => {
  const refetchSpy = jest.fn();
  const mockAdviceResponse = {
    data: "For every complex problem there is an answer that is clear, simple, and wrong.",
    isError: false,
    isLoading: false,
    isSuccess: true,
    error: {
      error: "",
    },
    refetch: refetchSpy,
  };
  beforeEach(() => {
    jest.spyOn(adviceApiSlice, "useGetAdviceQuery").mockImplementation(() => {
      return mockAdviceResponse;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show Get Advice button", () => {
    render(<Advice />);

    expect(
      screen.getByRole("button", { name: "Get Advice" })
    ).toBeInTheDocument();
  });

  it("should show advice from api if response is successful", async () => {
    render(<Advice />);

    const adviceText = await screen.findByTestId("test-advice-content");
    expect(adviceText.textContent).toEqual(mockAdviceResponse.data);
  });

  it("should show error from api when api request gives some error", async () => {
    const mockErrorResponse = { ...mockAdviceResponse };
    mockErrorResponse.isError = true;
    mockErrorResponse.isSuccess = false;
    mockErrorResponse.error.error = "Technical Error.";
    jest.spyOn(adviceApiSlice, "useGetAdviceQuery").mockImplementation(() => {
      return mockErrorResponse;
    });

    render(<Advice />);

    const adviceText = await screen.findByTestId("test-error-content");
    expect(adviceText.textContent).toEqual(mockErrorResponse.error.error);
  });

  it("should be able to call refetch method on click of Get Advice button", () => {
    render(<Advice />);

    const getAdviceButton = screen.getByRole("button", { name: "Get Advice" });
    userEvent.click(getAdviceButton);

    expect(refetchSpy).toHaveBeenCalledTimes(1);
  });
});
