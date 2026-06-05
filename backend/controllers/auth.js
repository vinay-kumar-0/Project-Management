import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

// Configure Nodemailer transporter using your .env credentials
// Configure Nodemailer transporter using your .env credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Must be false for port 587. It will automatically upgrade with STARTTLS.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc    Request OTP / Sign Up automatically if email doesn't exist
// @route   POST /api/auth/request-otp
export const requestOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    // 1. Find user or create a new one (default role is 'employee')
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      user = new User({ email: email.toLowerCase(), role: 'employee' });
    }

    // 2. Generate a secure 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 3. Hash the OTP for secure DB storage
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    // 4. Set OTP expiration time (5 minutes from now)
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 5. Save hash and expiry to user document
    user.otpHash = otpHash;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // 6. Send the raw OTP via email
    const mailOptions = {
      from: `"SDLC Workspace" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Your Dashboard Access Code',
      text: `Your one-time access code is: ${otp}. It will expire in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 500px;">
          <h2>Your Dashboard Access Code</h2>
          <p>Use the 6-digit verification code below to log into your account:</p>
          <h1 style="background: #f4f4f4; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
          <p style="color: #777; font-size: 12px;">This code expires in 5 minutes. If you didn't request this code, you can safely ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'OTP sent to email successfully.' });

  } catch (error) {
    console.error('Error in requestOtp:', error);
    return res.status(500).json({ message: 'Server error while processing OTP request.' });
  }
};

// @desc    Verify OTP and return JWT token + user details
// @route   POST /api/auth/verify-otp
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.otpHash || !user.otpExpiresAt) {
      return res.status(400).json({ message: 'Invalid request. Please request a new code.' });
    }

    // Check if OTP has expired
    if (new Date() > user.otpExpiresAt) {
      return res.status(400).json({ message: 'OTP code has expired.' });
    }

    // Verify entered OTP against hashed OTP in database
    const isMatch = await bcrypt.compare(otp, user.otpHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect OTP code.' });
    }

    // OTP verified successfully -> Clear OTP fields to prevent re-use
    user.otpHash = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // Generate JWT Token embedded with user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token lasts 1 day
    );

    // Return token and user info (frontend routes based on role)
    return res.status(200).json({
      message: 'Authentication successful.',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error in verifyOtp:', error);
    return res.status(500).json({ message: 'Server error during verification.' });
  }
};