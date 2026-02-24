"use client";

import { FormEvent, useMemo, useState } from "react";
import { saveFormToMockStorage } from "@/lib/mockPersistence";

type GoalFormState = {
  targetAmount: string;
  targetDate: string;
  monthlySavings: string;
};

const INITIAL_STATE: GoalFormState = {
  targetAmount: "",
  targetDate: "",
  monthlySavings: "",
};

export default function GoalOnboardingPage() {
  const [form, setForm] = useState<GoalFormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const errors = useMemo(() => {
    const nextErrors: Partial<Record<keyof GoalFormState, string>> = {};
    const amount = Number(form.targetAmount);
    const monthly = Number(form.monthlySavings);

    if (!form.targetAmount.trim()) {
      nextErrors.targetAmount = "목표 금액을 입력해 주세요.";
    } else if (!Number.isInteger(amount) || amount <= 0) {
      nextErrors.targetAmount = "목표 금액은 0보다 큰 정수여야 합니다.";
    }

    if (!form.targetDate) {
      nextErrors.targetDate = "목표일을 선택해 주세요.";
    } else {
      const selectedDate = new Date(`${form.targetDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        nextErrors.targetDate = "목표일은 오늘 이후 날짜로 설정해 주세요.";
      }
    }

    if (!form.monthlySavings.trim()) {
      nextErrors.monthlySavings = "월 적립금을 입력해 주세요.";
    } else if (!Number.isInteger(monthly) || monthly <= 0) {
      nextErrors.monthlySavings = "월 적립금은 0보다 큰 정수여야 합니다.";
    } else if (Number.isInteger(amount) && amount > 0 && monthly > amount) {
      nextErrors.monthlySavings = "월 적립금은 목표 금액보다 클 수 없습니다.";
    }

    return nextErrors;
  }, [form.monthlySavings, form.targetAmount, form.targetDate]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors) {
      setSubmissionMessage("입력값을 확인한 뒤 다시 시도해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage("");

    const isStored = await saveFormToMockStorage("goal-onboarding-form", {
      targetAmount: form.targetAmount,
      targetDate: form.targetDate,
      monthlySavings: form.monthlySavings
    });

    setIsSubmitting(false);
    setSubmissionMessage(
      isStored
        ? "목표 정보가 저장되었습니다. (mock)"
        : "로컬 저장소를 사용할 수 없어 화면 상태에만 반영되었습니다. (mock)"
    );
  };

  return (
    <section className="panel">
      <h2>목표 온보딩</h2>
      <p className="muted">목표 금액, 목표일, 월 적립금을 입력합니다.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid cols-2" style={{ marginTop: 12 }}>
          <label>
            목표 금액(KRW)
            <input
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              placeholder="100000000"
              value={form.targetAmount}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, targetAmount: event.target.value }));
              }}
              aria-invalid={Boolean(errors.targetAmount)}
              aria-describedby={errors.targetAmount ? "target-amount-error" : undefined}
            />
            {errors.targetAmount ? (
              <p id="target-amount-error" className="error-text">
                {errors.targetAmount}
              </p>
            ) : null}
          </label>
          <label>
            목표일
            <input
              type="date"
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              value={form.targetDate}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, targetDate: event.target.value }));
              }}
              aria-invalid={Boolean(errors.targetDate)}
              aria-describedby={errors.targetDate ? "target-date-error" : undefined}
            />
            {errors.targetDate ? (
              <p id="target-date-error" className="error-text">
                {errors.targetDate}
              </p>
            ) : null}
          </label>
        </div>

        <div style={{ marginTop: 12, maxWidth: 420 }}>
          <label>
            월 적립금(KRW)
            <input
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              placeholder="1200000"
              value={form.monthlySavings}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, monthlySavings: event.target.value }));
              }}
              aria-invalid={Boolean(errors.monthlySavings)}
              aria-describedby={errors.monthlySavings ? "monthly-savings-error" : undefined}
            />
            {errors.monthlySavings ? (
              <p id="monthly-savings-error" className="error-text">
                {errors.monthlySavings}
              </p>
            ) : null}
          </label>
        </div>

        <button type="submit" className="primary-button" disabled={hasErrors || isSubmitting}>
          {isSubmitting ? "저장 중..." : "목표 저장"}
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
