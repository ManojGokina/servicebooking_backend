import mongoose, { Schema } from 'mongoose';
import { User } from '../types';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  phoneno: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const UserModel = mongoose.model<User>('User', userSchema);