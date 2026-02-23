import Link from "next/link";

export default function HomePage() {
  return (
    <section className="panel">
      <h2>목표한푼 MVP 시작</h2>
      <p className="muted">
        온보딩에서 목표와 자산을 입력하고, 코치 대시보드에서 리스크와 목표달성 확률을 확인해보세요.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <Link href="/onboarding/goal">목표 온보딩</Link>
        <Link href="/coach">코치 보기</Link>
      </div>
    </section>
  );
}


