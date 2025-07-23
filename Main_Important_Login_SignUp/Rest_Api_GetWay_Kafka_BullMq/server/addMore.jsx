1. Kafka Event Dispatching on Query Events (optional)
Why? Track analytics, audit logs, or stream query metadata to a consumer service.

js
Copy
Edit
await kafkaProducer.send({
  topic: "user.query.logged",
  messages: [
    {
      key: "query",
      value: JSON.stringify({
        timestamp: Date.now(),
        user: req.user?.id || "anonymous",
        query,
        ip: req.ip,
      }),
    },
  ],
});
✅ Use this for:

Behavioral analytics

Search pattern analysis

Abuse or fraud detection (like repeated invalid queries)