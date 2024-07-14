import express from "express";
import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use("/tasks", taskRoutes);

export default app;
