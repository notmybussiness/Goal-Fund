import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import SettingsAccountPage from "./page";

describe("SettingsAccountPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();

    render(<SettingsAccountPage />);

    await user.type(screen.getByLabelText(/^연결 이메일/), "wrong-email");
    await user.click(screen.getByRole("button", { name: /계정 저장/ }));

    expect(screen.getByText("올바른 이메일 주소를 입력해 주세요.")).toBeInTheDocument();
  });

  it("stores account settings in mock storage", async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(<SettingsAccountPage />);

    await user.type(screen.getByLabelText(/^연결 이메일/), "user@example.com");
    await user.selectOptions(screen.getByLabelText(/^로그인 제공자/), "GOOGLE");
    await user.click(screen.getByLabelText(/^2단계 인증 사용/));
    await user.click(screen.getByRole("button", { name: /계정 저장/ }));

    expect(
      await screen.findByText("계정 설정이 저장되었습니다. (mock)", {}, { timeout: 2000 })
    ).toBeInTheDocument();
    expect(setItemSpy).toHaveBeenCalledWith(
      "settings-account-form",
      expect.stringContaining('"email":"user@example.com"')
    );
  });
});
