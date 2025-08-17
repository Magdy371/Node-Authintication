import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../modules/User.js';

const signToken = (userId) => {
  const payload = { sub: userId };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });
};

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    //409 is conflict status
    return res.status(409).json({ message: 'Email already in use.' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ email, passwordHash, name });

  const token = signToken(user._id.toString());
  return res.status(201).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name
    }
  });
};