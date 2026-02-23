# Acceptance Criteria

문서 버전: v1.0  
작성일: 2026-02-23

## 1. Domain Test Scenarios

1. 목표 진행률 계산
- Given: 목표금액 100,000,000 / 현재자산 30,000,000 / 월적립 1,000,000
- Expect: 진행률 30%

2. 리스크 기여도 합
- Given: 기여도 목록
- Expect: 총합 100% (허용 오차 0.01)

3. 시뮬레이션 확률 범위
- Given: n회 시뮬레이션
- Expect: 0 <= 성공확률 <= 100

4. 리밸런싱 액션 일관성
- Given: 제안 액션 목록
- Expect: 매수/매도 후 목표 비중 오차가 정책 임계값 이내

## 2. API Integration Scenarios

1. Goal CRUD 권한 검증
2. Portfolio-Holding 참조 무결성 검증
3. Simulation run 생성/조회 일관성 검증
4. Batch 실행 후 스냅샷 API 반영 확인

## 3. E2E Scenarios

1. 온보딩 완료 -> 코치 진입
2. 목표 달성 확률 계산 성공
3. 리밸런싱 제안 생성/조회
4. 로그아웃/재로그인 후 상태 복원

## 4. Performance Criteria

1. Simulation API p95 <= 3s
2. Risk Snapshot API p95 <= 500ms
3. 배치 실패 복구 성공률 100% (7연속 실행)

