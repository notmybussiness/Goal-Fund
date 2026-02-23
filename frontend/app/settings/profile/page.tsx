"use client";

import { FormEvent, useMemo, useState } from "react";
import { saveFormToMockStorage } from "@/lib/mockPersistence";

type ProfileFormState = {
  displayName: string;
  riskPreference: "CONSERVATIVE" | "BALANCED" | "AGGRESSIVE";
  baseCurrency: "KRW" | "USD";
};

const INITIAL_STATE: ProfileFormState = {
  displayName: "",
  riskPreference: "BALANCED",
  baseCurrency: "KRW"
};

export default function SettingsProfilePage() {
  const [form, setForm] = useState<ProfileFormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const errors = useMemo(() => {
    const nextErrors: Partial<Record<keyof ProfileFormState, string>> = {};
    const nameLength = form.displayName.trim().length;

    if (nameLength < 2 || nameLength > 20) {
      nextErrors.displayName = "표시 이름은 2자 이상 20자 이하로 입력해 주세요.";
    }

    return nextErrors;
  }, [form.displayName]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors) {
      setSubmissionMessage("입력값을 확인한 뒤 다시 시도해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage("");

    const isStored = await saveFormToMockStorage("settings-profile-form", {
      displayName: form.displayName.trim(),
      riskPreference: form.riskPreference,
      baseCurrency: form.baseCurrency
    });

    setIsSubmitting(false);
    setSubmissionMessage(
      isStored
        ? "프로필 설정이 저장되었습니다. (mock)"
        : "로컬 저장소를 사용할 수 없어 화면 상태에만 반영되었습니다. (mock)"
    );
  };

  return (
    <section className="panel">
      <h2>프로필 설정</h2>
      <p className="muted">표시 이름, 위험 성향, 기본 통화를 설정합니다.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid cols-2" style={{ marginTop: 12 }}>
          <label>
            표시 이름
            <input
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              placeholder="홍길동"
              value={form.displayName}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, displayName: event.target.value }));
              }}
              aria-invalid={Boolean(errors.displayName)}
              aria-describedby={errors.displayName ? "display-name-error" : undefined}
            />
            {errors.displayName ? (
              <p id="display-name-error" className="error-text">
                {errors.displayName}
              </p>
            ) : null}
          </label>

          <label>
            위험 성향
            <select
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              value={form.riskPreference}
              onChange={(event) => {
                const riskPreference = event.target.value as ProfileFormState["riskPreference"];
                setForm((prev) => ({ ...prev, riskPreference }));
              }}
            >
              <option value="CONSERVATIVE">안정형</option>
              <option value="BALANCED">균형형</option>
              <option value="AGGRESSIVE">공격형</option>
            </select>
          </label>
        </div>

        <div style={{ marginTop: 12, maxWidth: 420 }}>
          <label>
            기본 통화
            <select
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              value={form.baseCurrency}
              onChange={(event) => {
                const baseCurrency = event.target.value as ProfileFormState["baseCurrency"];
                setForm((prev) => ({ ...prev, baseCurrency }));
              }}
            >
              <option value="KRW">KRW</option>
              <option value="USD">USD</option>
            </select>
          </label>
        </div>

        <button type="submit" className="primary-button" disabled={hasErrors || isSubmitting}>
          {isSubmitting ? "저장 중..." : "프로필 저장"}
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
