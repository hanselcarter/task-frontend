import { useState } from "react";
import { CreateTaskDto } from "../../models/task";
import "./ui.css";
import { RiCloseLine } from "react-icons/ri";

export interface ModalProps {
  readonly setIsOpen: (value: boolean) => void;
  readonly onSaveTask: (task: CreateTaskDto) => void;
}
const CreateModal = ({ setIsOpen, onSaveTask }: ModalProps) => {
  const [task, setTask] = useState<CreateTaskDto>({
    title: "",
    description: "",
    status: "",
  });

  console.log(task);
  return (
    <>
      <div className={"darkBG"} onClick={() => setIsOpen(false)} />
      <div className={"centered"}>
        <div className={"modal"}>
          <div className={"modalHeader"}>
            <h5 className={"heading"}>Add Task</h5>
          </div>
          <button className={"closeBtn"} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={"modalContent"}>
            Please fulfill the form below to add a new task
            <div className="inputsContainer">
              <input
                className="input"
                type={"text"}
                placeholder={"Title"}
                autoFocus
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
              <input
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                className="input"
                type={"text"}
                placeholder={"Description"}
              />
              <input
                onChange={(e) => setTask({ ...task, status: e.target.value })}
                className="input"
                type={"text"}
                placeholder={"Status"}
              />
            </div>
          </div>
          <div className={"modalActions"}>
            <div className={"actionsContainer"}>
              <button className={"cancelBtn"} onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button
                className={"primaryBtn"}
                onClick={() => {
                  onSaveTask(task);
                  setIsOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateModal;
