import { Router } from "express";
import { validateTask } from "../middleware/validateTask";
import { TaskController } from "../controllers/taskController";

const router = Router();
const taskController = new TaskController();

router.post("/", validateTask, taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.put("/:id", validateTask, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
