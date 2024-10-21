// models/karbar.js
import mongoose from 'mongoose';

const karbarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  address: { type: String },
  city: { type: String, required: true },
  zipCode: { type: String },
  imageUrl: { type: String },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }, // برای فعال و غیرفعال کردن آگهی
});

// کالکشن را به properties تغییر می‌دهیم
const Karbar = mongoose.models.Karbar || mongoose.model('Karbar', karbarSchema, 'properties');

export default Karbar;
