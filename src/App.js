import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Graph from "./components/Graph";

function App() {
  const data = {
    cities: ["Merida", "Guadalajara", "Nuevo Leon"],
    indicator1: [3, 4, 5],
    indicator2: [5, 6, 7],
  };

  const [cityFilter, setCityFilter] = useState(0);
  const [filteredData, setFilteredData] = useState(data);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === 0) {
      console.log("Default");
      setFilteredData(data);
    } else {
      console.log("Other");
      setFilteredData({
        cities: [data.cities[value - 1]],
        indicator1: [data.indicator1[value - 1]],
        indicator2: [data.indicator2[value - 1]],
      });
    }

    setCityFilter(value);
  };

  return (
    <div className="App">
      <FormControl fullWidth>
        <InputLabel id="select-label">City</InputLabel>
        <Select
          labelId="select-label"
          id="select-city"
          label="City"
          value={cityFilter}
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

      <Graph data={filteredData} />
    </div>
  );
}

export default App;
