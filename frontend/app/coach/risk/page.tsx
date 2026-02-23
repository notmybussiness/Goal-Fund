export default function CoachRiskPage() {
  return (
    <section className="panel">
      <h2>리스크 한장보기</h2>
      <p className="muted">자산군별 리스크 기여도와 요인 노출도를 확인합니다.</p>
      <div className="grid cols-2" style={{ marginTop: 12 }}>
        <div className="panel">
          <h3>리스크 기여도</h3>
          <p className="muted">BTC 45%, US-TECH 30%, KOSPI ETF 25%</p>
        </div>
        <div className="panel">
          <h3>요인 노출도</h3>
          <p className="muted">주식시장 68, 금리 41, 인플레 57</p>
        </div>
      </div>
    </section>
  );
}

