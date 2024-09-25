import { useState } from "react";
import { taskApi } from "../utils/utils";
import { CreateTaskDto, Task } from "../models/task";

export const useCreatetask = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [task, setTask] = useState<Task>();

  const createTask = async (task: CreateTaskDto) => {
    setLoading(true);
    setFetchError(false);

    try {
      const response = await fetch(`${taskApi}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task }),
      });

      if (response.status === 200) {
        const data = await response.json();

        setTask(data as Task);
      } else {
        setTask(undefined);
      }
    } catch (error) {
      setFetchError(true);
      setTask(undefined);
    }

    setLoading(false);
  };

  return {
    task,
    createTask,
    loading,
    error: fetchError,
  };
};
