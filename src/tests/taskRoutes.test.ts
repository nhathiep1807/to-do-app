import request from "supertest";
import app from "../app";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

beforeEach(async () => {
  const taskRepository = AppDataSource.getRepository(Task);
  await taskRepository.clear();
});

describe("Task API", () => {
  it("should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ name: "Test Task" });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Task");
  });

  it("should not create a task with an invalid name", async () => {
    const response = await request(app).post("/tasks").send({ name: "" });

    expect(response.status).toBe(400);
  });

  it("should get all tasks", async () => {
    await request(app).post("/tasks").send({ name: "Task 1" });

    await request(app).post("/tasks").send({ name: "Task 2" });

    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should get a task by ID", async () => {
    const createResponse = await request(app)
      .post("/tasks")
      .send({ name: "Task 1" });

    const taskId = createResponse.body.id;

    const getResponse = await request(app).get(`/tasks/${taskId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe("Task 1");
  });

  it("should update a task", async () => {
    const createResponse = await request(app)
      .post("/tasks")
      .send({ name: "Task 1" });

    const taskId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ name: "Updated Task" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe("Updated Task");
  });

  it("should delete a task", async () => {
    const createResponse = await request(app)
      .post("/tasks")
      .send({ name: "Task 1" });

    const taskId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/tasks/${taskId}`);
    expect(deleteResponse.status).toBe(204);
  });
});
