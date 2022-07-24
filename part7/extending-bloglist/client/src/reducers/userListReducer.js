import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userListSlice = createSlice({
  name: "userList",
  initialState: null,
  reducers: {
    getAllUsers(state, action) {
      return action.payload;
    },
  },
});

export const { getAllUsers } = userListSlice.actions;

export const initializeUserList = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(getAllUsers(users));
  };
};

export default userListSlice.reducer;
