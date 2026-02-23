"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createRebalanceProposal } from "@/lib/api";
import { getCoachRequestContext } from "@/lib/coachContext";

type RebalanceAction = {
  symbol: string;
  actionType: string;
  amount: number;
};

type RebalanceProposal = {
  summary: string;
  actions: RebalanceAction[];
};

const FALLBACK_PROPOSAL: RebalanceProposal = {
  summary: "Suggested actions are calculated from target-vs-current allocation gaps.",
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

export default function CoachRebalancePage() {
  const requestContext = useMemo(() => getCoachRequestContext(), []);
  const [proposal, setProposal] = useState<RebalanceProposal>(FALLBACK_PROPOSAL);
  const [dataSource, setDataSource] = useState<"api" | "mock">("mock");
  const [statusMessage, setStatusMessage] = useState("Loading data.");
  const [isLoading, setIsLoading] = useState(true);

  const loadRebalanceProposal = useCallback(async () => {
    setIsLoading(true);

    try {
      const payload = await createRebalanceProposal(requestContext.userId, {
        portfolioId: requestContext.portfolioId,
        thresholdPercent: requestContext.thresholdPercent
      });
      const actions = payload.actions?.map((item) => ({
        symbol: item.symbol,
        actionType: item.actionType,
        amount: toNumber(item.amount)
      }));

      if (!actions || actions.length === 0) {
        throw new Error("Rebalance actions are empty");
      }

      setProposal({
        summary: payload.summary,
        actions
      });
      setDataSource("api");
      setStatusMessage("Loaded rebalance proposal from API.");
    } catch {
      setProposal(FALLBACK_PROPOSAL);
      setDataSource("mock");
      setStatusMessage("API unavailable. Showing fallback proposal.");
    } finally {
      setIsLoading(false);
    }
  }, [requestContext.portfolioId, requestContext.thresholdPercent, requestContext.userId]);

  useEffect(() => {
    void loadRebalanceProposal();
  }, [loadRebalanceProposal]);

  return (
    <section className="panel">
      <h2>Rebalance Proposal</h2>
      <p className="muted">{proposal.summary}</p>
      <p className="muted">Data source: {dataSource === "api" ? "API" : "Mock"}</p>
      <p className={dataSource === "api" ? "success-text" : "error-text"}>{statusMessage}</p>
      <button type="button" className="primary-button" onClick={() => void loadRebalanceProposal()} disabled={isLoading}>
        {isLoading ? "Loading..." : "Reload"}
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
