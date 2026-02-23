import Link from "next/link";

const items = [
  { href: "/onboarding/goal", label: "목표 온보딩" },
  { href: "/onboarding/portfolio", label: "자산 온보딩" },
  { href: "/coach", label: "코치 홈" },
  { href: "/coach/risk", label: "리스크 한장보기" },
  { href: "/coach/simulation", label: "목표 달성 확률" },
  { href: "/coach/rebalance", label: "리밸런싱 제안" },
  { href: "/settings/profile", label: "프로필 설정" },
  { href: "/settings/account", label: "계정 설정" }
];

export function Nav() {
  return (
    <nav className="panel" style={{ marginBottom: 16 }}>
      <div className="grid cols-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="muted">
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

