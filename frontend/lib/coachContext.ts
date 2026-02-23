export interface CoachRequestContext {
  userId: number;
  goalId: number;
  portfolioId: number;
  thresholdPercent: number;
  scenarioCount: number;
  months: number;
}

export const DEFAULT_COACH_REQUEST_CONTEXT: CoachRequestContext = {
  userId: 1,
  goalId: 1,
  portfolioId: 1,
  thresholdPercent: 3,
  scenarioCount: 1000,
  months: 36
};

function parseNumberParam(
  params: URLSearchParams,
  key: string,
  fallback: number,
  options: {
    min?: number;
    integer?: boolean;
  } = {}
): number {
  const raw = params.get(key);
  if (raw === null || raw.trim() === "") {
    return fallback;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  if (options.integer && !Number.isInteger(parsed)) {
    return fallback;
  }

  if (options.min !== undefined && parsed < options.min) {
    return fallback;
  }

  return parsed;
}

export function getCoachRequestContext(search?: string): CoachRequestContext {
  const resolvedSearch = search ?? (typeof window === "undefined" ? "" : window.location.search);
  const params = new URLSearchParams(resolvedSearch);

  return {
    userId: parseNumberParam(params, "userId", DEFAULT_COACH_REQUEST_CONTEXT.userId, {
      min: 1,
      integer: true
    }),
    goalId: parseNumberParam(params, "goalId", DEFAULT_COACH_REQUEST_CONTEXT.goalId, {
      min: 1,
      integer: true
    }),
    portfolioId: parseNumberParam(params, "portfolioId", DEFAULT_COACH_REQUEST_CONTEXT.portfolioId, {
      min: 1,
      integer: true
    }),
    thresholdPercent: parseNumberParam(
      params,
      "thresholdPercent",
      DEFAULT_COACH_REQUEST_CONTEXT.thresholdPercent,
      { min: 0 }
    ),
    scenarioCount: parseNumberParam(params, "scenarioCount", DEFAULT_COACH_REQUEST_CONTEXT.scenarioCount, {
      min: 1,
      integer: true
    }),
    months: parseNumberParam(params, "months", DEFAULT_COACH_REQUEST_CONTEXT.months, {
      min: 1,
      integer: true
    })
  };
}
