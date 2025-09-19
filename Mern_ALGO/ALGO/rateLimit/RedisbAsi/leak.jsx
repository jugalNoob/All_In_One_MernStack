🔹 2. Leaky Bucket (Redis Flow)

👉 Example: Bucket capacity = 5, leak rate = 1 req/sec

Initial State
bucket:user1 = 0
lastLeak:user1 = 0

Timeline
t=0 → 3 requests arrive
bucket=0 → add 3 → now 3
Redis: bucket:user1=3, lastLeak=0

t=1 → Leak 1 (3-1=2 left), +2 requests arrive
bucket=2 → +2 → now 4
Redis: bucket:user1=4, lastLeak=1

t=2 → Leak 1 (4-1=3 left), +4 requests arrive
bucket=3 → +4 = 7, but capacity=5 → drop 2
Redis: bucket:user1=5, lastLeak=2

t=3 → Leak 1 (5-1=4 left), no new req
Redis: bucket:user1=4, lastLeak=3


👉 Behavior: Smooth flow, drops bursts beyond capacity.