import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  id: 0,
  name: "", // Make sure to include all user fields
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.id = 0;
      state.name = "";
      localStorage.removeItem('user'); // Clear user from local storage
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
