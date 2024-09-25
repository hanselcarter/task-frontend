import { useState } from "react";
import { taskApi } from "../utils/utils";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [taskId, setTask] = useState<number>();

  const deleteTask = async (id: number) => {
    setLoading(true);
    setFetchError(false);

    try {
      const response = await fetch(`${taskApi}/task/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        await response.json();

        setTask(id);
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
    deletedTask: taskId,
    deleteTask,
    loading,
    error: fetchError,
  };
};
