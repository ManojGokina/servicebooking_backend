// models/SubCategory.ts
import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true , unique: true},
  image: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true });

export const SubCategory = mongoose.model('SubCategory', subCategorySchema);
