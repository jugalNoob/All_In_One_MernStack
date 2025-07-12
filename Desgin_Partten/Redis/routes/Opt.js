const { createClient } = require("redis");

const redisClient = createClient();
redisClient.connect().catch(console.error);

// Set OTP with TTL (e.g., 5 minutes)
async function storeOtp(email, otp) {
  const key = `otp:${email}`;
  await redisClient.setEx(key, 300, otp); // 300 seconds = 5 min
  console.log(`🔐 OTP stored for ${email}: ${otp}`);
}

// Check OTP before expiry
async function verifyOtp(email, otp) {
  const key = `otp:${email}`;
  const storedOtp = await redisClient.get(key);
  if (!storedOtp) {
    console.log("❌ OTP expired or not found");
    return false;
  }
  if (storedOtp === otp) {
    console.log("✅ OTP verified!");
    await redisClient.del(key); // Optionally delete after verification
    return true;
  }
  console.log("❌ OTP incorrect");
  return false;
}

// Example usage
(async () => {
  const email = "jugal@example.com";
  const otp = "123456";

  await storeOtp(email, otp);

  // simulate user entering OTP within 3 seconds
  setTimeout(async () => {
    await verifyOtp(email, "123456"); // should verify
  }, 3000);
})();


> SETEX otp:jugal@example.com 300 "432123"
OK

> TTL otp:jugal@example.com
→ 298

> GET otp:jugal@example.com
→ "432123"

(wait 5 minutes...)

> GET otp:jugal@example.com
→ (nil)




🤖 2. Captcha Tokens
Used for:

Preventing bot abuse

Verifying human interaction

🛠 Redis Strategy:
Store captcha id or ip with solution as key

TTL ~ 60–180 seconds

Delete after verification

✅ Example Code:



const generateCaptcha = () => {
  const token = uuidv4();
  const solution = Math.floor(1000 + Math.random() * 9000).toString(); // e.g. "4372"
  return { token, solution };
};

async function createCaptcha() {
  const { token, solution } = generateCaptcha();
  await redisClient.setEx(`captcha:${token}`, 120, solution); // 2 min TTL
  return { token, question: `What is ${solution}?` }; // usually an image
}

async function verifyCaptcha(token, answer) {
  const key = `captcha:${token}`;
  const correctAnswer = await redisClient.get(key);

  if (!correctAnswer) {
    return { valid: false, message: "⚠️ Captcha expired" };
  }

  if (correctAnswer !== answer) {
    return { valid: false, message: "❌ Wrong answer" };
  }

  await redisClient.del(key); // optional
  return { valid: true };
}



🔗 1. Temporary Links / Invites
Used for:

Account activation

Email invites

Temporary download URLs

🛠 Redis Strategy:
Store a unique token (UUID or hash) as key

TTL ~ 5 to 30 minutes

Link becomes invalid after TTL expires


const { createClient } = require("redis");
const { v4: uuidv4 } = require("uuid"); // npm install uuid

const redisClient = createClient();
redisClient.connect();

async function createInviteLink(userEmail) {
  const token = uuidv4();
  const key = `invite:${token}`;
  await redisClient.setEx(key, 1800, userEmail); // 30 mins
  return `https://yourapp.com/invite/${token}`;
}

async function verifyInviteToken(token) {
  const key = `invite:${token}`;
  const email = await redisClient.get(key);
  if (!email) {
    return { valid: false, message: "❌ Invalid or expired link" };
  }
  await redisClient.del(key); // Optional: one-time use
  return { valid: true, email };
}
