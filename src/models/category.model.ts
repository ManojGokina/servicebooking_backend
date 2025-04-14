// models/Category.ts
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  image: String,
  name: String ,
  banner: String
}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);
