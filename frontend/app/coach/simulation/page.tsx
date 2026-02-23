export default function CoachSimulationPage() {
  return (
    <section className="panel">
      <h2>목표 달성 확률</h2>
      <p className="muted">몬테카를로 시뮬레이션 기반 결과를 표시합니다.</p>
      <div className="grid cols-2" style={{ marginTop: 12 }}>
        <div className="panel">
          <h3>성공 확률</h3>
          <p style={{ fontSize: 28, margin: 0 }}>67.2%</p>
        </div>
        <div className="panel">
          <h3>Outcome Range</h3>
          <p className="muted">P10: 78M / P50: 105M / P90: 142M</p>
        </div>
      </div>
    </section>
  );
}

