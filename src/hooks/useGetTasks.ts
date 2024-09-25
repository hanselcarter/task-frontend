import { useState } from "react";
import { taskApi } from "../utils/utils";
import { Task } from "../models/task";

export const useGetasks = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [tasksData, setTasksData] = useState<Task[]>([]);

  const getTasks = async () => {
    setLoading(true);
    setFetchError(false);

    try {
      const response = await fetch(`${taskApi}/tasks`);

      if (response.status === 200) {
        const data = await response.json();

        setTasksData(data as Task[]);
      } else {
        setTasksData([]);
      }
    } catch (error) {
      setFetchError(true);
      setTasksData([]);
    }

    setLoading(false);
  };

  return {
    tasks: tasksData,
    getTasks,
    loading,
    error: fetchError,
  };
};
