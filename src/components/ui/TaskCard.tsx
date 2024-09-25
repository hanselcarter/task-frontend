import { useState } from "react";
import "./ui.css";
import { UpdateTaskDto } from "../../models/task";

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  onUpdate: (task: UpdateTaskDto) => void;
  onDelete: () => void;
}

const TaskCard = ({
  title,
  description,
  status,
  onUpdate,
  onDelete,
}: TaskCardProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentStatus(event.target.value);
  };
  return (
    <div className="card">
      <div className="card-details">
        <p className="text-title">{title}</p>
        <p className="text-body">{description}</p>
        <input
          placeholder="Status"
          className="input"
          defaultValue={status}
          onChange={handleStatusChange}
        />
      </div>
      <div className="buttonContainer">
        <button className="deleteBtn" onClick={onDelete}>
          Delete
        </button>
        <button
          className="primaryBtn"
          onClick={() =>
            onUpdate({
              title,
              description,
              status: currentStatus,
            })
          }
          disabled={currentStatus === status}
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
