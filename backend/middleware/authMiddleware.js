import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. Verify the user is logged in
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Decode the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in DB and attach to the request object (excluding private fields)
      req.user = await User.findById(decoded.id).select('-otpHash -otpExpiresAt');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// 2. Verify the user is a manager (for restricted actions)
export const managerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'manager') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Managers only.' });
  }
};