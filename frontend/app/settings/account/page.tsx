"use client";

import { FormEvent, useMemo, useState } from "react";
import { saveFormToMockStorage } from "@/lib/mockPersistence";

type AccountFormState = {
  email: string;
  provider: "KAKAO" | "NAVER" | "GOOGLE";
  twoFactorEnabled: boolean;
};

const INITIAL_STATE: AccountFormState = {
  email: "",
  provider: "KAKAO",
  twoFactorEnabled: false
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SettingsAccountPage() {
  const [form, setForm] = useState<AccountFormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const errors = useMemo(() => {
    const nextErrors: Partial<Record<keyof AccountFormState, string>> = {};
    if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = "올바른 이메일 주소를 입력해 주세요.";
    }
    return nextErrors;
  }, [form.email]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors) {
      setSubmissionMessage("입력값을 확인한 뒤 다시 시도해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage("");

    const isStored = await saveFormToMockStorage("settings-account-form", {
      email: form.email.trim(),
      provider: form.provider,
      twoFactorEnabled: form.twoFactorEnabled
    });

    setIsSubmitting(false);
    setSubmissionMessage(
      isStored
        ? "계정 설정이 저장되었습니다. (mock)"
        : "로컬 저장소를 사용할 수 없어 화면 상태에만 반영되었습니다. (mock)"
    );
  };

  return (
    <section className="panel">
      <h2>계정 설정</h2>
      <p className="muted">로그인 연결, 보안 설정, 데이터 내보내기를 관리합니다.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid cols-2" style={{ marginTop: 12 }}>
          <label>
            연결 이메일
            <input
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              placeholder="user@example.com"
              value={form.email}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, email: event.target.value }));
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "account-email-error" : undefined}
            />
            {errors.email ? (
              <p id="account-email-error" className="error-text">
                {errors.email}
              </p>
            ) : null}
          </label>

          <label>
            로그인 제공자
            <select
              className="form-input"
              style={{ width: "100%", marginTop: 6 }}
              value={form.provider}
              onChange={(event) => {
                const provider = event.target.value as AccountFormState["provider"];
                setForm((prev) => ({ ...prev, provider }));
              }}
            >
              <option value="KAKAO">KAKAO</option>
              <option value="NAVER">NAVER</option>
              <option value="GOOGLE">GOOGLE</option>
            </select>
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={form.twoFactorEnabled}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, twoFactorEnabled: event.target.checked }));
              }}
            />
            2단계 인증 사용
          </label>
        </div>

        <button type="submit" className="primary-button" disabled={hasErrors || isSubmitting}>
          {isSubmitting ? "저장 중..." : "계정 저장"}
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
