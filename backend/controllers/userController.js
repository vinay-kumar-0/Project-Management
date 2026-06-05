import User from '../models/User.js';

// @desc    Get all employees for task assignment
// @route   GET /api/users/employees
export const getEmployees = async (req, res) => {
  try {
    // Find all users with the employee role, but don't send back their secret auth data
    const employees = await User.find({ role: 'employee' }).select('-otpHash -otpExpiresAt');
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error while fetching employees.' });
  }
};