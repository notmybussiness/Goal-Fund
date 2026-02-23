"use client";

import { useCallback, useEffect, useState } from "react";

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

type RiskSnapshotResponse = {
  volatility: number | string;
  expectedMaxDrawdown: number | string;
  contributions: Array<{
    symbol: string;
    riskPercent: number | string;
    factorExposureScore: number | string;
  }>;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8090";
const DEFAULT_USER_ID = 1;
const DEFAULT_PORTFOLIO_ID = 1;

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

async function getRiskSnapshot(): Promise<RiskSnapshot> {
  const response = await fetch(`${API_BASE}/api/v1/risk/snapshot?portfolioId=${DEFAULT_PORTFOLIO_ID}`, {
    headers: { "X-USER-ID": String(DEFAULT_USER_ID) },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch risk snapshot");
  }

  const payload = (await response.json()) as RiskSnapshotResponse;
  const contributions = payload.contributions?.map((item) => ({
    symbol: item.symbol,
    riskPercent: toNumber(item.riskPercent),
    factorExposureScore: toNumber(item.factorExposureScore)
  }));

  if (!contributions || contributions.length === 0) {
    throw new Error("Empty risk contribution list");
  }

  return {
    volatility: toNumber(payload.volatility),
    expectedMaxDrawdown: toNumber(payload.expectedMaxDrawdown),
    contributions
  };
}

export default function CoachRiskPage() {
  const [snapshot, setSnapshot] = useState<RiskSnapshot>(FALLBACK_SNAPSHOT);
  const [dataSource, setDataSource] = useState<"api" | "mock">("mock");
  const [statusMessage, setStatusMessage] = useState("데이터를 불러오는 중입니다.");
  const [isLoading, setIsLoading] = useState(true);

  const loadRiskSnapshot = useCallback(async () => {
    setIsLoading(true);

    try {
      const riskSnapshot = await getRiskSnapshot();
      setSnapshot(riskSnapshot);
      setDataSource("api");
      setStatusMessage("실데이터를 불러왔습니다.");
    } catch {
      setSnapshot(FALLBACK_SNAPSHOT);
      setDataSource("mock");
      setStatusMessage("API 응답을 사용할 수 없어 모의 데이터를 표시합니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRiskSnapshot();
  }, [loadRiskSnapshot]);

  return (
    <section className="panel">
      <h2>리스크 한장보기</h2>
      <p className="muted">자산군별 리스크 기여도와 요인 노출도를 확인합니다.</p>
      <p className="muted">데이터 출처: {dataSource === "api" ? "실데이터" : "모의 데이터"}</p>
      <p className={dataSource === "api" ? "success-text" : "error-text"}>{statusMessage}</p>
      <p className="muted" style={{ marginTop: 10 }}>
        연환산 변동성 {formatPercent(snapshot.volatility)} / 예상 최대 낙폭 {formatPercent(snapshot.expectedMaxDrawdown)}
      </p>
      <button
        type="button"
        className="primary-button"
        onClick={() => void loadRiskSnapshot()}
        disabled={isLoading}
        style={{ marginBottom: 12 }}
      >
        {isLoading ? "불러오는 중..." : "다시 불러오기"}
      </button>

      <div className="grid cols-2" style={{ marginTop: 12 }}>
        <div className="panel">
          <h3>리스크 기여도</h3>
          <ul className="muted" style={{ margin: 0, paddingLeft: 20 }}>
            {snapshot.contributions.map((item) => (
              <li key={`${item.symbol}-risk`}>
                {item.symbol}: {formatPercent(item.riskPercent)}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>요인 노출도</h3>
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
