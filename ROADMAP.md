# Roadmap — Auto Email

Auto Email already offers text/PDF/TXT analysis, response generation, JWT-based accounts, and per-user history. The next phase should turn the demo workflow into a dependable email-assistance product.

## 1. Stabilize the core analysis flow

- Add request validation and consistent error responses for unsupported, empty, and unreadable uploads.
- Enforce file-size limits and process PDFs defensively to protect the API from costly or malformed inputs.
- Return structured AI output (classification, confidence, rationale, and optional draft) instead of relying on free-form model text.
- Save the generated classification and draft with each history record so results are reproducible.

## 2. Make AI behavior reliable and safe

- Move prompts and model configuration into versioned, testable configuration.
- Add timeouts, retries, rate limits, and clear fallback behavior when the inference provider is unavailable.
- Build an evaluation set of representative emails and track classification quality, latency, and cost.
- Add a review/edit step before any generated reply can be copied or sent; never enable autonomous sending by default.

## 3. Complete account and history features

- Add pagination, search, filters, and deletion to email history.
- Replace the long-lived access token with short-lived access tokens plus refresh-token rotation and logout/revocation.
- Implement password-reset and account-management flows, with audit-friendly security events.

## 4. Production readiness

- Add backend and frontend tests for authentication, uploads, inference failure paths, and history access control.
- Add database migrations, environment validation, health checks, and Docker Compose for the API, client, and MySQL.
- Configure CI for linting, tests, dependency auditing, and production builds; document deployment and secret management.
