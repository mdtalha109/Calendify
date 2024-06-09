import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const TaskForm = ({ initialTask = {}, onClose, onSave }) => {
  const formik = useFormik({
    initialValues: {
      title: initialTask?.title || '',
      category: initialTask?.category || '',
      priority: initialTask?.priority || 'medium',
      dueDate: initialTask?.dueDate || '',
      comments: initialTask?.comments || '',
      status: initialTask?.status || 'todo',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      category: Yup.string().required('Category is required'),
      priority: Yup.string().required('Priority is required'),
      dueDate: Yup.string().required('Due date is required'),
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: (values) => {
      const task = {
        ...values,
        id: initialTask?.id || uuidv4(),
        completed: initialTask?.completed || false,
        subtasks: initialTask?.subtasks || [],
        comments: initialTask?.comments || [],
      };
      onSave(task);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <div className="task-form">
      <h3 className="text-xl font-bold mb-4">{initialTask?.id ? 'Edit Task' : 'Create Task'}</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.title && formik.errors.title ? 'border-red-500' : ''
            }`}
            type="text"
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-xs italic">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.category && formik.errors.category ? 'border-red-500' : ''
            }`}
            type="text"
            {...formik.getFieldProps('category')}
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-xs italic">{formik.errors.category}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Priority:</label>
          <select
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.priority && formik.errors.priority ? 'border-red-500' : ''
            }`}
            {...formik.getFieldProps('priority')}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {formik.touched.priority && formik.errors.priority ? (
            <div className="text-red-500 text-xs italic">{formik.errors.priority}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Due Date:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.dueDate && formik.errors.dueDate ? 'border-red-500' : ''
            }`}
            type="date"
            {...formik.getFieldProps('dueDate')}
          />
          {formik.touched.dueDate && formik.errors.dueDate ? (
            <div className="text-red-500 text-xs italic">{formik.errors.dueDate}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Comments:</label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.comments && formik.errors.comments ? 'border-red-500' : ''
            }`}
            {...formik.getFieldProps('comments')}
          />
          {formik.touched.comments && formik.errors.comments ? (
            <div className="text-red-500 text-xs italic">{formik.errors.comments}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
          <select
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.status && formik.errors.status ? 'border-red-500' : ''
            }`}
            {...formik.getFieldProps('status')}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {formik.touched.status && formik.errors.status ? (
            <div className="text-red-500 text-xs italic">{formik.errors.status}</div>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  initialTask: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TaskForm;