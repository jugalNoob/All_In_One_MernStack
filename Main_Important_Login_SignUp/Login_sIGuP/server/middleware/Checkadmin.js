const jwt = require('jsonwebtoken');
const Register = require('../model/student');

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Register.findById(decoded.id);

    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({ error: "Forbidden: Not an admin" });
    }

    req.admin = admin; // Attach admin to req
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = checkAdmin;
