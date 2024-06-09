import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  taskLists: [], // New state for task lists
  projects: [],  // New state for projects
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].completed = !state.tasks[index].completed;
      }
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index].status = status;
      }
    },
    addComment: (state, action) => {
      const { taskId, comment } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.comments = task.comments || [];
        task.comments.push(comment);
      }
    },
    addTaskList: (state, action) => {
      state.taskLists.push(action.payload);
    },
    editTaskList: (state, action) => {
      const { id, updatedTaskList } = action.payload;
      const index = state.taskLists.findIndex((list) => list.id === id);
      if (index !== -1) {
        state.taskLists[index] = { ...state.taskLists[index], ...updatedTaskList };
      }
    },
    deleteTaskList: (state, action) => {
      state.taskLists = state.taskLists.filter((list) => list.id !== action.payload);
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    editProject: (state, action) => {
      const { id, updatedProject } = action.payload;
      const index = state.projects.findIndex((project) => project.id === id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...updatedProject };
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
  updateTaskStatus,
  addComment,
  addTaskList,
  editTaskList,
  deleteTaskList,
  addProject,
  editProject,
  deleteProject,
} = tasksSlice.actions;

export default tasksSlice.reducer;
