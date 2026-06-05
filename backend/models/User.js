import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['employee', 'manager'],
    default: 'employee',
  },
  otpHash: {
    type: String,
  },
  otpExpiresAt: {
    type: Date,
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);
export default User;