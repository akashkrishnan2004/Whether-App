import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import scheduler from "./jobs/scheduler.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/weather", weatherRoutes);
app.use("/alerts", alertRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
