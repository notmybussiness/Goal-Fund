import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CoachPage from "./page";

const fetchMock = vi.fn<typeof fetch>();

describe("CoachPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("shows API-backed coach summary when requests succeed", async () => {
    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            {
              id: 1,
              name: "은퇴",
              targetAmount: "100000000",
              currentAmount: "42000000",
              monthlyContribution: "1000000",
              targetDate: "2035-12-31",
              status: "ACTIVE",
              progressPercent: "42"
            }
          ]),
          { status: 200 }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            goalId: 1,
            portfolioId: 1,
            headline: "현재 속도면 목표 달성이 가능합니다.",
            cards: ["고위험 비중은 이미 안정권입니다."]
          }),
          { status: 200 }
        )
      );

    render(<CoachPage />);

    expect(await screen.findByText("데이터 출처: 실데이터")).toBeInTheDocument();
    expect(screen.getByText("현재 목표 달성률: 42%")).toBeInTheDocument();
    expect(screen.getByText("현재 속도면 목표 달성이 가능합니다.")).toBeInTheDocument();
  });

  it("falls back to mock coach summary when API fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Network down"));

    render(<CoachPage />);

    expect(await screen.findByText("데이터 출처: 모의 데이터")).toBeInTheDocument();
    expect(screen.getByText("현재 목표 달성률: 30%")).toBeInTheDocument();
    expect(screen.getByText("고위험 자산 집중도를 낮추면 달성 확률이 상승합니다.")).toBeInTheDocument();
  });
});
