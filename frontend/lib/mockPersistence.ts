const MOCK_DELAY_MS = 300;

export async function saveFormToMockStorage(
  storageKey: string,
  payload: Record<string, string | number | boolean>
): Promise<boolean> {
  await new Promise((resolve) => {
    setTimeout(resolve, MOCK_DELAY_MS);
  });

  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        ...payload,
        savedAt: new Date().toISOString()
      })
    );
    return true;
  } catch {
    return false;
  }
}
