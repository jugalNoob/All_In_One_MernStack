🔢 ALL TYPES OF PAGINATION
✅ 1. Offset-Based Pagination
Most common approach
Used by: SQL-based systems, REST APIs

How it works:
GET /items?limit=10&offset=20 → fetches 10 items starting from the 21st.

Pros:

Simple to implement.

Easy to jump to specific pages.

Cons:

Can be inefficient with large data sets (due to OFFSET in DB).

Risk of data inconsistency when new records are added/deleted.

MongoDB Equivalent:

js
Copy
Edit
collection.find().skip(offset).limit(limit)
✅ 2. Page-Based Pagination
Also called numbered pagination
Used by: UI-based apps, React/Next.js

How it works:
GET /items?page=3&limit=10

Pros:

User-friendly for UI (like page numbers at bottom).

Familiar to users.

Cons:

Same downsides as offset-based (slow with high page numbers).

✅ 3. Cursor-Based Pagination (Keyset Pagination)
Best for real-time systems or large datasets
Used by: Twitter, Facebook, Instagram

How it works:
Instead of offset, use a unique field (like _id, createdAt, etc.)
GET /items?limit=10&cursor=2023-07-24T12:00:00Z

Pros:

High performance (no skipping).

Consistent even with inserts/deletes.

Ideal for infinite scrolling.

Cons:

No “go to page” support.

Slightly more complex logic.

MongoDB Example:

js
Copy
Edit
db.items.find({ createdAt: { $lt: cursor } }).sort({ createdAt: -1 }).limit(10)
✅ Seek Pagination
A variation of cursor-based pagination.

Instead of a timestamp or ID, you “seek” based on last known values of a composite key (like userId, score, etc.).

Use case: Leaderboards, sorted data streams.

✅ Relay-Style Pagination
Used in GraphQL (Relay is a GraphQL client)

How it works:
Uses startCursor, endCursor, hasNextPage, hasPreviousPage.

Pros:

Great for frontend GraphQL UIs.

Flexible with forward/backward scrolling.

Example Query:

graphql
Copy
Edit
{
  users(first: 10, after: "cursor123") {
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
✅ Time-Based Pagination
Useful when you only want data within a certain time window.

Example: GET /logs?start=2024-01-01&end=2024-01-31

✅ Hybrid Pagination
Combine cursor + offset or page + cursor to get benefits of both.

Used in complex systems (e.g., LinkedIn's feed + page navigation).



📊 When to Use Which?


| Pagination Type | Best For                         | Use Case Example             |
| --------------- | -------------------------------- | ---------------------------- |
| Offset          | Simple apps, admin dashboards    | Blog posts, product lists    |
| Page-based      | UI with page numbers             | E-commerce sites             |
| Cursor-based    | Real-time or large data sets     | Chat apps, social feeds      |
| Seek            | Sorted composite fields          | Game leaderboards, analytics |
| Relay-style     | GraphQL APIs                     | Social networks, app feeds   |
| Time-based      | Logs, analytics, monitoring      | Log dashboards               |
| Hybrid          | Complex navigation + performance | Large social network APIs    |



