exports.DeletManyAll('/delete-all', async (req, res) => {
  try {
    const result = await RegisterGet.deleteMany({});
    res.status(200).json({ message: `Deleted ${result.deletedCount} records.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete records.' });
  }
});




const mongoose = require("mongoose");
const RegisterGet = require("../model/Apistudent");

exports.deleteById = async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid _id format" });
  }

  try {
    const result = await RegisterGet.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "❌ No record found with that ID" });
    }

    res.status(200).json({ message: `🗑️ Deleted document with _id: ${id}` });
  } catch (err) {
    console.error("❌ Deletion error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};