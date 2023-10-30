import { ITask, ITaskRequest, IUser, RegisterForm } from "@/types";
import Fetcher from "./fetcher";

const instance = new Fetcher({ base_url: process.env.API_URL || "http://localhost:3333" });

export const authApi = {};

export const tasksApi = {
  getAllTasks: (params?: Record<string, any>) => instance.get<ITask[]>("todos", params, { cache: 'no-store' }),
  getTaskById: (id: number) => instance.get<ITask>(`todos/${id}`),
  createTask: (taskData: ITaskRequest) => instance.post<ITask>("todos", taskData),
  updateTask: (id: number, task: ITaskRequest) => instance.patch<ITask>(`todos/${id}`, task),
  deleteTask: (id: number) => instance.delete(`todos/${id}`),
};

export const usersApi = {
  createUser: (userData: RegisterForm) => instance.post('users', userData),
  getAllUsers: () => instance.get<IUser[]>("users"),
  getUserById: (id: number) => instance.get<IUser>(`users/${id}`),
  deleteUser: (id: number) => instance.delete(`users/${id}`),
}
