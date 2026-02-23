"use client";

import { useCallback, useEffect, useState } from "react";

type SimulationSummary = {
  successProbabilityPercent: number;
  p10Outcome: number;
  p50Outcome: number;
  p90Outcome: number;
};

type SimulationRunResponse = {
  summary?: {
    successProbabilityPercent: number | string;
    p10Outcome: number | string;
    p50Outcome: number | string;
    p90Outcome: number | string;
  };
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8090";
const DEFAULT_USER_ID = 1;

const FALLBACK_SUMMARY: SimulationSummary = {
  successProbabilityPercent: 67.2,
  p10Outcome: 78_000_000,
  p50Outcome: 105_000_000,
  p90Outcome: 142_000_000
};

function toNumber(value: number | string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0
  }).format(value);
}

async function createSimulationRun(): Promise<SimulationSummary> {
  const response = await fetch(`${API_BASE}/api/v1/simulation/runs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-USER-ID": String(DEFAULT_USER_ID)
    },
    body: JSON.stringify({
      goalId: 1,
      portfolioId: 1,
      scenarioCount: 1000,
      months: 36
    })
  });

  if (!response.ok) {
    throw new Error("Failed to create simulation run");
  }

  const payload = (await response.json()) as SimulationRunResponse;
  if (!payload.summary) {
    throw new Error("Simulation summary is missing");
  }

  return {
    successProbabilityPercent: toNumber(payload.summary.successProbabilityPercent),
    p10Outcome: toNumber(payload.summary.p10Outcome),
    p50Outcome: toNumber(payload.summary.p50Outcome),
    p90Outcome: toNumber(payload.summary.p90Outcome)
  };
}

export default function CoachSimulationPage() {
  const [summary, setSummary] = useState<SimulationSummary>(FALLBACK_SUMMARY);
  const [dataSource, setDataSource] = useState<"api" | "mock">("mock");
  const [statusMessage, setStatusMessage] = useState("데이터를 불러오는 중입니다.");
  const [isLoading, setIsLoading] = useState(true);

  const loadSimulation = useCallback(async () => {
    setIsLoading(true);

    try {
      const nextSummary = await createSimulationRun();
      setSummary(nextSummary);
      setDataSource("api");
      setStatusMessage("실데이터를 불러왔습니다.");
    } catch {
      setSummary(FALLBACK_SUMMARY);
      setDataSource("mock");
      setStatusMessage("API 응답을 사용할 수 없어 모의 데이터를 표시합니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSimulation();
  }, [loadSimulation]);

  return (
    <section className="panel">
      <h2>목표 달성 확률</h2>
      <p className="muted">몬테카를로 시뮬레이션 기반 결과를 표시합니다.</p>
      <p className="muted">데이터 출처: {dataSource === "api" ? "실데이터" : "모의 데이터"}</p>
      <p className={dataSource === "api" ? "success-text" : "error-text"}>{statusMessage}</p>
      <button
        type="button"
        className="primary-button"
        onClick={() => void loadSimulation()}
        disabled={isLoading}
        style={{ marginBottom: 12 }}
      >
        {isLoading ? "불러오는 중..." : "다시 불러오기"}
      </button>

      <div className="grid cols-2" style={{ marginTop: 12 }}>
        <div className="panel">
          <h3>성공 확률</h3>
          <p style={{ fontSize: 28, margin: 0 }}>{formatPercent(summary.successProbabilityPercent)}</p>
        </div>
        <div className="panel">
          <h3>Outcome Range</h3>
          <p className="muted">
            P10: {formatCurrency(summary.p10Outcome)} / P50: {formatCurrency(summary.p50Outcome)} / P90: {formatCurrency(summary.p90Outcome)}
          </p>
        </div>
      </div>
    </section>
  );
}
