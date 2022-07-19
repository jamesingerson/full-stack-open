import { createSlice } from "@reduxjs/toolkit";

const initialState = "hello";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { createNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
