import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import SettingsProfilePage from "./page";

describe("SettingsProfilePage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("validates display name length", async () => {
    const user = userEvent.setup();

    render(<SettingsProfilePage />);

    await user.type(screen.getByLabelText(/^표시 이름/), "A");
    await user.click(screen.getByRole("button", { name: /프로필 저장/ }));

    expect(screen.getByText("표시 이름은 2자 이상 20자 이하로 입력해 주세요.")).toBeInTheDocument();
  });

  it("stores profile settings in mock storage", async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(<SettingsProfilePage />);

    await user.type(screen.getByLabelText(/^표시 이름/), "홍길동");
    await user.selectOptions(screen.getByLabelText(/^위험 성향/), "AGGRESSIVE");
    await user.selectOptions(screen.getByLabelText(/^기본 통화/), "USD");
    await user.click(screen.getByRole("button", { name: /프로필 저장/ }));

    expect(
      await screen.findByText("프로필 설정이 저장되었습니다. (mock)", {}, { timeout: 2000 })
    ).toBeInTheDocument();
    expect(setItemSpy).toHaveBeenCalledWith(
      "settings-profile-form",
      expect.stringContaining('"displayName":"홍길동"')
    );
  });
});
