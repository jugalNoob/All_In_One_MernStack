Load Testing for 10k+ Requests
Install autocannon
bash
Copy
Edit
npm install -g autocannon
Run test for ~10k requests in ~1 second burst
bash
Copy
Edit
autocannon -c 200 -d 5 -p 10 http://localhost:9000/
-c 200 → 200 concurrent connections

-d 5 → run for 5 seconds

-p 10 → 10 pipelined requests per connection

Total Requests ≈ 200 × 10 × (5 / avg_latency)

If you want exactly 10k requests:

bash
Copy
Edit
autocannon -c 100 -a 10000 http://localhost:9000/
-a 10000 means total requests = 10,000

-c 100 means 100 concurrent connections

💡 Expected Results
On a modern 8-core machine, a simple clustered Express app like this can handle 50k–100k req/sec in local testing, so 10k req is easily doable.