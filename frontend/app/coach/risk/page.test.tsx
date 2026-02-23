import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CoachRiskPage from "./page";

const fetchMock = vi.fn<typeof fetch>();

describe("CoachRiskPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
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

    expect(await screen.findByText("데이터 출처: 실데이터")).toBeInTheDocument();
    expect(screen.getByText("ETH: 35.2%"))
      .toBeInTheDocument();
  });

  it("shows fallback risk data when API is unavailable", async () => {
    fetchMock.mockRejectedValueOnce(new Error("timeout"));

    render(<CoachRiskPage />);

    expect(await screen.findByText("데이터 출처: 모의 데이터")).toBeInTheDocument();
    expect(screen.getByText("BTC: 45.0%")).toBeInTheDocument();
  });
});
