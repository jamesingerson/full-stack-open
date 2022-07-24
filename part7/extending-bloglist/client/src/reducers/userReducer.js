import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const activeUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;
