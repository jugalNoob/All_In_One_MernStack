🔹 Scenario & System Design Questions

Design a Kafka architecture for:

3 producers sending user events

Topic with 3 partitions

Consumer group with 5 consumers
👉 Explain how load balancing and partition assignment works.

You have 100k events/sec and want exactly-once processing with retries. How would you design this?

How do you design Kafka + MongoDB pipeline for real-time analytics?

If one consumer in a group is slow, what happens? How do you handle it?

If a producer sends messages without a key to a topic with 5 partitions, how does Kafka decide partition placement?

How do you ensure order of messages for a given user ID in Kafka?

What happens when a Kafka broker goes down? What happens to the leader partitions?

How do you implement delayed message processing in Kafka (since Kafka doesn’t support delay natively)?

How do you scale Kafka consumers when partitions are limited?

If Kafka cluster has 3 brokers and replication factor is 3, what happens if 2 brokers go down?