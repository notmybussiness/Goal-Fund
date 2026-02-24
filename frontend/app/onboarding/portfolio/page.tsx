"use client";

import { FormEvent, useMemo, useState } from "react";
import { saveFormToMockStorage } from "@/lib/mockPersistence";

type PortfolioFormState = {
  symbol: string;
  marketValue: string;
};

const INITIAL_STATE: PortfolioFormState = {
  symbol: "",
  marketValue: "",
};

export default function PortfolioOnboardingPage() {
  const [form, setForm] = useState<PortfolioFormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const errors = useMemo(() => {
    const nextErrors: Partial<Record<keyof PortfolioFormState, string>> = {};
    const marketValue = Number(form.marketValue);

    if (!form.symbol.trim()) {
      nextErrors.symbol = "자산 심볼을 입력해 주세요.";
    } else if (!/^[A-Za-z0-9-]{2,12}$/.test(form.symbol.trim())) {
      nextErrors.symbol = "자산 심볼은 영문/숫자/하이픈 2~12자로 입력해 주세요.";
    }

    if (!form.marketValue.trim()) {
      nextErrors.marketValue = "시가 평가액을 입력해 주세요.";
    } else if (!Number.isInteger(marketValue) || marketValue <= 0) {
      nextErrors.marketValue = "시가 평가액은 0보다 큰 정수여야 합니다.";
    }

    return nextErrors;
  }, [form.marketValue, form.symbol]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors) {
      setSubmissionMessage("입력값을 확인한 뒤 다시 시도해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage("");

    const isStored = await saveFormToMockStorage("portfolio-onboarding-form", {
      symbol: form.symbol.trim().toUpperCase(),
      marketValue: form.marketValue
    });

    setIsSubmitting(false);
    setSubmissionMessage(
      isStored
        ? "보유 자산 정보가 저장되었습니다. (mock)"
        : "로컬 저장소를 사용할 수 없어 화면 상태에만 반영되었습니다. (mock)"
    );
  };

  return (
    <section className="panel">
      <h2>자산 온보딩</h2>
      <p className="muted">현재 보유한 자산과 비중을 입력합니다.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid cols-2" style={{ marginTop: 12 }}>
          <label>
            자산 심볼
            <input
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              placeholder="BTC / AAPL / 069500"
              value={form.symbol}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, symbol: event.target.value.toUpperCase() }));
              }}
              aria-invalid={Boolean(errors.symbol)}
              aria-describedby={errors.symbol ? "asset-symbol-error" : undefined}
            />
            {errors.symbol ? (
              <p id="asset-symbol-error" className="error-text">
                {errors.symbol}
              </p>
            ) : null}
          </label>
          <label>
            시가 평가액(KRW)
            <input
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              placeholder="15000000"
              value={form.marketValue}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, marketValue: event.target.value }));
              }}
              aria-invalid={Boolean(errors.marketValue)}
              aria-describedby={errors.marketValue ? "market-value-error" : undefined}
            />
            {errors.marketValue ? (
              <p id="market-value-error" className="error-text">
                {errors.marketValue}
              </p>
            ) : null}
          </label>
        </div>

        <button type="submit" className="primary-button" disabled={hasErrors || isSubmitting}>
          {isSubmitting ? "저장 중..." : "자산 저장"}
        </button>

        {submissionMessage ? (
          <p className={hasErrors ? "error-text" : "success-text"} style={{ marginTop: 10 }}>
            {submissionMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}
