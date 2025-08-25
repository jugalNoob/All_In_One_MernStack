
const bcrypt = require('bcrypt');
const shortid = require('shortid'); // (tip: nanoid is modern alternative)
const Register = require('../module/student');
const emailQueue = require('../queues/emailQueue');

exports.first = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const shortId = shortid.generate();

    // Save user first
    const savedUser = await Register.create({
      name,
      email,
      password: hashedPassword,
      shortId,
    });

    // Queue the welcome email (include name + shortId!)
    const job = await emailQueue.add(
      'send-welcome-email',
      {
        email: savedUser.email,
        name: savedUser.name,
        shortId: savedUser.shortId,
      },
      {
        delay: 5000, // 5s delay before first attempt
        // attempts/backoff/removeOnFail are already defaulted in queue file, but you can override here if needed
      }
    );

    console.log(`Added job ${job.id} to emailQueue`);

    return res.status(201).json({
      success: true,
      message: 'User registered and email queued successfully',
      userId: savedUser.shortId,
    });

  } catch (error) {
    console.error('Error in /register:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


// 🔧 How this works:

// Initial delay → job starts only after 5s.

// Retries → if it fails, BullMQ retries 3 times.

// Backoff → waits 3s between each retry.

// DLQ (Dead Letter Queue) → if job fails after 3 attempts, it stays in "failed" state (since removeOnFail: false).

// You can later move these jobs to a dedicated DLQ queue for reprocessing.