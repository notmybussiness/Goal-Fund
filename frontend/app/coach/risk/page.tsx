"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getRiskSnapshot } from "@/lib/api";
import { getCoachRequestContext } from "@/lib/coachContext";

type RiskContribution = {
  symbol: string;
  riskPercent: number;
  factorExposureScore: number;
};

type RiskSnapshot = {
  volatility: number;
  expectedMaxDrawdown: number;
  contributions: RiskContribution[];
};

const FALLBACK_SNAPSHOT: RiskSnapshot = {
  volatility: 17.0,
  expectedMaxDrawdown: 30.6,
  contributions: [
    { symbol: "BTC", riskPercent: 45.0, factorExposureScore: 36.0 },
    { symbol: "US-TECH", riskPercent: 30.0, factorExposureScore: 24.0 },
    { symbol: "KOSPI ETF", riskPercent: 25.0, factorExposureScore: 20.0 }
  ]
};

function toNumber(value: number | string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export default function CoachRiskPage() {
  const requestContext = useMemo(() => getCoachRequestContext(), []);
  const [snapshot, setSnapshot] = useState<RiskSnapshot>(FALLBACK_SNAPSHOT);
  const [dataSource, setDataSource] = useState<"api" | "mock">("mock");
  const [statusMessage, setStatusMessage] = useState("Loading data.");
  const [isLoading, setIsLoading] = useState(true);

  const loadRiskSnapshot = useCallback(async () => {
    setIsLoading(true);

    try {
      const payload = await getRiskSnapshot(requestContext.userId, requestContext.portfolioId);
      const contributions = payload.contributions?.map((item) => ({
        symbol: item.symbol,
        riskPercent: toNumber(item.riskPercent),
        factorExposureScore: toNumber(item.factorExposureScore)
      }));

      if (!contributions || contributions.length === 0) {
        throw new Error("Empty risk contribution list");
      }

      setSnapshot({
        volatility: toNumber(payload.volatility),
        expectedMaxDrawdown: toNumber(payload.expectedMaxDrawdown),
        contributions
      });
      setDataSource("api");
      setStatusMessage("Loaded risk snapshot from API.");
    } catch {
      setSnapshot(FALLBACK_SNAPSHOT);
      setDataSource("mock");
      setStatusMessage("API unavailable. Showing fallback snapshot.");
    } finally {
      setIsLoading(false);
    }
  }, [requestContext.portfolioId, requestContext.userId]);

  useEffect(() => {
    void loadRiskSnapshot();
  }, [loadRiskSnapshot]);

  return (
    <section className="panel">
      <h2>Risk Snapshot</h2>
      <p className="muted">Portfolio risk contribution and factor exposure overview.</p>
      <p className="muted">Data source: {dataSource === "api" ? "API" : "Mock"}</p>
      <p className={dataSource === "api" ? "success-text" : "error-text"}>{statusMessage}</p>
      <p className="muted" style={{ marginTop: 10 }}>
        Annualized volatility {formatPercent(snapshot.volatility)} / Expected max drawdown{" "}
        {formatPercent(snapshot.expectedMaxDrawdown)}
      </p>
      <button
        type="button"
        className="primary-button"
        onClick={() => void loadRiskSnapshot()}
        disabled={isLoading}
        style={{ marginBottom: 12 }}
      >
        {isLoading ? "Loading..." : "Reload"}
      </button>

      <div className="grid cols-2" style={{ marginTop: 12 }}>
        <div className="panel">
          <h3>Risk Contribution</h3>
          <ul className="muted" style={{ margin: 0, paddingLeft: 20 }}>
            {snapshot.contributions.map((item) => (
              <li key={`${item.symbol}-risk`}>
                {item.symbol}: {formatPercent(item.riskPercent)}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Factor Exposure</h3>
          <ul className="muted" style={{ margin: 0, paddingLeft: 20 }}>
            {snapshot.contributions.map((item) => (
              <li key={`${item.symbol}-factor`}>
                {item.symbol}: {item.factorExposureScore.toFixed(1)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
