1. 🚦 Smoke Testing
Purpose: Sanity check — is the API alive and its core endpoints functional?
🛠 Tools & Sites:

Postman CLI

Newman

k6 – script-based CLI tool for testing

CI tools: GitHub Actions, CircleCI, GitLab CI

2. 🧪 Functional Testing
Purpose: Ensure API returns correct data per business rules.
Advanced Concepts: Contract testing, BDD
🛠 Tools & Sites:

Postman

REST Assured (Java)

Supertest (Node.js)

Karate DSL

Pact – Contract testing

Dredd – OpenAPI contract validator

3. 🔗 Integration Testing
Purpose: Validate interaction between services (DB, queues, services).
🛠 Tools & Sites:

Docker Compose

WireMock – Stub/mocking service

Nock – HTTP mocking for Node.js

TestContainers – Run real DB/services during tests

4. 🔁 Regression Testing
Purpose: Ensure new code doesn’t break old functionality.
🛠 Tools & Sites:

Snapshot Testing in Jest

BackstopJS – visual regression

GitHub Actions for automating regression pipelines

5. 📊 Load Testing
Purpose: Test performance under expected traffic.
🛠 Tools & Sites:

Apache JMeter

k6 – Modern developer-friendly load tool

Artillery

Locust – Python-based

Gatling

Grafana + Prometheus – metrics dashboard

6. 💥 Stress Testing
Purpose: Push the system beyond expected capacity
🛠 Tools & Sites:

k6

Gremlin – Chaos-as-a-Service

Chaos Monkey – Netflix tool

Simian Army (includes Chaos Monkey)

7. 🔐 Security Testing
Purpose: Uncover vulnerabilities, misconfigurations
🛠 Tools & Sites:

OWASP ZAP

Burp Suite

Postman Security Scanner

Nuclei by Project Discovery

8. 🧑‍💻 UI/API Interaction Testing
Purpose: Validate frontend/backend coordination
🛠 Tools & Sites:

Cypress

Playwright

Selenium

Browser DevTools (Network tab → inspect API calls)

9. 🧨 Fuzz Testing
Purpose: Feed malformed, random data to detect crashes
🛠 Tools & Sites:

RESTler

fuzzapi

FuzzerJS

Boofuzz

10. 📈 Reliability Testing
Purpose: Ensure long-term stability under real-world loads
🛠 Tools & Sites:

k6

Artillery

New Relic

Elastic APM

Datadog

🆕 Extra API Testing Concepts & Tools
11. 🧾 Contract Testing
Tools:

Pact

Dredd

OpenAPI Validator

12. 📋 Schema Validation
Tools:

Ajv (Another JSON Validator)

Zod

Yup

OpenAPI Generator

13. 🔄 Idempotency Testing
Tools:

Custom test frameworks using Postman, k6, or Supertest with repeated identical calls

14. 🌐 CORS Testing
Tools:

Browser DevTools → Network → Check CORS headers

curl -H "Origin: evil.com" to simulate external domain

15. 🎯 Rate Limiting & Throttling
Tools:

Artillery

k6

Inspect 429 errors and Retry-After headers manually

16. 🛠 Dependency Testing
Tools:

TestContainers

ToxiProxy

Chaos Mesh

Gremlin

17. 📤 Webhook Testing
Tools & Websites:

Webhook.site

RequestBin

ngrok

Mockbin

18. 🔃 API Version Testing
Tools:

Swagger/OpenAPI

Maintain multiple Postman collections or k6 scripts

OpenAPI Diff