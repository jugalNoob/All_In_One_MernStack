🔹 Advanced Kafka Questions
1. Explain Kafka’s internal storage mechanism (segment files, index files, page cache).

Storage unit = Partition log → Each partition is an append-only log on disk.

Segment files: Each partition is split into segments (default ~1GB). Old segments are rolled over.

Index files:

Offset index → maps logical offsets → physical file position.

Time index → maps timestamp → offset.

Page cache: Kafka relies on OS page cache (not JVM heap) for read/write.

Writes → appended sequentially to disk (fast).

Reads → served from cache if hot, else disk I/O.
👉 This design makes Kafka disk-friendly and high-throughput.






2. How does Kafka achieve high throughput compared to traditional message queues?

Sequential disk writes instead of random I/O (like a commit log).

Zero-copy transfer (sendfile) → bypasses JVM, sends data directly from disk → network.

Batching of messages on producer/consumer.

Compression reduces payload size.

Partitioned architecture → horizontal scalability across brokers.

Async I/O + page cache for faster reads/writes.
👉 Result: Kafka can handle millions of messages/sec.






3. What is backpressure in Kafka, and how do you handle it?

Backpressure = consumers lagging behind producers → growing consumer lag.

Causes: slow processing, insufficient partitions, network/disk bottlenecks.

Handling strategies:

Increase partitions → parallelism.

Scale consumer group horizontally.

Use pause/resume APIs for flow control.

Apply rate limiting / throttling on producers.

Move heavy processing downstream (Kafka Streams, Flink).







4. How do you monitor Kafka performance (lag, throughput, partitions health)?

Consumer Lag:

Check with kafka-consumer-groups.sh or tools like Burrow, Prometheus + Grafana.

Broker Metrics:

CPU, memory, disk I/O, network throughput.

Under-replicated partitions (should be 0).

ISR shrink/expand events.

Producer Metrics:

Record send rate, retry rate, error rate, batch size.

Consumer Metrics:

Poll latency, fetch rate, commit latency.
👉 Common tools: Confluent Control Center, LinkedIn Burrow, Prometheus + Grafana, Datadog.








5. What is Kafka Rebalancing, and how does it affect consumer groups?

Rebalancing = Redistributing partitions among consumers in a consumer group.

Triggered when:

New consumer joins, existing leaves, topic partitions change.

Impact:

Consumers stop processing temporarily.

Messages may be reprocessed if offsets not committed.

Solutions to reduce disruption:

Incremental rebalancing (CooperativeStickyAssignor) → minimizes partition movement.

Static membership → avoids full rebalance when consumers restart.











6. How would you tune Kafka for high throughput (100K+ messages/sec)?

Producer tuning:

batch.size, linger.ms → enable batching.

compression.type → lz4 or snappy for balance.

acks=1 for higher throughput (if durability tradeoff is acceptable).

Broker tuning:

Increase num.partitions for parallelism.

Tune log.segment.bytes and log.retention.ms.

Ensure fast disks (SSD) and network bandwidth.

Consumer tuning:

Increase fetch.min.bytes & fetch.max.wait.ms (batch fetching).

Use async processing or Kafka Streams for parallelism.

Cluster tuning:

Avoid too many small partitions (causes metadata overhead).

Monitor GC (use G1GC).

Proper heap sizing (but leave most memory for OS page cache).










7. What is a Dead Letter Queue (DLQ) in Kafka, and how would you implement one?

DLQ = special Kafka topic to store failed messages.

Use case: messages that cannot be processed due to schema errors, business logic errors, or poison pills.

Implementation:

Consumer catches processing errors.

Instead of discarding, push message → DLQ topic (with error metadata).

Separate monitoring/alerting system processes DLQ.
👉 Best practice: Always define DLQ for mission-critical pipelines.











8. How does Kafka handle message compression? What formats are supported?

Compression applied at producer level → messages compressed in batches.

Broker stores compressed messages as-is, avoids decompress/recompress.

Consumer decompresses when fetching.

Supported formats: gzip, snappy, lz4, zstd.

zstd = best compression ratio.

lz4/snappy = fastest.
👉 Choose based on latency vs. network/storage tradeoff.












9. What is the difference between Kafka on-premise vs. Confluent Cloud?

Kafka on-premise:

Self-managed, high control.

Requires managing brokers, Zookeeper/KRaft, scaling, upgrades.

Cost effective if infra already exists.

Confluent Cloud:

Fully managed Kafka-as-a-Service.

Includes Schema Registry, Connectors, ksqlDB, monitoring, tiered storage.

Scales automatically, pay-per-use pricing.
👉 On-prem = control + cost optimization; Cloud = simplicity + time-to-market.









10. What is Tiered Storage in Kafka?

Normally Kafka stores data on local broker disks.

Tiered Storage = old log segments moved to cheap object storage (e.g., S3, GCS, Azure Blob).

Benefits:

Retain data for months/years without expensive SSDs.

Brokers keep only recent "hot set" of data.

Cost-effective + scalable.

Supported in Confluent Platform, Redpanda, and KIP-405 proposals for Apache Kafka.

✅ With these Advanced Kafka answers, you’re fully covered for senior-level interviews.

