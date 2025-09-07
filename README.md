# 🏷️ Dead Stock Intelligence Platform

A **SaaS platform** that ingests **inventory, sales, returns, and cost data**, continuously scores SKUs for **dead-stock risk (rules + ML)**, alerts merchants, and recommends **financially optimized actions** (discounts, bundles, liquidation). The platform also provides a **simulation engine** and **financial dashboard** to monitor working capital and profit impact.

## ✨ Features

  - 🔍 **Real-time detection & alerts**: Rule + ML-based signals for “at-risk” and “dead” SKUs with Email, Slack, SMS, and Push alerts.
  - 💬 **Natural Language → SQL**: Ask plain-English queries (e.g., *“show items with zero sales in 120 days”*) and get safe, validated SQL.
  - 📊 **Insights & Recommendations**: Suggests discount %, bundles, supplier returns, or liquidation with **P\&L impact analysis**.
  - ⚙️ **Custom Rules**: Merchants can configure thresholds by **days, quantity, category, supplier**.
  - 📈 **Financial Dashboard**: KPIs: dead stock value, carrying costs, opportunity cost, inventory turns, working capital tied up.
  - 🔮 **Simulation Engine**: Run *“what-if”* scenarios — e.g., *apply 20% discount → projected sell-through & margin*.
  - 🔗 **Integrations**: Shopify, Magento, Amazon, ERP, POS, QuickBooks, Tally, and WMS connectors.

## 🏗️ Architecture

```mermaid
flowchart TD
    A[Invoice Image Upload] -->|OpenCV + Gemini| B[Data Extraction]
    B --> C[Supabase DB]
    C --> D[Backend API (FastAPI)]
    D --> E[ML Models (Risk Scoring, Forecasting)]
    D --> F[Business Rules Engine]
    E --> G[Recommendations Engine]
    F --> G
    G --> H[Financial Dashboard (Next.js + Tailwind)]
    G --> I[Alerts: Email/Slack/SMS]
```

## 🗄️ Database Schema

### Products

```sql
create table products (
  id bigserial primary key,
  sku text unique not null,
  name text,
  category text,
  supplier text,
  cost_price numeric,
  list_price numeric,
  created_at timestamptz default now()
);
```

### Inventory

```sql
create table inventory (
  id bigserial primary key,
  product_id bigint references products(id) on delete cascade,
  stock_on_hand int not null default 0,
  last_count_date timestamptz default now()
);
```

### Invoices

```sql
create table invoices (
  id bigserial primary key,
  file_url text,
  supplier text,
  uploaded_at timestamptz default now()
);
```

### Invoice Items

```sql
create table invoice_items (
  id bigserial primary key,
  invoice_id bigint references invoices(id) on delete cascade,
  product_sku text,
  qty int,
  unit_price numeric
);
```

## ⚡ Tech Stack

  * **Backend:** Python (FastAPI), PostgreSQL (Supabase), dbt/Airflow for ETL
  * **ML Models:** Logistic Regression, XGBoost/LightGBM, Prophet (forecasting)
  * **Frontend:** React / Next.js, Tailwind, Recharts
  * **Infra:** Docker, Kubernetes, GitHub Actions CI/CD
  * **Auth/Security:** Supabase Auth, OAuth2, RBAC, TLS, encryption at rest

## 🚀 Getting Started

### 1\. Clone repo

```bash
git clone https://github.com/<your-org>/deadstock-intelligence.git
cd deadstock-intelligence
```

### 2\. Configure environment

Create `.env` file:

```ini
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_KEY=<service-role-key>
DATABASE_URL=postgresql://postgres:<password>@db.<host>.supabase.co:5432/postgres
```

### 3\. Install dependencies

```bash
pip install -r requirements.txt
npm install --prefix frontend
```

### 4\. Run backend

```bash
uvicorn app.main:app --reload
```

### 5\. Run frontend

```bash
npm run dev --prefix frontend
```

## 📡 API Endpoints (Sample)

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/products` | List products |
| POST | `/invoices/upload` | Upload invoice & extract items |
| GET | `/inventory/at-risk` | Get at-risk SKUs with scores & insights |
| POST | `/query/nl-to-sql` | Convert natural language to SQL |
| GET | `/dashboard/financials` | Get KPIs & metrics for dashboard |

## 🧮 Example Query

Plain English: *Show items with zero sales in the last 120 days*

Generated SQL:

```sql
SELECT p.sku, p.name, i.stock_on_hand,
       MAX(o.order_date) AS last_sale_date,
       (i.stock_on_hand * p.cost_price) AS stock_value
FROM products p
JOIN inventory i ON i.product_id = p.id
LEFT JOIN orders o ON o.product_id = p.id
GROUP BY p.sku, p.name, i.stock_on_hand, p.cost_price
HAVING MAX(o.order_date) IS NULL OR MAX(o.order_date) < current_date - INTERVAL '120 days'
ORDER BY last_sale_date DESC NULLS FIRST;
```

## 📈 Roadmap

  * [x] MVP: deterministic rules, alerts, dashboard, NL→SQL (read-only)
  * [ ] ML risk scoring + recommendation engine
  * [ ] Simulation engine for actions (discounts, bundles, liquidation)
  * [ ] Automated workflows: create promos, supplier RMA integration
  * [ ] Multi-channel orchestration & advanced optimization

## 🤝 Contributing

1.  Fork the repo
2.  Create a feature branch (`git checkout -b feature-name`)
3.  Commit changes (`git commit -m 'Add feature'`)
4.  Push branch (`git push origin feature-name`)
5.  Open a Pull Request

## 📜 License

MIT License © 2025 — Open for use and contributions.

