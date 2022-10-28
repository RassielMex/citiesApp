import {
  Button,
  Container,
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
import { useDispatch, useSelector } from "react-redux";
import { fetchData, filter } from "./store/data-slice";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.data.value;
  });
  const filteredData = useSelector((state) => {
    return state.data.filtered;
  });
  const [citySelection, setCitySelection] = useState(0);
  const chartRef = useRef();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleChange = (e) => {
    //Check for actual select value
    const value = e.target.value;
    setCitySelection(value);
    //Get data according to selected value
    dispatch(filter(value));
  };

  const handleOnDownload = (e) => {
    //Get id for button clicked
    const id = e.target.id;
    //Converts chart canvas to URL base image
    const dataURL = chartRef.current.canvas.toDataURL("image/jpeg");
    //Obtain PDF or Image accordin to id button
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
    <Container>
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
    </Container>
  );
}

export default App;
