import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationSlice.actions;

let activeTimeout = null;

export const setNotification = (message) => {
  return async (dispatch) => {
    dispatch(createNotification(message));

    if (activeTimeout) {
      activeTimeout = clearTimeout(activeTimeout);
    }

    activeTimeout = setTimeout(() => dispatch(clearNotification()), 5000);
  };
};

export default notificationSlice.reducer;
