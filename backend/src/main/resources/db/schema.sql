create table if not exists users (
    id bigserial primary key,
    email varchar(255) not null unique,
    display_name varchar(120) not null,
    created_at timestamptz not null default now()
);

create table if not exists auth_identities (
    id bigserial primary key,
    user_id bigint not null references users(id),
    provider varchar(40) not null,
    provider_user_id varchar(255) not null,
    created_at timestamptz not null default now(),
    unique (provider, provider_user_id)
);

create table if not exists goals (
    id bigserial primary key,
    user_id bigint not null references users(id),
    name varchar(120) not null,
    target_amount numeric(19,4) not null,
    current_amount numeric(19,4) not null,
    monthly_contribution numeric(19,4) not null,
    target_date date not null,
    status varchar(20) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists goal_contributions (
    id bigserial primary key,
    goal_id bigint not null references goals(id),
    amount numeric(19,4) not null,
    contributed_at timestamptz not null default now()
);

create table if not exists portfolios (
    id bigserial primary key,
    user_id bigint not null references users(id),
    name varchar(120) not null,
    base_currency varchar(12) not null default 'KRW',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists portfolio_holdings (
    id bigserial primary key,
    portfolio_id bigint not null references portfolios(id),
    symbol varchar(32) not null,
    asset_type varchar(20) not null,
    quantity numeric(19,8) not null,
    market_value numeric(19,4) not null,
    weight_percent numeric(7,4) not null,
    unique (portfolio_id, symbol)
);

create table if not exists asset_prices_daily (
    id bigserial primary key,
    symbol varchar(32) not null,
    trading_date date not null,
    close_price numeric(19,4) not null,
    volume numeric(19,4),
    created_at timestamptz not null default now(),
    unique (symbol, trading_date)
);

create table if not exists risk_snapshots (
    id bigserial primary key,
    portfolio_id bigint not null references portfolios(id),
    snapshot_at timestamptz not null,
    volatility numeric(7,4) not null,
    expected_max_drawdown numeric(7,4) not null
);

create table if not exists risk_contributions (
    id bigserial primary key,
    risk_snapshot_id bigint not null references risk_snapshots(id),
    symbol varchar(32) not null,
    risk_percent numeric(7,4) not null,
    factor_exposure_score numeric(7,4) not null
);

create table if not exists simulation_runs (
    id uuid primary key,
    goal_id bigint not null references goals(id),
    portfolio_id bigint not null references portfolios(id),
    scenario_count integer not null,
    status varchar(20) not null,
    created_at timestamptz not null default now()
);

create table if not exists simulation_summaries (
    simulation_run_id uuid primary key references simulation_runs(id),
    success_probability numeric(7,4) not null,
    p10_outcome numeric(19,4) not null,
    p50_outcome numeric(19,4) not null,
    p90_outcome numeric(19,4) not null
);

create table if not exists rebalance_policies (
    id bigserial primary key,
    portfolio_id bigint not null references portfolios(id),
    policy_name varchar(60) not null,
    threshold_percent numeric(7,4) not null,
    created_at timestamptz not null default now()
);

create table if not exists rebalance_proposals (
    id uuid primary key,
    portfolio_id bigint not null references portfolios(id),
    summary varchar(255) not null,
    created_at timestamptz not null default now()
);

create table if not exists rebalance_actions (
    id bigserial primary key,
    proposal_id uuid not null references rebalance_proposals(id),
    symbol varchar(32) not null,
    action_type varchar(16) not null,
    amount numeric(19,4) not null
);

create table if not exists batch_job_runs (
    id bigserial primary key,
    job_name varchar(120) not null,
    status varchar(20) not null,
    started_at timestamptz not null,
    finished_at timestamptz,
    message text
);

create table if not exists batch_cursors (
    id bigserial primary key,
    job_name varchar(120) not null,
    cursor_key varchar(120) not null,
    cursor_value varchar(255) not null,
    updated_at timestamptz not null default now(),
    unique (job_name, cursor_key)
);

