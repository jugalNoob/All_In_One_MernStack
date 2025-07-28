📄 2. Schema Pattern Cheat Sheet (with Use Cases)

| Pattern       | Use Case Example             | Pros                               | Cons                            |
| ------------- | ---------------------------- | ---------------------------------- | ------------------------------- |
| Embedded      | Product specs, user settings | Fast reads, atomic writes          | Can grow large, update issues   |
| Referenced    | Orders referencing products  | Normalize data, avoids duplication | Requires populate (extra query) |
| Bucket        | Logs, time-series data       | Query optimization, reduces count  | Complex querying, size limits   |
| Outlier       | User profile info            | Keeps main doc small, easy updates | Extra join needed               |
| Polymorphic   | Reviews on products/orders   | Reusable schemas, clean logic      | Complex refs, needs `refPath`   |
| Discriminator | Admin vs Customer users      | Shared base schema + customization | Slightly heavier model logic    |




| Use Case                  | Recommended Pattern                 |
| ------------------------- | ----------------------------------- |
| Blog with comments        | Embedded (small), Reference (large) |
| User profile separation   | Outlier Pattern                     |
| Multi-type comment system | Polymorphic / RefPath               |
| Logs, time-series         | Bucket Pattern                      |
| Admin vs Normal users     | Discriminator                       |
