✅ Step 1: Install Artillery



npm install -g artillery




🎯 This hits random pages (1 to 1000) with a limit of 10 results per page.

✅ Step 3: Run the Test
bash
Copy
Edit
artillery run load-test.yml
📊 Optional: Save Report to File
bash
Copy
Edit
artillery run load-test.yml -o report.json
artillery report --output report.html report.json
Then open report.html in a browser.

🛠 What You’re Testing
Concurrent access to /search

How MongoDB handles .skip() on 10k+ records

Node.js performance under high load

Redis caching response time (if used)

Any rate limiting/memory pressure




| Tip                                        | Use                    |
| ------------------------------------------ | ---------------------- |
| Use `artillery-plugin-metrics-by-endpoint` | Breakdown by URL       |
| Add `beforeRequest` logic                  | For token auth         |
| Test with payloads (POST)                  | `flow -> post -> json` |
| Use Dockerized load runners                | To distribute test     |



🧪 Summary
With the above script, you're simulating 10k+ concurrent paginated API requests.
Let me know if you also want:

A version with POST request payload

A script to test rate limiting

A distributed artillery load test (Docker-based)