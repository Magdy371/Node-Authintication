import mongoose from 'mongoose';
import { Document } from 'mongoose';



const userSchema = new mongoose.Schema(
    {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    name: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);
export default User;
