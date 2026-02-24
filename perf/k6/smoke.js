import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL ?? "http://127.0.0.1:8090";

export const options = {
  vus: 5,
  duration: "20s",
  thresholds: {
    http_req_failed: ["rate<0.05"],
    "http_req_duration{endpoint:risk_snapshot}": ["p(95)<500"],
    "http_req_duration{endpoint:simulation_runs}": ["p(95)<3000"],
    "http_req_duration{endpoint:coach_insights}": ["p(95)<1000"]
  }
};

const DEFAULT_HEADERS = {
  headers: {
    "X-USER-ID": "1",
    "Content-Type": "application/json"
  }
};

export default function () {
  const goalsResponse = http.get(`${BASE_URL}/api/v1/goals`, {
    tags: { endpoint: "goals_list" },
    headers: DEFAULT_HEADERS.headers
  });

  check(goalsResponse, {
    "goals endpoint responds with 200": (response) => response.status === 200
  });

  const riskResponse = http.get(`${BASE_URL}/api/v1/risk/snapshot?portfolioId=1`, {
    tags: { endpoint: "risk_snapshot" },
    headers: DEFAULT_HEADERS.headers
  });

  check(riskResponse, {
    "risk endpoint responds with 200 or 404": (response) => response.status === 200 || response.status === 404
  });

  const coachResponse = http.get(`${BASE_URL}/api/v1/coach/insights?goalId=1&portfolioId=1`, {
    tags: { endpoint: "coach_insights" },
    headers: DEFAULT_HEADERS.headers
  });

  check(coachResponse, {
    "coach endpoint responds with 200 or 404": (response) => response.status === 200 || response.status === 404
  });

  const simulationResponse = http.post(
    `${BASE_URL}/api/v1/simulation/runs`,
    JSON.stringify({
      goalId: 1,
      portfolioId: 1,
      scenarioCount: 1000,
      months: 36
    }),
    {
      tags: { endpoint: "simulation_runs" },
      ...DEFAULT_HEADERS
    }
  );

  check(simulationResponse, {
    "simulation endpoint responds with 200 or 404": (response) => response.status === 200 || response.status === 404
  });

  sleep(1);
}
