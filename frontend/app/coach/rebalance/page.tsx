"use client";

import { useCallback, useEffect, useState } from "react";

type RebalanceAction = {
  symbol: string;
  actionType: string;
  amount: number;
};

type RebalanceProposal = {
  summary: string;
  actions: RebalanceAction[];
};

type RebalanceProposalResponse = {
  summary: string;
  actions: Array<{
    symbol: string;
    actionType: string;
    amount: string | number;
  }>;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8090";
const DEFAULT_USER_ID = 1;
const DEFAULT_PORTFOLIO_ID = 1;

const FALLBACK_PROPOSAL: RebalanceProposal = {
  summary: "목표 비중과 현재 비중의 편차를 기준으로 액션을 제안합니다.",
  actions: [
    { symbol: "BTC", actionType: "SELL", amount: 2_300_000 },
    { symbol: "KOSPI ETF", actionType: "BUY", amount: 1_100_000 },
    { symbol: "US ETF", actionType: "BUY", amount: 1_200_000 }
  ]
};

function toNumber(value: string | number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0
  }).format(amount);
}

async function createRebalanceProposal(): Promise<RebalanceProposal> {
  const response = await fetch(`${API_BASE}/api/v1/rebalance/proposals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-USER-ID": String(DEFAULT_USER_ID)
    },
    body: JSON.stringify({
      portfolioId: DEFAULT_PORTFOLIO_ID,
      thresholdPercent: 3
    })
  });

  if (!response.ok) {
    throw new Error("Failed to create rebalance proposal");
  }

  const payload = (await response.json()) as RebalanceProposalResponse;
  const actions = payload.actions?.map((item) => ({
    symbol: item.symbol,
    actionType: item.actionType,
    amount: toNumber(item.amount)
  }));

  if (!actions || actions.length === 0) {
    throw new Error("Rebalance actions are empty");
  }

  return {
    summary: payload.summary,
    actions
  };
}

export default function CoachRebalancePage() {
  const [proposal, setProposal] = useState<RebalanceProposal>(FALLBACK_PROPOSAL);
  const [dataSource, setDataSource] = useState<"api" | "mock">("mock");
  const [statusMessage, setStatusMessage] = useState("데이터를 불러오는 중입니다.");
  const [isLoading, setIsLoading] = useState(true);

  const loadRebalanceProposal = useCallback(async () => {
    setIsLoading(true);

    try {
      const nextProposal = await createRebalanceProposal();
      setProposal(nextProposal);
      setDataSource("api");
      setStatusMessage("실데이터를 불러왔습니다.");
    } catch {
      setProposal(FALLBACK_PROPOSAL);
      setDataSource("mock");
      setStatusMessage("API 응답을 사용할 수 없어 모의 데이터를 표시합니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRebalanceProposal();
  }, [loadRebalanceProposal]);

  return (
    <section className="panel">
      <h2>리밸런싱 제안</h2>
      <p className="muted">{proposal.summary}</p>
      <p className="muted">데이터 출처: {dataSource === "api" ? "실데이터" : "모의 데이터"}</p>
      <p className={dataSource === "api" ? "success-text" : "error-text"}>{statusMessage}</p>
      <button
        type="button"
        className="primary-button"
        onClick={() => void loadRebalanceProposal()}
        disabled={isLoading}
      >
        {isLoading ? "불러오는 중..." : "다시 불러오기"}
      </button>
      <ul className="muted" style={{ marginTop: 14 }}>
        {proposal.actions.map((action) => (
          <li key={`${action.symbol}-${action.actionType}`}>
            {action.symbol}: {action.actionType} {formatCurrency(action.amount)} KRW
          </li>
        ))}
      </ul>
    </section>
  );
}
