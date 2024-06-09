import React, { useState } from 'react';
import TaskForm from '../../Components/Task/TaskForm';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../../features/tasks/taskSlice';

const TaskPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const dispatch = useDispatch();

  const handleAddTask = (task) => {
    dispatch(addTask(task));
    setIsFormOpen(false);
  };

  const handleEditTask = (task) => {
    dispatch(editTask({ id: task.id, updatedTask: task }));
    setIsFormOpen(false);
    setTaskToEdit(null);
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
    setTaskToEdit(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTaskToEdit(null);
  };

  return (
    <>
    <div className="bg-white p-6 m-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleOpenForm}
        >
          Add Task
        </button>
      </div>
      {isFormOpen && (
        <TaskForm
          initialTask={taskToEdit}
          onClose={handleCloseForm}
          onSave={taskToEdit ? handleEditTask : handleAddTask}
        />
      )}
      
    </div>
  
    <div className="m-4">
      
    </div>
    </>
  );
};

export default TaskPage;