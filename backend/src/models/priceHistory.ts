import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema({
  pair: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inversePrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

priceHistorySchema.index({ pair: 1, date: -1 });

export const PriceHistory = mongoose.model("PriceHistory", priceHistorySchema);
