What is Kafka UI and why use it?
Visual Monitoring & Management:
Kafka by itself is just a backend messaging system, with no built-in graphical interface. Kafka UI gives you a web dashboard where you can easily see:

Topics & partitions

Brokers and their status

Consumer groups and lag

Messages inside topics (browse, filter, inspect)

Configuration and metrics

Simplifies Debugging & Troubleshooting:
Without a UI, you rely on command-line tools or logs to check Kafka status. Kafka UI lets you:

Quickly find bottlenecks or consumer lag

See if messages are being produced or consumed

Inspect messages for errors or debugging

Check partition distribution

Better for Teams & Non-Experts:
Developers, QA, DevOps, and managers can all use the UI without Kafka command-line knowledge.

Speeds Up Development:
You can test and verify message flow quickly during development or testing.

Why do you need to configure brokers?
Kafka UI needs to connect to your Kafka brokers to fetch this data. Since Kafka runs as a separate service, Kafka UI container needs to know where the Kafka brokers are located (IP and port).

When to use Kafka UI?
Running Kafka clusters locally or in production

Managing multiple Kafka clusters in one place

Debugging message flow

Monitoring consumers & producers

Viewing real-time topic metrics

TL;DR
You use Kafka UI to visualize, monitor, and manage Kafka clusters easily through a web interface instead of command-line tools.



kafka-ui:
  image: provectuslabs/kafka-ui:latest
  container_name: kafka-ui
  ports:
    - "8080:8080"
  environment:
    KAFKA_CLUSTERS_0_NAME: "local-cluster"
    KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: "broker:9092"
    KAFKA_CLUSTERS_0_ZOOKEEPER: "zookeeper:2181"   # optional
