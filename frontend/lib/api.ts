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

export async function getGoals(userId = 1): Promise<GoalResponse[]> {
  const response = await fetch(`${API_BASE}/api/v1/goals`, {
    headers: { "X-USER-ID": String(userId) },
    cache: "no-store"
  });
  if (!response.ok) {
    throw new Error("Failed to fetch goals");
  }
  return response.json();
}

