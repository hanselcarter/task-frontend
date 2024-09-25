import { useState } from "react";
import { taskApi } from "../utils/utils";
import { UpdateTaskDto, Task } from "../models/task";

export const useUpdateTask = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [task, setTask] = useState<Task>();

  const updateTask = async (task: UpdateTaskDto, id: number) => {
    setLoading(true);
    setFetchError(false);

    try {
      const response = await fetch(`${taskApi}/task/${id}`, {
        method: "PUT",
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
    updatedTask: task,
    updateTask,
    loading,
    error: fetchError,
  };
};
