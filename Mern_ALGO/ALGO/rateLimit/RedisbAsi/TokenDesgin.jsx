🔹 1. Token Bucket (Redis Flow)

👉 Example: Bucket capacity = 5, refill = 1 token/sec

Initial State
tokens:user1 = 5
last_refill:user1 = 0

Timeline
t=0 → Request 1
tokens=5 → consume 1 → now 4 ✔️
Redis: tokens:user1=4, last_refill=0

t=1 → Request 2
+1 token refill → tokens=5
consume 1 → now 4 ✔️
Redis: tokens:user1=4, last_refill=1

t=2 → Burst of 4 requests
+1 refill → tokens=5
Req1 → 4 ✔️
Req2 → 3 ✔️
Req3 → 2 ✔️
Req4 → 1 ✔️
Redis: tokens:user1=1, last_refill=2

t=3 → Request
+1 refill → tokens=2
consume 1 → now 1 ✔️
Redis: tokens:user1=1, last_refill=3