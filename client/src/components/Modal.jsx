import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../main";
import { createPortal } from "react-dom";

const Modal = observer(() => {
  const { ModalStore } = useContext(Context);
  if (!ModalStore.isOpen) return null;

  const { modalType, modalProps } = ModalStore;

  const MODALS = {
    addNewTask: AddNewTaskModal,
    editTask: EditTaskModal,
    deleteTask: DeleteTaskModal,
  };

  const SelectedModal = MODALS[modalType];
  if (!SelectedModal) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <SelectedModal {...modalProps} />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
});

const AddNewTaskModal = observer(() => {
  const [name, setName] = useState("");
  const { ModalStore, TaskStore } = useContext(Context);

  const handleAdd = async () => {
    if (!name.trim()) return;
    await TaskStore.addNewTask(name);
    ModalStore.closeModal();
  };

  return (
    <>
      <h1>Add new task</h1>
      <input
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="modal-controls">
        <button className="button-s secondary" onClick={ModalStore.closeModal}>
          Cancel
        </button>
        <button className="button-s primary" onClick={handleAdd}>
          Add
        </button>
      </div>
    </>
  );
});
const EditTaskModal = observer((props) => {
  const { name } = props;

  const [taskName, setTaskName] = useState(name);
  const { ModalStore, TaskStore } = useContext(Context);

  const handleEdit = async () => {
    if (!name.trim()) return;
    TaskStore.editTask({ ...props, name: taskName });
    ModalStore.closeModal();
  };

  return (
    <>
      <h1>Edit task</h1>
      <input
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <div className="modal-controls">
        <button className="button-s secondary" onClick={ModalStore.closeModal}>
          Cancel
        </button>
        <button className="button-s primary" onClick={handleEdit}>
          Save
        </button>
      </div>
    </>
  );
});
const DeleteTaskModal = observer((props) => {
  const { id } = props;
  const { ModalStore, TaskStore } = useContext(Context);

  const handleDelete = async () => {
    TaskStore.deleteTask(id);
    ModalStore.closeModal();
  };

  return (
    <>
      <h1>Delete this task?</h1>
      <p>Are you sure you want to delete this task?</p>
      <div className="modal-controls">
        <button className="button-s secondary" onClick={ModalStore.closeModal}>
          Cancel
        </button>
        <button className="button-s primary" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </>
  );
});

export default Modal;
