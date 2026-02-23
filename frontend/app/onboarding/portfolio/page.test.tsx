import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import PortfolioOnboardingPage from "./page";

describe("PortfolioOnboardingPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("normalizes input symbol to uppercase", async () => {
    const user = userEvent.setup();

    render(<PortfolioOnboardingPage />);

    const symbolInput = screen.getByLabelText(/^자산 심볼/);
    await user.type(symbolInput, "btc");

    expect(symbolInput).toHaveValue("BTC");
  });

  it("stores submitted portfolio form in mock storage", async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(<PortfolioOnboardingPage />);

    await user.type(screen.getByLabelText(/^자산 심볼/), "btc");
    await user.type(screen.getByLabelText(/^시가 평가액/), "15000000");
    await user.click(screen.getByRole("button", { name: /자산 저장/ }));

    expect(
      await screen.findByText("보유 자산 정보가 저장되었습니다. (mock)", {}, { timeout: 2000 })
    ).toBeInTheDocument();
    expect(setItemSpy).toHaveBeenCalledWith(
      "portfolio-onboarding-form",
      expect.stringContaining('"symbol":"BTC"')
    );
  });
});
