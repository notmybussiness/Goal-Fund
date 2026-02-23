import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CoachSimulationPage from "./page";

const fetchMock = vi.fn<typeof fetch>();

describe("CoachSimulationPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("shows simulation summary returned by API", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          runId: "8f278f4f-c788-4eff-b9eb-f0fd1ff8aab6",
          goalId: 1,
          portfolioId: 1,
          scenarioCount: 1000,
          status: "COMPLETED",
          createdAt: "2026-02-24T11:30:00",
          summary: {
            successProbabilityPercent: "73.8",
            p10Outcome: "82000000",
            p50Outcome: "111000000",
            p90Outcome: "148000000"
          }
        }),
        { status: 200 }
      )
    );

    render(<CoachSimulationPage />);

    expect(await screen.findByText("데이터 출처: 실데이터")).toBeInTheDocument();
    expect(screen.getByText("73.8%")).toBeInTheDocument();
    expect(screen.getByText("P10: 82,000,000 / P50: 111,000,000 / P90: 148,000,000")).toBeInTheDocument();
  });

  it("falls back to mock simulation data when API fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("service unavailable"));

    render(<CoachSimulationPage />);

    expect(await screen.findByText("데이터 출처: 모의 데이터")).toBeInTheDocument();
    expect(screen.getByText("67.2%")).toBeInTheDocument();
    expect(screen.getByText("P10: 78,000,000 / P50: 105,000,000 / P90: 142,000,000")).toBeInTheDocument();
  });
});
