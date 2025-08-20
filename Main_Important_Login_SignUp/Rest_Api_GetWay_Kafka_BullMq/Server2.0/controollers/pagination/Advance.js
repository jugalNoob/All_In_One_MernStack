const Register = require("../../model/student");

// 🔑 Example: Cursor-Based Pagination with MongoDB (_id as cursor)

exports.ApigetCursorPagination = async (req, res) => {
  try {
    let limit = Number(req.query.limit) || 10;
    let cursor = req.query.cursor || null; // last _id from previous page

    let query = {};
    if (cursor) {
      query._id = { $gt: cursor }; // fetch records after this cursor
    }

    const data = await Register.find(query)
      .sort({ _id: 1 }) // ensure ascending order
      .limit(limit + 1); // fetch one extra to check if there's next page

    // check if there’s another page
    let nextCursor = null;
    if (data.length > limit) {
      nextCursor = data[limit]._id; // save last id as next cursor
      data.pop(); // remove extra record
    }

    res.status(200).json({
      limit,
      nextCursor, // pass this cursor in next request
      data,
    });
  } catch (error) {
    console.error("❌ Error in ApigetCursorPagination:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
