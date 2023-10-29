import { ITask, ITaskCreate } from "@/types";
import Fetcher from "./fetcher";

const instance = new Fetcher({ base_url: process.env.API_URL || "http://localhost:3333" });

export const authApi = {};

export const tasksApi = {
  getAllTasks: () => instance.get<ITask[]>("todos"),
  getTaskById: (id: number) => instance.get<ITask>(`todos/${id}`),
  createTask: (newTask: ITaskCreate) => instance.post<ITask>("todos", newTask),
  deleteTask: (id: number) => instance.delete(`todos/${id}`),
};
