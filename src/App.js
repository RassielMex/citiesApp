import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Graph from "./components/Graph";
import { jsPDF } from "jspdf";
import { Stack } from "@mui/system";
import FileSaver from "file-saver";
import axios from "axios";

function App() {
  const API_ENDPOINT = "https://635a7cad6f97ae73a62e1637.mockapi.io/Cities";

  const [data, setData] = useState([]);
  const [citySelection, setCitySelection] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    axios
      .get(API_ENDPOINT)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data[0]);
          setFilteredData(res.data[0]);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === 0) {
      setFilteredData(data);
    } else {
      setFilteredData({
        cities: [data.cities[value - 1]],
        indicator1: [data.indicator1[value - 1]],
        indicator2: [data.indicator2[value - 1]],
      });
    }

    setCitySelection(value);
  };

  const handleOnDownload = (e) => {
    const id = e.target.id;
    const dataURL = chartRef.current.canvas.toDataURL("image/jpeg");
    if (id === "btn_PDF") {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1280, 720],
      });

      doc.addImage(dataURL, "JPEG", 0, 0, 1280, 720);
      doc.save("graph");
    } else {
      FileSaver.saveAs(dataURL, "graph.jpeg");
    }
  };

  return (
    <div className="App">
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

      <Graph data={filteredData} ref={chartRef} />
      <Stack spacing={2} direction={"row"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOnDownload}
          id="btn_PDF"
        >
          Download as PDF
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOnDownload}
          id="btn_image"
        >
          Download as image
        </Button>
      </Stack>
    </div>
  );
}

export default App;
