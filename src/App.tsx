import "./App.css";
import "./components/ui/ui.css";
import { useEffect, useState } from "react";

import { useGetasks } from "./hooks/useGetTasks";
import CreateTaskModal from "./components/ui/CreateTaskModal";
import { useCreatetask } from "./hooks/useCreateTask";
import TaskCard from "./components/ui/TaskCard";
import { useUpdateTask } from "./hooks/useUpdateTask";
import { useDeleteTask } from "./hooks/useDeleteTask";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const { getTasks, tasks, loading } = useGetasks();
  const {
    createTask,
    loading: loadingCreate,
    task: createTaskData,
  } = useCreatetask();
  const { updateTask, updatedTask } = useUpdateTask();
  const { deleteTask, deletedTask } = useDeleteTask();

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (createTaskData || updatedTask || deletedTask) {
      getTasks();
    }
  }, [createTaskData, updatedTask, deletedTask]);

  const loadingMsg = loadingCreate
    ? "Creating task..."
    : loading
    ? "Loading tasks..."
    : "Start creating tasks...";

  return (
    <div className="App">
      <div className="headline">
        <p className="header">Welcome This Awesome Task App</p>
        <div className="descriptionContainer">
          <p className="description">
            You can create, update or delete task, also you can download them as
            csv
          </p>
          <button className="primaryBtn" onClick={() => setIsOpen(true)}>
            Add Task
          </button>
        </div>
      </div>

      <div className="cardsGrid">
        {loading || loadingCreate ? (
          <p className="description">{loadingMsg}</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              status={task.status}
              description={task.description}
              title={task.title}
              onUpdate={(taskToUpdate) => updateTask(taskToUpdate, task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))
        ) : (
          <p className="description">Start creating tasks...</p>
        )}
      </div>
      {isOpen && (
        <CreateTaskModal onSaveTask={createTask} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}

export default App;
