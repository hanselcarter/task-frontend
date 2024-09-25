export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: string;
}
