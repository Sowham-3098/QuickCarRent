import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
  },
});

export const { setBookings, addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
