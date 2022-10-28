import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: {},
    filtered: {},
  },
  reducers: {
    replace: (state, action) => {
      state.value = action.payload;
      state.filtered = action.payload;
    },
    filter: (state, action) => {
      const selectedValue = action.payload;
      if (Object.keys(state.value).length > 0) {
        if (selectedValue > 0) {
          state.filtered = {
            cities: [state.value.cities[selectedValue - 1]],
            indicator1: [state.value.indicator1[selectedValue - 1]],
            indicator2: [state.value.indicator2[selectedValue - 1]],
          };
        } else {
          state.filtered = state.value;
        }
      }
    },
  },
});

export const fetchData = () => {
  return (dispatch) => {
    const API_ENDPOINT = "https://635a7cad6f97ae73a62e1637.mockapi.io/Cities";
    axios
      .get(API_ENDPOINT)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data[0];
          dispatch(replace(data));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const { replace, filter } = dataSlice.actions;

export default dataSlice.reducer;
