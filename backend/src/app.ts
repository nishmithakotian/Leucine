import express from "express";
import cors from "cors";
import equipmentRoutes from "./routes/equipment.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/equipment", equipmentRoutes);

app.get("/", (_req, res) => {
  res.send("Equipment Tracker API is running");
});

export default app;
