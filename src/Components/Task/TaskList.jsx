import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskCompletion, deleteTask, addComment, updateTaskStatus } from '../../features/tasks/taskSlice';
import { FaCheckCircle, FaCircle, FaComment, FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ onEditTask }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
 
  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleAddComment = (taskId) => {
    if (commentText.trim()) {
      dispatch(addComment({ taskId, comment: commentText }));
      setCommentText('');
      setSelectedTaskId(null);
    }
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateTaskStatus({ id, status }));
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item flex flex-col p-4 bg-white dark:bg-gray-700 rounded-md mb-3 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => handleToggleCompletion(task.id)}
                className="text-green-500 mr-4 focus:outline-none"
              >
                {task.completed ? <FaCheckCircle size={20} /> : <FaCircle size={20} />}
              </button>
              <div>
                <div className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                  {task.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div>Category: {task.category}</div>
                  <div>Priority: {task.priority}</div>
                  <div>Status: {task.status}</div>
                  <div>Due Date: {task.dueDate}</div>
                </div>
                <select
              value={task.status}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
              className="ml-2 border rounded p-1"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onEditTask(task)} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                <FaEdit size={20} />
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:text-red-700 focus:outline-none">
                <FaTrash size={20} />
              </button>
              <button onClick={() => setSelectedTaskId(task.id)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <FaComment size={20} />
              </button>
            </div>
          </div>
          {task.comments && (
            <div className="mt-4">
              <div className="text-sm text-gray-700 dark:text-gray-300">Comments:</div>
              <ul className="list-disc ml-5">
                {task.comments.map((comment, index) => (
                  <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                    {comment}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedTaskId === task.id && (
            <div className="mt-4">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                onClick={() => handleAddComment(task.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              >
                Add Comment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;