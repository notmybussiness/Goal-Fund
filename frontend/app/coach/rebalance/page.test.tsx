import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CoachRebalancePage from "./page";

const fetchMock = vi.fn<typeof fetch>();

describe("CoachRebalancePage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("shows rebalance actions from API response", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          proposalId: "f9999f27-9e4c-4ef4-b89b-2bf2b7e4f4b2",
          portfolioId: 1,
          summary: "Equal weight rebalance proposal generated",
          createdAt: "2026-02-24T12:00:00",
          actions: [
            { symbol: "KOSPI ETF", actionType: "BUY", amount: "1100000" },
            { symbol: "BTC", actionType: "SELL", amount: "2300000" }
          ]
        }),
        { status: 200 }
      )
    );

    render(<CoachRebalancePage />);

    expect(await screen.findByText("데이터 출처: 실데이터")).toBeInTheDocument();
    expect(screen.getByText("KOSPI ETF: BUY 1,100,000 KRW")).toBeInTheDocument();
    expect(screen.getByText("BTC: SELL 2,300,000 KRW")).toBeInTheDocument();
  });

  it("keeps fallback rebalance actions when API request fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("500"));

    render(<CoachRebalancePage />);

    expect(await screen.findByText("데이터 출처: 모의 데이터")).toBeInTheDocument();
    expect(screen.getByText("BTC: SELL 2,300,000 KRW")).toBeInTheDocument();
    expect(screen.getByText("US ETF: BUY 1,200,000 KRW")).toBeInTheDocument();
  });
});
