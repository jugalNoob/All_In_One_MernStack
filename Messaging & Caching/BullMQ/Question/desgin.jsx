Client / App
   │
   │  createJob() / add job
   ▼
┌───────────────┐
│   BullMQ Queue│
│  (Redis store)│
└───────┬───────┘
        │
        │ job waiting / delayed / retries
        ▼
┌───────────────┐
│   Worker      │
│  (Process job)│
└───────┬───────┘
        │
        │ job completed / failed
        ▼
Client / App / Events
