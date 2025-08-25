const Register = require("../../model/student");
const { redisClient } = require("../../Redis/redisClient"); // ✅ fix
const zlib = require("zlib");
// 🔑 Example: Cursor-Based Pagination with MongoDB (_id as cursor)

// http://localhost:9000/apgthin?limit=50



// --- >>> WithOut Redis Pagination ------------------>>>
// exports.ApigetCursorPagination = async (req, res) => {
//   try {
//     let limit = Number(req.query.limit) || 10;
//     let cursor = req.query.cursor || null; // last _id from previous page

//     let query = {};
//     if (cursor) {
//       query._id = { $gt: cursor }; // fetch records after this cursor
//     }

//     // 1️⃣ Get total number of documents (for info)
//   // Fetch count only once
// //const totalCount = cursor ? null : await Register.countDocuments({}); // all docs in collection
//     // If you want to count only docs matching query → use Register.countDocuments(query);

//     // 2️⃣ Fetch paginated documents
//     let data = await Register.find(query)
//       .sort({ _id: 1 }) // ascending order
//       .limit(limit + 1); // fetch one extra to check if there's next page

//     // 3️⃣ Check if there’s another page
//     let nextCursor = null;
//     if (data.length > limit) {
//       nextCursor = data[limit]._id; // save last id as next cursor
//       data.pop(); // remove extra record
//     }

//     // 4️⃣ Send response
//     res.status(200).json({
//    //   totalCount,  // total docs in collection
//       limit,
//       nextCursor,  // pass this in next request
//       data,
//     });
//   } catch (error) {
//     console.error("❌ Error in ApigetCursorPagination:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


//const totalCount = cursor ? null : await Register.countDocuments({}); 
// -- >Take more ms 



// --- >> With Page Cirsor Pagination --------------->>
// exports.ApigetCursorPagination = async (req, res) => {
//   try {
//     // 1️⃣ Extract query params
//     let limit = Number(req.query.limit) || 10;
//     let cursor = req.query.cursor || null; // last _id from previous page

//     let query = {};
//     if (cursor) {
//       query._id = { $gt: cursor }; // fetch records after this cursor
//     }

//     // 2️⃣ Generate Redis key dynamically
//     const redisKey = `students:limit=${limit}:cursor=${cursor || "start"}`;

//     console.log(redisKey)

//     // 3️⃣ Check cache first
//     const cachedData = await redisClient.get(redisKey);
//     if (cachedData) {
//       console.log("✅ Data from Redis cache");
//       return res.status(200).json(JSON.parse(cachedData));
//     }

//     // 4️⃣ Fetch paginated data from Mongo
//     let data = await Register.find(query)
//       .sort({ _id: 1 }) // ascending order by _id
//       .limit(limit + 1); // fetch one extra doc to check if next page exists

//     // 5️⃣ Determine next cursor
//     let nextCursor = null;
//     if (data.length > limit) {
//       nextCursor = data[limit]._id; // save last doc’s id as next cursor
//       data.pop(); // remove extra record
//     }

//     // 6️⃣ Prepare response payload
//     const responsePayload = { limit, nextCursor, data };

//     // 7️⃣ Save result to Redis (cache for 1 hour)
//     await redisClient.setEx(redisKey, 3600, JSON.stringify(responsePayload));

//     // 8️⃣ Send response
//     res.status(200).json(responsePayload);
//   } catch (error) {
//     console.error("❌ Error in ApigetCursorPagination:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };





/// ---- >>>HyBrid Offset And Cursor ----------------------->>

exports.ApigetCursorPagination = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let cursor = req.query.cursor || null;

    // 🔑 Build a Redis key
    const redisKey = cursor
      ? `students:cursor=${cursor}:limit=${limit}`
      : `students:page=${page}:limit=${limit}`;

    // 1. Check Redis cache
    const cachedData = await redisClient.get(redisKey);
    if (cachedData) {
      console.log("✅ Data from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // 2. OFFSET mode (shallow pages, e.g., first 10)
    if (page <= 10 && !cursor) {
      let skip = (page - 1) * limit;

      let data = await Register.find({})
        .sort({ _id: 1 })
        .skip(skip)
        .limit(limit);

      let total = await Register.countDocuments();

      let responsePayload = {
        mode: "offset",
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data,
      };

      // 3. Cache result
      await redisClient.setEx(redisKey, 3600, JSON.stringify(responsePayload));

      return res.status(200).json(responsePayload);
    }

    // 4. CURSOR mode (deep pagination)
    let query = {};
    if (cursor) query._id = { $gt: cursor };

    let data = await Register.find(query)
      .sort({ _id: 1 })
      .limit(limit + 1);

    let nextCursor = null;
    if (data.length > limit) {
      nextCursor = data[limit]._id;
      data.pop();
    }

    let responsePayload = {
      mode: "cursor",
      limit,
      nextCursor,
      data,
    };

    // 5. Cache result
    await redisClient.setEx(redisKey, 3600, JSON.stringify(responsePayload));

    return res.status(200).json(responsePayload);

  } catch (error) {
    console.error("❌ Error in ApigetCursorPagination:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// ✅ So in your case (50k) → Cursor Pagination is definitely the better choice.

// 👉 Do you want me to optimize your current cursor pagination API for 50k+ requests/min (e.g., add proper MongoDB indexes + Redis cache strategy), so it stays under ~20ms per query?






////// -----------------------------------------:::::::::::::

// 🔍 Cursor vs Offset in REST APIs
// ✅ Cursor Pagination (good for streams)

// Strengths: Fast even at very high pages, consistent performance, handles inserts/deletes well.

// Weakness: Can’t jump directly to “page 12” unless you traverse pages sequentially or store cursors.

// Best for:

// Infinite scroll (Twitter, Instagram, chat)

// APIs with heavy load (logs, event streams)

// Use cases where "next page" is enough

// ✅ Offset Pagination (good for classic REST APIs)

// Strengths: Easy to say “give me page=12, limit=100”.

// Weakness: Slow at deep pages (skip cost increases linearly).

// Best for:

// Small-to-medium datasets

// Admin dashboards (jump-to-page)

// Reports where absolute page navigation matters

// ⚡ Hybrid Strategy (REST + Performance)

// Many real systems use a hybrid:

// Offset for shallow pages (page 1–20, admin UI, reporting).

// Cursor for deep scrolling APIs (feeds, logs, analytics).

// Caching with Redis to make repeated queries instant.

// 👉 So, if your API is truly REST (users expect page jumps) → use offset with indexes + caching.
// 👉 If your API is high-throughput feed/log style (50k+ requests/min) → stick with cursor.




// | Use Case                                                     | Best Choice                                    | Why                                     |
// | ------------------------------------------------------------ | ---------------------------------------------- | --------------------------------------- |
// | **Admin dashboard with pages (1,2,3...)**                    | **Offset**                                     | Easy to jump, predictable pages         |
// | **Public feeds (Twitter, Facebook, Instagram, chats, logs)** | **Cursor**                                     | Fast on large data, consistent ordering |
// | **E-commerce listing (filters, sort, jump to page 10)**      | **Offset (first pages)** + Cursor (deep pages) | Hybrid works best                       |
// | **Analytics/reporting with export to CSV**                   | **Offset**                                     | Need fixed total pages, totals          |
// | **Streaming APIs / infinite scroll**                         | **Cursor**                                     | More scalable                           |




// → Fetch 10 rows after the given cursor.

// Advantages:

// 🚀 Much faster → No need to scan skipped rows.

// 📌 Stable results → No duplicates/missing data even if inserts/deletes happen.

// 🔒 Scales better → Handles millions of records efficiently.

// Disadvantages:

// More complex to implement than offset.

// You can’t easily jump to “page 50” (you must follow cursors sequentially).

// When to use:
// ✅ Large datasets (millions of rows)
// ✅ APIs (Twitter, Facebook, GitHub use cursor pagination)
// ✅ Real-time feeds, infinite scroll, activity logs