import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, filter } from "../store/data-slice";

const Selector = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.data.value;
  });

  const [citySelection, setCitySelection] = useState(0);

  const handleChange = (e) => {
    //Check for actual select value
    const value = e.target.value;
    setCitySelection(value);
    //Get data according to selected value
    dispatch(filter(value));
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">City</InputLabel>
      <Select
        labelId="select-label"
        id="select-city"
        label="City"
        value={citySelection}
        onChange={handleChange}
      >
        <MenuItem value={0} selected>
          Todos
        </MenuItem>
        {data?.cities?.map((city, index) => {
          return (
            <MenuItem key={index} value={index + 1}>
              {city}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Selector;
