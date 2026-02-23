"use client";

import { FormEvent, useMemo, useState } from "react";

type PortfolioErrors = {
  symbol?: string;
  marketValue?: string;
  allocation?: string;
};

export default function PortfolioOnboardingPage() {
  const [symbol, setSymbol] = useState("");
  const [marketValue, setMarketValue] = useState("");
  const [allocation, setAllocation] = useState("");
  const [errors, setErrors] = useState<PortfolioErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateSymbol = (value: string) => {
    if (!value.trim()) return "자산 심볼을 입력해주세요.";
    if (value.trim().length < 2) return "자산 심볼은 2자 이상 입력해주세요.";
    return "";
  };

  const validateMarketValue = (value: string) => {
    const amount = Number(value);
    if (!value.trim()) return "시가 평가액을 입력해주세요.";
    if (!Number.isFinite(amount) || amount <= 0) return "시가 평가액은 0보다 큰 숫자여야 해요.";
    return "";
  };

  const validateAllocation = (value: string) => {
    const ratio = Number(value);
    if (!value.trim()) return "비중(%)을 입력해주세요.";
    if (!Number.isFinite(ratio) || ratio <= 0 || ratio > 100) {
      return "비중은 0보다 크고 100 이하로 입력해주세요.";
    }
    return "";
  };

  const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

  const validateAll = () => {
    const nextErrors: PortfolioErrors = {
      symbol: validateSymbol(symbol),
      marketValue: validateMarketValue(marketValue),
      allocation: validateAllocation(allocation),
    };
    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");

    if (!validateAll()) {
      setSubmitMessage("입력값을 확인한 뒤 다시 제출해주세요.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setSubmitMessage("자산 정보가 저장되었어요.");
  };

  return (
    <section className="panel">
      <h2>자산 온보딩</h2>
      <p className="muted">현재 보유한 자산과 비중을 입력합니다.</p>

      <form onSubmit={onSubmit} noValidate>
        <div className="grid cols-2" style={{ marginTop: 12 }}>
          <label>
            자산 심볼
            <input
              className={errors.symbol ? "field-error" : ""}
              style={{ width: "100%", marginTop: 6 }}
              placeholder="BTC / AAPL / 069500"
              value={symbol}
              onChange={(event) => {
                const value = event.target.value;
                setSymbol(value);
                setErrors((prev) => ({ ...prev, symbol: validateSymbol(value) }));
              }}
            />
            {errors.symbol ? <p className="error-text">{errors.symbol}</p> : null}
          </label>

          <label>
            시가 평가액(KRW)
            <input
              className={errors.marketValue ? "field-error" : ""}
              style={{ width: "100%", marginTop: 6 }}
              placeholder="15000000"
              inputMode="numeric"
              value={marketValue}
              onChange={(event) => {
                const value = event.target.value;
                setMarketValue(value);
                setErrors((prev) => ({ ...prev, marketValue: validateMarketValue(value) }));
              }}
            />
            {errors.marketValue ? <p className="error-text">{errors.marketValue}</p> : null}
          </label>
        </div>

        <label style={{ display: "block", marginTop: 16 }}>
          자산 비중(%)
          <input
            className={errors.allocation ? "field-error" : ""}
            style={{ width: "100%", marginTop: 6 }}
            placeholder="40"
            inputMode="decimal"
            value={allocation}
            onChange={(event) => {
              const value = event.target.value;
              setAllocation(value);
              setErrors((prev) => ({ ...prev, allocation: validateAllocation(value) }));
            }}
          />
          {errors.allocation ? <p className="error-text">{errors.allocation}</p> : null}
        </label>

        <button type="submit" className="primary-button" disabled={isSubmitting || hasErrors}>
          {isSubmitting ? "저장 중..." : "자산 저장"}
        </button>

        {submitMessage ? <p className={hasErrors ? "error-text" : "success-text"}>{submitMessage}</p> : null}
      </form>
    </section>
  );
}
