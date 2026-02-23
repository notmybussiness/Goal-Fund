# 목표한푼 MVP Definition

문서 버전: v1.1  
작성일: 2026-02-23

## 1. MVP Scope

### Core Feature 6

1. Goal Management
2. Portfolio Input and Holdings
3. Risk One-Page Snapshot
4. Monte Carlo Goal Probability
5. Rebalancing Proposal
6. Coach Insight Cards

### Out of Scope

1. AI/RAG Deep Analysis
2. Full Backtest Integration
3. Broker Order Execution

## 2. MVP User Stories

1. 사용자는 목표 금액/기한을 등록할 수 있다.
2. 사용자는 보유 자산과 비중을 입력/수정할 수 있다.
3. 사용자는 리스크 기여도와 집중 요인을 확인할 수 있다.
4. 사용자는 목표달성 확률을 계산할 수 있다.
5. 사용자는 리밸런싱 제안을 생성/조회할 수 있다.
6. 사용자는 코치 인사이트 카드를 확인할 수 있다.

## 3. Release Readiness Checklist

1. Core API contract freeze
2. Core domain tests all green
3. E2E critical scenarios pass
4. Batch jobs run daily without failure
5. Monitoring and error alert connected

## 4. KPI Dashboard

1. Goal creation completion ratio
2. Simulation completion ratio
3. Active weekly users
4. Simulation API p95
5. Batch success ratio
