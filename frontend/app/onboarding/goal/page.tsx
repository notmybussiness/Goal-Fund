"use client";

import { FormEvent, useMemo, useState } from "react";

type GoalErrors = {
  targetAmount?: string;
  targetDate?: string;
  monthlySaving?: string;
};

const getLocalDateString = () => {
  const now = new Date();
  const timezoneOffsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - timezoneOffsetMs).toISOString().split("T")[0];
};

const TODAY = getLocalDateString();

export default function GoalOnboardingPage() {
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [monthlySaving, setMonthlySaving] = useState("");
  const [errors, setErrors] = useState<GoalErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateTargetAmount = (value: string) => {
    const amount = Number(value);
    if (!value.trim()) return "목표 금액을 입력해주세요.";
    if (!Number.isFinite(amount) || amount <= 0) return "목표 금액은 0보다 큰 숫자여야 해요.";
    return "";
  };

  const validateTargetDate = (value: string) => {
    if (!value) return "목표일을 선택해주세요.";
    if (value <= TODAY) return "목표일은 오늘 이후 날짜로 선택해주세요.";
    return "";
  };

  const validateMonthlySaving = (value: string) => {
    const monthly = Number(value);
    if (!value.trim()) return "월 적립금을 입력해주세요.";
    if (!Number.isFinite(monthly) || monthly <= 0) return "월 적립금은 0보다 큰 숫자여야 해요.";
    if (Number(monthly) > Number(targetAmount || 0)) {
      return "월 적립금은 목표 금액보다 클 수 없어요.";
    }
    return "";
  };

  const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

  const validateAll = () => {
    const nextErrors: GoalErrors = {
      targetAmount: validateTargetAmount(targetAmount),
      targetDate: validateTargetDate(targetDate),
      monthlySaving: validateMonthlySaving(monthlySaving),
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
    setSubmitMessage("목표 정보가 저장되었어요.");
  };

  return (
    <section className="panel">
      <h2>목표 온보딩</h2>
      <p className="muted">목표 금액, 목표일, 월 적립금을 입력합니다.</p>

      <form onSubmit={onSubmit} noValidate>
        <div className="grid cols-2" style={{ marginTop: 12 }}>
          <label>
            목표 금액(KRW)
            <input
              className={errors.targetAmount ? "field-error" : ""}
              style={{ width: "100%", marginTop: 6 }}
              placeholder="100000000"
              inputMode="numeric"
              value={targetAmount}
              onChange={(event) => {
                const value = event.target.value;
                setTargetAmount(value);
                setErrors((prev) => ({
                  ...prev,
                  targetAmount: validateTargetAmount(value),
                  monthlySaving: monthlySaving ? validateMonthlySaving(monthlySaving) : prev.monthlySaving,
                }));
              }}
            />
            {errors.targetAmount ? <p className="error-text">{errors.targetAmount}</p> : null}
          </label>

          <label>
            목표일
            <input
              className={errors.targetDate ? "field-error" : ""}
              type="date"
              style={{ width: "100%", marginTop: 6 }}
              value={targetDate}
              onChange={(event) => {
                const value = event.target.value;
                setTargetDate(value);
                setErrors((prev) => ({ ...prev, targetDate: validateTargetDate(value) }));
              }}
            />
            {errors.targetDate ? <p className="error-text">{errors.targetDate}</p> : null}
          </label>
        </div>

        <label style={{ display: "block", marginTop: 16 }}>
          월 적립금(KRW)
          <input
            className={errors.monthlySaving ? "field-error" : ""}
            style={{ width: "100%", marginTop: 6 }}
            placeholder="500000"
            inputMode="numeric"
            value={monthlySaving}
            onChange={(event) => {
              const value = event.target.value;
              setMonthlySaving(value);
              setErrors((prev) => ({ ...prev, monthlySaving: validateMonthlySaving(value) }));
            }}
          />
          {errors.monthlySaving ? <p className="error-text">{errors.monthlySaving}</p> : null}
        </label>

        <button type="submit" className="primary-button" disabled={isSubmitting || hasErrors}>
          {isSubmitting ? "저장 중..." : "목표 저장"}
        </button>

        {submitMessage ? <p className={hasErrors ? "error-text" : "success-text"}>{submitMessage}</p> : null}
      </form>
    </section>
  );
}
