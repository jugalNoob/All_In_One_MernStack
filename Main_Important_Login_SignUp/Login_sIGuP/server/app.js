const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require("helmet");
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

require('./db/conn');
const router = require('./routes/router');
const RateLimit = require("./middleware/rate");

const app = express();
const PORT = process.env.PORT || 9000;

// --- CORS Configuration ---
const corsOption = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
};

// --- Middlewares ---
app.use(helmet());
app.use(express.json());

// catch JSON parse errors and ignore them
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // skip the body‑parser error and move on
    return next();
  }
  next(err);
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOption));
app.use(RateLimit);

// --- Session Setup (Memory-based) ---
app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// --- Passport Setup ---
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// --- GitHub OAuth Strategy ---
passport.use(new GitHubStrategy({
    clientID: process.env.Client_IDGit,
    clientSecret: process.env.Client_secretGit,
    callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:9000/auth/github/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    console.log("GitHub Profile:", profile);
    // You can store user info in DB here
    return done(null, profile);
  }
));

// --- GitHub OAuth Routes ---
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login/failed' }),
  function (req, res) {
    // res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
      res.redirect('http://localhost:3000/DashboardG'); // Frontend route
  }
);

// --- Auth Status Route ---


// Get current GitHub user (after login)
app.get('/login/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      user: req.user,
      message: "Authenticated ✅"
    });
  } else{
    
    res.status(401).json({ success: false, message: "Not Authenticated ❌" });
  }
});

// --- Login Failed Route ---
app.get('/login/failed', (req, res) => {
  res.status(401).json({ message: 'GitHub Login Failed ❌' });
});

// --- Logout Route ---
app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout error' });
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect(process.env.FRONTEND_URL || '/');
  });
});

// --- Custom Routes ---
app.use(router);

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
