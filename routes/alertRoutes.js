import express from "express";
import Alert from "../models/alert.js"

const router = express.Router();

router.get("/", async (req, res) => {
  const alerts = await Alert.find().sort({ timestamp: -1 });
  res.json(alerts);
});

export default router
