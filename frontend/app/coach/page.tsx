"use client";

import { useCallback, useEffect, useState } from "react";
import { getGoals } from "@/lib/api";

type CoachInsightResponse = {
  headline: string;
  cards: string[];
};

type CoachDashboard = {
  progressPercent: number;
  headline: string;
  cards: string[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8090";
const DEFAULT_USER_ID = 1;
const DEFAULT_GOAL_ID = 1;
const DEFAULT_PORTFOLIO_ID = 1;

const FALLBACK_DASHBOARD: CoachDashboard = {
  progressPercent: 30,
  headline: "목표 달성 속도를 유지하려면 위험자산 집중도를 조금 더 낮춰보세요.",
  cards: [
    "고위험 자산 집중도를 낮추면 달성 확률이 상승합니다.",
    "월 적립금 10% 상향 시 목표 도달 시점이 단축됩니다."
  ]
};

async function getCoachInsights(goalId: number, portfolioId: number): Promise<CoachInsightResponse> {
  const response = await fetch(
    `${API_BASE}/api/v1/coach/insights?goalId=${goalId}&portfolioId=${portfolioId}`,
    {
      headers: { "X-USER-ID": String(DEFAULT_USER_ID) },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coach insights");
  }

  return response.json() as Promise<CoachInsightResponse>;
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) {
    return "0";
  }
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export default function CoachPage() {
  const [dashboard, setDashboard] = useState<CoachDashboard>(FALLBACK_DASHBOARD);
  const [dataSource, setDataSource] = useState<"api" | "mock">("mock");
  const [statusMessage, setStatusMessage] = useState("데이터를 불러오는 중입니다.");
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);

    try {
      const [goals, insights] = await Promise.all([
        getGoals(DEFAULT_USER_ID),
        getCoachInsights(DEFAULT_GOAL_ID, DEFAULT_PORTFOLIO_ID)
      ]);

      const progressPercent = Number(goals[0]?.progressPercent);
      const hasInsights = Array.isArray(insights.cards) && insights.cards.length > 0;

      if (!Number.isFinite(progressPercent) || !hasInsights || !insights.headline.trim()) {
        throw new Error("Coach API payload is incomplete");
      }

      setDashboard({
        progressPercent,
        headline: insights.headline,
        cards: insights.cards
      });
      setDataSource("api");
      setStatusMessage("실데이터를 불러왔습니다.");
    } catch {
      setDashboard(FALLBACK_DASHBOARD);
      setDataSource("mock");
      setStatusMessage("API 응답을 사용할 수 없어 모의 데이터를 표시합니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return (
    <section className="grid cols-2">
      <article className="panel">
        <h2>목표 진행률</h2>
        <p className="muted">현재 목표 달성률: {formatPercent(dashboard.progressPercent)}%</p>
        <p className="muted">데이터 출처: {dataSource === "api" ? "실데이터" : "모의 데이터"}</p>
        <p className={dataSource === "api" ? "success-text" : "error-text"}>{statusMessage}</p>
        <button type="button" className="primary-button" onClick={() => void loadDashboard()} disabled={isLoading}>
          {isLoading ? "불러오는 중..." : "다시 불러오기"}
        </button>
      </article>

      <article className="panel">
        <h2>코치 인사이트</h2>
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
