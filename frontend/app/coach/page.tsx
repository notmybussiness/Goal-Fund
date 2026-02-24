"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCoachInsights, getGoals } from "@/lib/api";
import { getCoachRequestContext } from "@/lib/coachContext";

type CoachDashboard = {
  progressPercent: number;
  headline: string;
  cards: string[];
};

const FALLBACK_DASHBOARD: CoachDashboard = {
  progressPercent: 30,
  headline: "Increase higher-risk exposure slightly to improve target completion odds.",
  cards: [
    "Raising growth-asset allocation can improve long-term return potential.",
    "Increasing monthly contributions by 10% can move your target date forward."
  ]
};

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function CoachPageContent() {
  const searchParams = useSearchParams();
  const searchParamString = searchParams.toString();
  const requestContext = useMemo(() => {
    const search = searchParamString ? `?${searchParamString}` : "";
    return getCoachRequestContext(search);
  }, [searchParamString]);
  const [dashboard, setDashboard] = useState<CoachDashboard>(FALLBACK_DASHBOARD);
  const [dataSource, setDataSource] = useState<"api" | "mock">("mock");
  const [statusMessage, setStatusMessage] = useState("Loading data.");
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);

    try {
      const [goals, insights] = await Promise.all([
        getGoals(requestContext.userId),
        getCoachInsights(requestContext.userId, requestContext.goalId, requestContext.portfolioId)
      ]);

      const requestedGoal = goals.find((goal) => goal.id === requestContext.goalId);
      const progressPercent = Number(requestedGoal?.progressPercent);
      const hasInsights = Array.isArray(insights.cards) && insights.cards.length > 0;

      if (!requestedGoal || !Number.isFinite(progressPercent) || !hasInsights || !insights.headline.trim()) {
        throw new Error("Coach API payload is incomplete");
      }

      setDashboard({
        progressPercent,
        headline: insights.headline,
        cards: insights.cards
      });
      setDataSource("api");
      setStatusMessage("Loaded coach dashboard from API.");
    } catch {
      setDashboard(FALLBACK_DASHBOARD);
      setDataSource("mock");
      setStatusMessage("API unavailable. Showing fallback summary.");
    } finally {
      setIsLoading(false);
    }
  }, [requestContext.goalId, requestContext.portfolioId, requestContext.userId]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return (
    <section className="grid cols-2">
      <article className="panel">
        <h2>Goal Progress</h2>
        <p className="muted">Current target completion: {formatPercent(dashboard.progressPercent)}%</p>
        <p className="muted">Data source: {dataSource === "api" ? "API" : "Mock"}</p>
        <p className={dataSource === "api" ? "success-text" : "error-text"}>{statusMessage}</p>
        <button type="button" className="primary-button" onClick={() => void loadDashboard()} disabled={isLoading}>
          {isLoading ? "Loading..." : "Reload"}
        </button>
      </article>

      <article className="panel">
        <h2>Coach Insights</h2>
        <p className="muted" style={{ marginTop: 0 }}>
          {dashboard.headline}
        </p>
        <ul className="muted">
          {dashboard.cards.map((card) => (
            <li key={card}>{card}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function CoachPageFallback() {
  return (
    <section className="grid cols-2">
      <article className="panel">
        <h2>Goal Progress</h2>
        <p className="muted">Loading coach dashboard...</p>
      </article>
      <article className="panel">
        <h2>Coach Insights</h2>
        <p className="muted" style={{ marginTop: 0 }}>
          Loading insights...
        </p>
      </article>
    </section>
  );
}

export default function CoachPage() {
  return (
    <Suspense fallback={<CoachPageFallback />}>
      <CoachPageContent />
    </Suspense>
  );
}
