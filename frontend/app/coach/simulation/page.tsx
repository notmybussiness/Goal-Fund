"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createSimulationRun } from "@/lib/api";
import { getCoachRequestContext } from "@/lib/coachContext";

type SimulationSummary = {
  successProbabilityPercent: number;
  p10Outcome: number;
  p50Outcome: number;
  p90Outcome: number;
};

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

export default function CoachSimulationPage() {
  const requestContext = useMemo(() => getCoachRequestContext(), []);
  const [summary, setSummary] = useState<SimulationSummary>(FALLBACK_SUMMARY);
  const [dataSource, setDataSource] = useState<"api" | "mock">("mock");
  const [statusMessage, setStatusMessage] = useState("Loading data.");
  const [isLoading, setIsLoading] = useState(true);

  const loadSimulation = useCallback(async () => {
    setIsLoading(true);

    try {
      const payload = await createSimulationRun(requestContext.userId, {
        goalId: requestContext.goalId,
        portfolioId: requestContext.portfolioId,
        scenarioCount: requestContext.scenarioCount,
        months: requestContext.months
      });

      if (!payload.summary) {
        throw new Error("Simulation summary is missing");
      }

      setSummary({
        successProbabilityPercent: toNumber(payload.summary.successProbabilityPercent),
        p10Outcome: toNumber(payload.summary.p10Outcome),
        p50Outcome: toNumber(payload.summary.p50Outcome),
        p90Outcome: toNumber(payload.summary.p90Outcome)
      });
      setDataSource("api");
      setStatusMessage("Loaded simulation run from API.");
    } catch {
      setSummary(FALLBACK_SUMMARY);
      setDataSource("mock");
      setStatusMessage("API unavailable. Showing fallback simulation.");
    } finally {
      setIsLoading(false);
    }
  }, [
    requestContext.goalId,
    requestContext.months,
    requestContext.portfolioId,
    requestContext.scenarioCount,
    requestContext.userId
  ]);

  useEffect(() => {
    void loadSimulation();
  }, [loadSimulation]);

  return (
    <section className="panel">
      <h2>Goal Success Simulation</h2>
      <p className="muted">Monte Carlo simulation based outcome ranges.</p>
      <p className="muted">Data source: {dataSource === "api" ? "API" : "Mock"}</p>
      <p className={dataSource === "api" ? "success-text" : "error-text"}>{statusMessage}</p>
      <button
        type="button"
        className="primary-button"
        onClick={() => void loadSimulation()}
        disabled={isLoading}
        style={{ marginBottom: 12 }}
      >
        {isLoading ? "Loading..." : "Reload"}
      </button>

      <div className="grid cols-2" style={{ marginTop: 12 }}>
        <div className="panel">
          <h3>Success Probability</h3>
          <p style={{ fontSize: 28, margin: 0 }}>{formatPercent(summary.successProbabilityPercent)}</p>
        </div>
        <div className="panel">
          <h3>Outcome Range</h3>
          <p className="muted">
            P10: {formatCurrency(summary.p10Outcome)} / P50: {formatCurrency(summary.p50Outcome)} / P90:{" "}
            {formatCurrency(summary.p90Outcome)}
          </p>
        </div>
      </div>
    </section>
  );
}
