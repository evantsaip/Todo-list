'use client'

import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { editTodo, deletedTodo } from "../api";
import { useRouter } from "next/navigation";

const Task = ({ task }) => {
  const router = useRouter();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDeleted, setOpenModalDeleted] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task.text);

  const handleSubmitEditTodo = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id) => {
    await deletedTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit 
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer" 
          className="text-blue-500" 
          size={25} 
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}> 
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'> Edit Task </h3>
            <div className='modal-action'>
              <input 
                type="text" 
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" 
              />
              <button className='btn' type='submit'>Submit</button>
            </div>
          </form>
        </Modal>
        <FiTrash2 
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500" 
          size={25} 
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}> 
          <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
