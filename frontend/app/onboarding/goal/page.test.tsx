import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import GoalOnboardingPage from "./page";

const tomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset).toISOString().split("T")[0];
};

describe("GoalOnboardingPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("shows validation error when monthly savings exceeds target amount", async () => {
    const user = userEvent.setup();

    render(<GoalOnboardingPage />);

    await user.type(screen.getByLabelText(/^목표 금액/), "100000");
    fireEvent.change(screen.getByLabelText(/^목표일/), { target: { value: tomorrow() } });
    await user.type(screen.getByLabelText(/^월 적립금/), "200000");

    expect(screen.getByText("월 적립금은 목표 금액보다 클 수 없습니다.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /목표 저장/ })).toBeDisabled();
  });

  it("stores submitted goal form in mock storage", async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(<GoalOnboardingPage />);

    await user.type(screen.getByLabelText(/^목표 금액/), "1000000");
    fireEvent.change(screen.getByLabelText(/^목표일/), { target: { value: tomorrow() } });
    await user.type(screen.getByLabelText(/^월 적립금/), "100000");
    await user.click(screen.getByRole("button", { name: /목표 저장/ }));

    expect(await screen.findByText("목표 정보가 저장되었습니다. (mock)", {}, { timeout: 2000 })).toBeInTheDocument();
    expect(setItemSpy).toHaveBeenCalledWith(
      "goal-onboarding-form",
      expect.stringContaining('"targetAmount":"1000000"')
    );
  });
});
