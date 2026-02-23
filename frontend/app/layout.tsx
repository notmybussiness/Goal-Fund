import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "목표한푼",
  description: "목표 기반 포트폴리오 리스크 설계"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <div className="container" style={{ paddingTop: 20, paddingBottom: 40 }}>
          <h1 style={{ marginBottom: 8 }}>목표한푼</h1>
          <p className="muted" style={{ marginTop: 0, marginBottom: 20 }}>
            목표달성 중심 포트폴리오 코치
          </p>
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}


