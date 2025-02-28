import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  city: { type: String, required: true },
  alertType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Alert = mongoose.model("Alert", AlertSchema);

export default Alert;
