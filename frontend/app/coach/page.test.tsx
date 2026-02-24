import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CoachPage from "./page";

const fetchMock = vi.fn<typeof fetch>();

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(window.location.search)
}));

describe("CoachPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    window.history.pushState({}, "", "/coach");
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
    window.history.pushState({}, "", "/");
  });

  it("shows API-backed coach summary when requests succeed", async () => {
    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            {
              id: 1,
              name: "goal",
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
            headline: "Goal progress is on track.",
            cards: ["Keep current allocation."]
          }),
          { status: 200 }
        )
      );

    render(<CoachPage />);

    expect(await screen.findByText("Goal progress is on track.")).toBeInTheDocument();
    expect(screen.getByText(/42%/)).toBeInTheDocument();
  });

  it("falls back to mock coach summary when API fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    render(<CoachPage />);

    expect(await screen.findByText(/30%/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("uses query params for user, goal, and portfolio context", async () => {
    window.history.pushState({}, "", "/coach?userId=7&goalId=9&portfolioId=11");

    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            {
              id: 9,
              name: "goal",
              targetAmount: "100000000",
              currentAmount: "42000000",
              monthlyContribution: "1000000",
              targetDate: "2035-12-31",
              status: "ACTIVE",
              progressPercent: "55"
            }
          ]),
          { status: 200 }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            goalId: 9,
            portfolioId: 11,
            headline: "Query context applied.",
            cards: ["card"]
          }),
          { status: 200 }
        )
      );

    render(<CoachPage />);
    expect(await screen.findByText("Query context applied.")).toBeInTheDocument();

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "http://localhost:8090/api/v1/goals",
      expect.objectContaining({
        headers: { "X-USER-ID": "7" }
      })
    );
    expect(String(fetchMock.mock.calls[1]?.[0])).toContain("goalId=9&portfolioId=11");
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({
      headers: { "X-USER-ID": "7" }
    });
  });

  it("displays progress for the requested goal id when goals list has multiple items", async () => {
    window.history.pushState({}, "", "/coach?goalId=9&portfolioId=11");

    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            {
              id: 1,
              name: "goal-a",
              targetAmount: "100000000",
              currentAmount: "42000000",
              monthlyContribution: "1000000",
              targetDate: "2035-12-31",
              status: "ACTIVE",
              progressPercent: "10"
            },
            {
              id: 9,
              name: "goal-b",
              targetAmount: "100000000",
              currentAmount: "42000000",
              monthlyContribution: "1000000",
              targetDate: "2035-12-31",
              status: "ACTIVE",
              progressPercent: "55"
            }
          ]),
          { status: 200 }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            goalId: 9,
            portfolioId: 11,
            headline: "Goal 9 insights.",
            cards: ["card"]
          }),
          { status: 200 }
        )
      );

    render(<CoachPage />);

    expect(await screen.findByText("Goal 9 insights.")).toBeInTheDocument();
    expect(screen.getByText(/55%/)).toBeInTheDocument();
    expect(screen.queryByText(/10%/)).not.toBeInTheDocument();
  });

  it("re-reads query params after same-route search param changes", async () => {
    window.history.pushState({}, "", "/coach?userId=1&goalId=1&portfolioId=1");

    fetchMock
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            {
              id: 1,
              name: "goal",
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
            headline: "Initial context.",
            cards: ["card"]
          }),
          { status: 200 }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            {
              id: 9,
              name: "goal",
              targetAmount: "100000000",
              currentAmount: "42000000",
              monthlyContribution: "1000000",
              targetDate: "2035-12-31",
              status: "ACTIVE",
              progressPercent: "55"
            }
          ]),
          { status: 200 }
        )
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            goalId: 9,
            portfolioId: 11,
            headline: "Updated context.",
            cards: ["card"]
          }),
          { status: 200 }
        )
      );

    const { rerender } = render(<CoachPage />);
    expect(await screen.findByText("Initial context.")).toBeInTheDocument();

    window.history.pushState({}, "", "/coach?userId=7&goalId=9&portfolioId=11");
    rerender(<CoachPage />);

    expect(await screen.findByText("Updated context.")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      "http://localhost:8090/api/v1/goals",
      expect.objectContaining({
        headers: { "X-USER-ID": "7" }
      })
    );
    expect(String(fetchMock.mock.calls[3]?.[0])).toContain("goalId=9&portfolioId=11");
    expect(fetchMock.mock.calls[3]?.[1]).toMatchObject({
      headers: { "X-USER-ID": "7" }
    });
  });
});
