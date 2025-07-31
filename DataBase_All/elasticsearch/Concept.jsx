🧠 Elasticsearch: Core Concepts (Beginner → Advanced)
1. 📦 Document
A JSON object that represents a single data item.

Like a "row" in SQL or a "document" in MongoDB.

json
Copy
Edit
{
  "name": "Jugal",
  "email": "jugal@example.com"
}
🆔 Each document has a unique _id.

2. 📁 Index
A collection of documents.

Like a table in SQL or a collection in MongoDB.

Example:

users index for user data

products index for e-commerce items

bash
Copy
Edit
PUT /users
3. 🏷️ Field
A key in your JSON document.

json
Copy
Edit
{
  "name": "Jugal",       ← field
  "email": "jugal@..."   ← field
}
Fields can be:

text (full-text search)

keyword (exact match)

date, number, boolean, etc.

4. 📌 Mapping (like schema)
Defines the data types of fields in an index.

You can let Elasticsearch auto-map fields or define it manually.

json
Copy
Edit
PUT /users/_mapping
{
  "properties": {
    "email": { "type": "keyword" },
    "name": { "type": "text" },
    "createdAt": { "type": "date" }
  }
}
5. 🧠 Analyzer
Breaks text into searchable tokens.

Used during indexing and searching.

Default: standard analyzer
Other types:

whitespace

stop (removes stop words like "a", "the", "is")

ngram, edge_ngram

6. 🔎 Query DSL (Query Language)
JSON-based syntax to query data.

Example:

json
Copy
Edit
GET /users/_search
{
  "query": {
    "match": {
      "name": "jugal"
    }
  }
}
Types of Queries:

match, term, range, bool, fuzzy, wildcard, prefix

7. 📊 Aggregations (like GROUP BY)
Used to group and calculate stats on data.

Example: Count users per domain:

json
Copy
Edit
{
  "aggs": {
    "by_email_domain": {
      "terms": {
        "field": "email.keyword"
      }
    }
  }
}
Also supports:

avg, sum, min, max, percentiles, date_histogram

8. 🧱 Cluster & Node
Cluster: A group of one or more nodes.

Node: A single Elasticsearch instance (running on one server).

Useful for horizontal scaling.

9. 🧩 Shards & Replicas
Elasticsearch splits indexes into shards for performance.

Replicas are copies of shards for redundancy and read speed.

Example:

1 index → 5 primary shards + 1 replica → 10 total shards.

10. 🔐 Security (X-Pack / OpenSearch)
Role-based access control (RBAC)

Encrypted connections (TLS)

API key/token-based auth

Free features in OpenSearch (AWS fork), or paid in Elastic’s default version (Basic/Platinum).

11. 🔄 Ingest Pipelines
Pre-process documents before indexing.

Example: convert string to lowercase, extract date, add geo-location.

json
Copy
Edit
PUT _ingest/pipeline/lowercase-pipeline
{
  "processors": [
    {
      "lowercase": {
        "field": "name"
      }
    }
  ]
}
Use it like this:

bash
Copy
Edit
POST /users/_doc?pipeline=lowercase-pipeline
12. 🔥 Real-Time Use Cases
Full-text search (Google-style search bars)

Log monitoring (ELK Stack: Elasticsearch + Logstash + Kibana)

E-commerce filtering (price, brand, availability)

Fraud detection (search for unusual activity)

Time-series analysis

🎓 Summary Table


| Concept         | Description                   |
| --------------- | ----------------------------- |
| Document        | A JSON record                 |
| Index           | Collection of documents       |
| Field           | A key in JSON                 |
| Mapping         | Schema definition for fields  |
| Analyzer        | Tokenizer for search          |
| Query DSL       | JSON-based query language     |
| Aggregation     | Stats/grouping on data        |
| Cluster/Node    | Servers in distributed setup  |
| Shard/Replica   | Data splitting & redundancy   |
| Ingest Pipeline | Preprocessing before indexing |




Seacrhing Image ---------------------------------------------->>>>



🔄 MONGO → ELASTICSEARCH Query Equivalents
We'll compare MongoDB syntax and Elasticsearch Query DSL for real-world, advanced use cases.

1. 🔍 Find document by exact value
✅ MongoDB:
js
Copy
Edit
db.users.find({ name: "Jugal" })
✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "term": {
      "name.keyword": "Jugal"
    }
  }
}
Use .keyword to match exact values on text fields.

2. 🔎 Partial match (search inside text)
✅ MongoDB:
js
Copy
Edit
db.users.find({ name: /jugal/i })
✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "match": {
      "name": "jugal"
    }
  }
}
match is fuzzy-aware and supports relevance scoring.

3. 🎯 Match multiple fields (OR)
✅ MongoDB:
js
Copy
Edit
db.users.find({ $or: [{ name: "jugal" }, { email: "jugal@example.com" }] })
✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "bool": {
      "should": [
        { "match": { "name": "jugal" }},
        { "match": { "email": "jugal@example.com" }}
      ]
    }
  }
}
4. ✅ Match ALL conditions (AND)
✅ MongoDB:
js
Copy
Edit
db.users.find({ name: "jugal", email: "jugal@example.com" })
✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "jugal" }},
        { "match": { "email": "jugal@example.com" }}
      ]
    }
  }
}
5. 🔻 Exclude documents (NOT)
✅ MongoDB:
js
Copy
Edit
db.users.find({ name: { $ne: "jugal" } })
✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "bool": {
      "must_not": [
        { "match": { "name": "jugal" }}
      ]
    }
  }
}
6. 📆 Range query (e.g. date, number)
✅ MongoDB:
js
Copy
Edit
db.users.find({ age: { $gt: 25, $lt: 50 } })
✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "range": {
      "age": {
        "gt": 25,
        "lt": 50
      }
    }
  }
}
7. 📦 In list (like $in)
✅ MongoDB:
js
Copy
Edit
db.users.find({ role: { $in: ["admin", "editor"] } })
✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "terms": {
      "role.keyword": ["admin", "editor"]
    }
  }
}
8. 🔎 Search with typo support (fuzzy)
✅ MongoDB:
Not built-in — requires regex and custom handling.

✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "match": {
      "name": {
        "query": "juggal",
        "fuzziness": "auto"
      }
    }
  }
}
9. 🔠 Wildcard search (e.g. starts with "jug")
✅ MongoDB:
js
Copy
Edit
db.users.find({ name: /^jug/ })
✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "wildcard": {
      "name.keyword": "jug*"
    }
  }
}
10. 🔎 Multi-field search (like $text in Mongo)
✅ MongoDB:
js
Copy
Edit
db.users.createIndex({ name: "text", email: "text" });
db.users.find({ $text: { $search: "jugal" } })
✅ Elasticsearch:
json
Copy
Edit
{
  "query": {
    "multi_match": {
      "query": "jugal",
      "fields": ["name", "email"]
    }
  }
}
11. 📊 Group by (like aggregate $group)
✅ MongoDB:
js
Copy
Edit
db.users.aggregate([
  { $group: { _id: "$role", count: { $sum: 1 } } }
])
✅ Elasticsearch:
json
Copy
Edit
{
  "aggs": {
    "role_group": {
      "terms": {
        "field": "role.keyword"
      }
    }
  }
}
12. ⏳ Sort & Pagination
✅ MongoDB:
js
Copy
Edit
db.users.find().sort({ createdAt: -1 }).skip(10).limit(10)
✅ Elasticsearch:
json
Copy
Edit
{
  "from": 10,
  "size": 10,
  "sort": [
    { "createdAt": "desc" }
  ]
}
🚀 Bonus: Score + Highlight (for UI search)
json
Copy
Edit
{
  "query": {
    "match": {
      "bio": "javascript developer"
    }
  },
  "highlight": {
    "fields": {
      "bio": {}
    }
  }
}
Use highlight to bold or highlight matched terms in UI search results.

🎓 Summary Table

| MongoDB Feature         | Elasticsearch Equivalent                 |
| ----------------------- | ---------------------------------------- |
| `find()`                | `match`, `term`, `bool`                  |
| `$or`, `$and`, `$ne`    | `bool` with `must`, `should`, `must_not` |
| `$regex`, `$text`       | `match`, `multi_match`, `wildcard`       |
| `$in`, `$gt`, `$lt`     | `terms`, `range`                         |
| `aggregate $group`      | `aggs: terms`                            |
| `sort`, `limit`, `skip` | `sort`, `size`, `from`                   |
