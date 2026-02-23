export default function GoalOnboardingPage() {
  return (
    <section className="panel">
      <h2>목표 온보딩</h2>
      <p className="muted">목표 금액, 목표일, 월 적립금을 입력합니다.</p>
      <div className="grid cols-2" style={{ marginTop: 12 }}>
        <label>
          목표 금액(KRW)
          <input style={{ width: "100%", marginTop: 6 }} placeholder="100000000" />
        </label>
        <label>
          목표일
          <input type="date" style={{ width: "100%", marginTop: 6 }} />
        </label>
      </div>
    </section>
  );
}

