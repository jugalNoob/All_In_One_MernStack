const RegisterGet = require("../model/Apistudent");
exports.updatesAll = async (req, res) => {
    try {
        const { name,age,country } = req.body;

        const _id = req.params.id;

        // Update the data in the database
        const updateyourdata = await RegisterGet.updateMany({ _id }, {
         name,   age,    country 
        });
        if (updateyourdata) {
            res.status(200).json({ status: "success" });
        } else {
            res.status(404).json({ status: "unsuccessful", error: "No matching records found" });
        }
        console.log(updateyourdata); // For debugging purposes
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "An error occurred" });
    }
};




/// ----- >Adavance Data Update Row Calll Line Starat ------------->>
const mongoose = require("mongoose");
const RegisterGet = require("../model/Apistudent");

exports.updatesAll = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      });
    }

    // 2. Extract and sanitize update fields
    const allowedFields = ["name", "age", "country"];
    const updatePayload = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updatePayload[key] = req.body[key];
      }
    }

    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No valid fields provided for update",
      });
    }

    // 3. Add audit fields
    updatePayload.updatedAt = new Date();

    // 4. Perform the update
    const result = await RegisterGet.updateMany(
      { _id: id },
      { $set: updatePayload },
      { runValidators: true }
    );

    // 5. Handle results
    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: "not-found",
        message: "No matching document found",
      });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({
        status: "no-change",
        message: "Data was already up to date",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Document(s) updated successfully",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });

  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during update",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



// 🧠 Bonus Enhancements (Optional)


// | Feature                | How to Add                                      |
// | ---------------------- | ----------------------------------------------- |
// | 🔐 JWT Auth            | Add middleware before the controller            |
// | 🔁 Redis Cache Busting | Delete cache key after update                   |
// | 🧾 Audit Trail         | Save change logs to another collection          |
// | ✅ Express-validator    | Validate `age` as number, `name` as string etc. |



// | Feature              | Status            |
// | -------------------- | ----------------- |
// | Clean update payload | ✅                 |
// | ID safety check      | ✅                 |
// | Advanced Mongo opts  | ✅ `runValidators` |
// | Response messages    | ✅                 |
// | Audit fields         | ✅ `updatedAt`     |
 