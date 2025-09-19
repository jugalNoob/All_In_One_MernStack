🔹 Storage & Caching Concepts (Extended)
13. Cache Eviction Techniques

When cache is full, eviction policies decide what to remove:

LRU (Least Recently Used): Evicts items not accessed for the longest time.
🔹 Example: Browser cache removing old websites you haven’t opened recently.

LFU (Least Frequently Used): Removes least-accessed items.
🔹 Example: A video platform removes rarely watched videos from cache.

MRU (Most Recently Used): Evicts the most recently used item.
🔹 Example: Used in databases where recent pages are less likely to be needed again.

FIFO (First In, First Out): Removes oldest cached item.
🔹 Example: CDN caches evict old static assets first.

LIFO (Last In, First Out): Removes newest cached item.
🔹 Example: Rare, but used in stack-like workloads.

RR (Random Replacement): Evicts randomly.
🔹 Example: Embedded systems with low memory.

👉 Real Example: Redis supports policies like LRU, LFU, and random replacement.

14. File-Based Storage System

Stores data in files and folders.

Works well for small projects but scales poorly for complex queries.

🔹 Example: Blogs storing posts as .txt or .json files.
🔹 OS Config: /etc/hosts in Linux.

15. Block Storage

Data stored in fixed-size blocks, managed by the OS.

Fast, efficient, used for databases and VMs.

🔹 Example: AWS EBS (Elastic Block Store) for EC2 instances.

16. Object Storage

Stores data as objects with metadata and unique IDs.

Scales massively and great for unstructured data (images, videos, logs).

🔹 Example: Amazon S3, Google Cloud Storage.

17. In-Memory Databases

Stores data entirely in RAM for ultra-fast access.

Volatile (data lost if power goes off), but can be persisted with snapshots.

🔹 Example: Redis and Memcached for caching, leaderboards, real-time analytics.

18. CDN Storage (Edge Caching)

CDNs store static content (JS, CSS, images, videos) close to users globally.

Reduces latency and offloads origin servers.

🔹 Example: Cloudflare, Akamai, Fastly caching static assets for Netflix or YouTube.

19. Hybrid Storage Systems

Combine multiple strategies (e.g., hot data in-memory, warm data in SSDs, cold data in object storage).

Optimizes cost and performance.

🔹 Example: Facebook keeps recent posts in-memory (hot), older posts in MySQL (warm), and archives in cold storage (Hadoop/HDFS).