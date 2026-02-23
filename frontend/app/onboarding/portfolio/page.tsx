export default function PortfolioOnboardingPage() {
  return (
    <section className="panel">
      <h2>자산 온보딩</h2>
      <p className="muted">현재 보유한 자산과 비중을 입력합니다.</p>
      <div className="grid cols-2" style={{ marginTop: 12 }}>
        <label>
          자산 심볼
          <input style={{ width: "100%", marginTop: 6 }} placeholder="BTC / AAPL / 069500" />
        </label>
        <label>
          시가 평가액(KRW)
          <input style={{ width: "100%", marginTop: 6 }} placeholder="15000000" />
        </label>
      </div>
    </section>
  );
}

