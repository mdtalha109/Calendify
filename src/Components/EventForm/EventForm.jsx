
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import PropTypes from 'prop-types';


const EventForm = ({ selectedDate, onClose, onEventCreate }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      date: selectedDate,
      time: '',
      category: '',
      color: '#FF5733', // Default color
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      time: Yup.string().required('Time is required'),
      category: Yup.string().required('Category is required'),
      color: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      let id = uuidv4()
      onEventCreate(id, values.title, values.date, values.time, values.category, values.color);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Create Event</h3>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.time && formik.errors.time ? 'border-red-500' : ''
            }`}
            type="time"
            {...formik.getFieldProps('time')}
          />
          {formik.touched.time && formik.errors.time ? (
            <div className="text-red-500 text-xs italic">{formik.errors.time}</div>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Color:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.color && formik.errors.color ? 'border-red-500' : ''
            }`}
            type="color"
            {...formik.getFieldProps('color')}
          />
          {formik.touched.color && formik.errors.color ? (
            <div className="text-red-500 text-xs italic">{formik.errors.color}</div>
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

EventForm.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onClose: PropTypes.func.isRequired,
  onEventCreate: PropTypes.func.isRequired,
};

export default EventForm;
