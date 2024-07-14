import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";

export class TaskController {
  async createTask(req: Request, res: Response) {
    const taskRepository = AppDataSource.getRepository(Task);
    const task = taskRepository.create(req.body);
    await taskRepository.save(task);
    return res.status(201).json(task);
  }

  async getTasks(req: Request, res: Response) {
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find();
    return res.json(tasks);
  }

  async getTask(req: Request, res: Response) {
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json(task);
  }

  async updateTask(req: Request, res: Response) {
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    taskRepository.merge(task, req.body);
    const updatedTask = await taskRepository.save(task);
    return res.json(updatedTask);
  }

  async deleteTask(req: Request, res: Response) {
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOneBy({
      id: parseInt(req.params.id, 10),
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await taskRepository.remove(task);
    return res.status(204).send();
  }
}
