export default function CoachPage() {
  return (
    <section className="grid cols-2">
      <article className="panel">
        <h2>목표 진행률</h2>
        <p className="muted">현재 목표 달성률: 30%</p>
      </article>
      <article className="panel">
        <h2>코치 인사이트</h2>
        <ul className="muted">
          <li>고위험 자산 집중도를 낮추면 달성 확률이 상승합니다.</li>
          <li>월 적립금 10% 상향 시 목표 도달 시점이 단축됩니다.</li>
        </ul>
      </article>
    </section>
  );
}

