import mongoose from "mongoose";

// Define the schema for BtechSem1
const BtechSem1Schema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true, // Fixed the typo from "require" to "required"
  },
  data: {
    type: [String],
    required: true, // Optional: if you want to ensure the array always exists
  },
});

// Define the model for BtechSem1 or use the existing one
const BtechSem1 =
  mongoose.models.BtechSem1 || mongoose.model("BtechSem1", BtechSem1Schema);

// Define the schema for BtechSem3
const BtechSem3Schema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true, // Fixed the typo
  },
  data: {
    type: [String],
    required: true,
  },
});

// Define the model for BtechSem3 or use the existing one
const BtechSem3 =
  mongoose.models.BtechSem3 || mongoose.model("BtechSem3", BtechSem3Schema);

// Define the schema for BtechSem5
const BtechSem5Schema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  data: {
    type: [String],
    required: true,
  },
});

// Define the model for BtechSem5 or use the existing one
const BtechSem5 =
  mongoose.models.BtechSem5 || mongoose.model("BtechSem5", BtechSem5Schema);

// Define the schema for BtechSem7
const BtechSem7Schema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  data: {
    type: [String],
    required: true,
  },
});

// Define the model for BtechSem7 or use the existing one
const BtechSem7 =
  mongoose.models.BtechSem7 || mongoose.model("BtechSem7", BtechSem7Schema);

export { BtechSem1, BtechSem3, BtechSem5, BtechSem7 };
