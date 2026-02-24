# Docker VM Deployment Guide

Document version: v1.1
Date: 2026-02-23

## 1. Target Topology

1. VM-1: reverse proxy + frontend
2. VM-2: backend app
3. VM-3: postgres + redis (or managed equivalent)

## 2. Runtime Components

1. `goal-fund-frontend` (Next.js)
2. `goal-fund-backend` (Spring Boot)
3. `postgres`
4. `redis`

## 3. Required Environment Variables

Backend:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `CORS_ALLOWED_ORIGINS`

Frontend:
- `NEXT_PUBLIC_API_URL`

## 4. Deploy Steps

1. Build images
2. Push images to registry
3. Pull images on VM
4. Run DB migration
5. Bring up services
6. Run health checks

## 5. Health Check Endpoints

1. `/actuator/health` (backend)
2. `/api/v1/coach/insights` smoke request

## 6. Rollback

1. Roll back to previous image tag.
2. Apply DB rollback script only if schema migration was included.

## 7. Operations Checklist

1. Confirm logs are collected and searchable.
2. Confirm scheduled batch jobs run successfully.
3. Check API p95 latency targets.
4. Verify auth and permission flow in production.

## 8. MVP Release Checklist

1. Required checks green on release PR:
   - `backend-test`
   - `backend-build`
   - `frontend-lint`
   - `frontend-build`
   - `frontend-e2e`
   - `perf-smoke`
   - `tdd-evidence-check`
2. E2E command proof attached:
   - `npm run test:e2e` (frontend)
3. Perf smoke proof attached:
   - `k6 run perf/k6/smoke.js`
4. Batch scheduler verified:
   - cron properties are set in `backend/src/main/resources/application.yml`
   - scheduler bean is active in runtime logs
5. Release notes and tag prepared before merge to `main`.
