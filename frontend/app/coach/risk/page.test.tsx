import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CoachRiskPage from "./page";

const fetchMock = vi.fn<typeof fetch>();

describe("CoachRiskPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    window.history.pushState({}, "", "/coach/risk");
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
    window.history.pushState({}, "", "/");
  });

  it("renders risk snapshot from API response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          portfolioId: 1,
          snapshotAt: "2026-02-24T11:30:00",
          volatility: "18.4",
          expectedMaxDrawdown: "33.1",
          contributions: [
            {
              symbol: "ETH",
              riskPercent: "35.2",
              factorExposureScore: "26.0"
            }
          ]
        }),
        { status: 200 }
      )
    );

    render(<CoachRiskPage />);

    expect(await screen.findByText("ETH: 35.2%")).toBeInTheDocument();
  });

  it("shows fallback risk data when API is unavailable", async () => {
    fetchMock.mockRejectedValueOnce(new Error("timeout"));

    render(<CoachRiskPage />);

    expect(await screen.findByText("BTC: 45.0%")).toBeInTheDocument();
  });

  it("uses query params for user and portfolio context", async () => {
    window.history.pushState({}, "", "/coach/risk?userId=7&portfolioId=13");
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          portfolioId: 13,
          snapshotAt: "2026-02-24T11:30:00",
          volatility: "18.4",
          expectedMaxDrawdown: "33.1",
          contributions: [
            {
              symbol: "ETH",
              riskPercent: "35.2",
              factorExposureScore: "26.0"
            }
          ]
        }),
        { status: 200 }
      )
    );

    render(<CoachRiskPage />);
    expect(await screen.findByText("ETH: 35.2%")).toBeInTheDocument();

    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("portfolioId=13");
    expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({
      headers: { "X-USER-ID": "7" }
    });
  });
});
