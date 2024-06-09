import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      console.log("action.payload: ", action.payload)
      state.events.push(action.payload);
    },
    editEvent: (state, action) => {
      const { id, ...updatedEvent } = action.payload;
      const index = state.events.findIndex((event) => event.id === id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
