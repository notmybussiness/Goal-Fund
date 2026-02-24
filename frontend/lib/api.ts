const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8090";

export interface GoalResponse {
  id: number;
  name: string;
  targetAmount: string;
  currentAmount: string;
  monthlyContribution: string;
  targetDate: string;
  status: "ACTIVE" | "COMPLETED" | "PAUSED";
  progressPercent: string;
}

export interface CoachInsightResponse {
  headline: string;
  cards: string[];
}

export interface RiskSnapshotResponse {
  volatility: number | string;
  expectedMaxDrawdown: number | string;
  contributions: Array<{
    symbol: string;
    riskPercent: number | string;
    factorExposureScore: number | string;
  }>;
}

export interface RebalanceProposalResponse {
  summary: string;
  actions: Array<{
    symbol: string;
    actionType: string;
    amount: string | number;
  }>;
}

export interface RebalanceProposalRequest {
  portfolioId: number;
  thresholdPercent: number;
}

export interface SimulationRunResponse {
  summary?: {
    successProbabilityPercent: number | string;
    p10Outcome: number | string;
    p50Outcome: number | string;
    p90Outcome: number | string;
  };
}

export interface SimulationRunRequest {
  goalId: number;
  portfolioId: number;
  scenarioCount: number;
  months: number;
}

function createUserHeaders(userId: number, withJsonBody = false): HeadersInit {
  const headers: Record<string, string> = {
    "X-USER-ID": String(userId)
  };

  if (withJsonBody) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

export async function getGoals(userId = 1): Promise<GoalResponse[]> {
  const response = await fetch(`${API_BASE}/api/v1/goals`, {
    headers: createUserHeaders(userId),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch goals");
  }

  return response.json() as Promise<GoalResponse[]>;
}

export async function getCoachInsights(
  userId: number,
  goalId: number,
  portfolioId: number
): Promise<CoachInsightResponse> {
  const query = new URLSearchParams({
    goalId: String(goalId),
    portfolioId: String(portfolioId)
  });

  const response = await fetch(`${API_BASE}/api/v1/coach/insights?${query.toString()}`, {
    headers: createUserHeaders(userId),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch coach insights");
  }

  return response.json() as Promise<CoachInsightResponse>;
}

export async function getRiskSnapshot(userId: number, portfolioId: number): Promise<RiskSnapshotResponse> {
  const query = new URLSearchParams({
    portfolioId: String(portfolioId)
  });

  const response = await fetch(`${API_BASE}/api/v1/risk/snapshot?${query.toString()}`, {
    headers: createUserHeaders(userId),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch risk snapshot");
  }

  return response.json() as Promise<RiskSnapshotResponse>;
}

export async function createRebalanceProposal(
  userId: number,
  payload: RebalanceProposalRequest
): Promise<RebalanceProposalResponse> {
  const response = await fetch(`${API_BASE}/api/v1/rebalance/proposals`, {
    method: "POST",
    headers: createUserHeaders(userId, true),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create rebalance proposal");
  }

  return response.json() as Promise<RebalanceProposalResponse>;
}

export async function createSimulationRun(
  userId: number,
  payload: SimulationRunRequest
): Promise<SimulationRunResponse> {
  const response = await fetch(`${API_BASE}/api/v1/simulation/runs`, {
    method: "POST",
    headers: createUserHeaders(userId, true),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create simulation run");
  }

  return response.json() as Promise<SimulationRunResponse>;
}
