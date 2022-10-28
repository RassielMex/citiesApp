import { Button, Container } from "@mui/material";
import { useRef } from "react";
import Graph from "./components/Graph";
import { jsPDF } from "jspdf";
import { Stack } from "@mui/system";
import FileSaver from "file-saver";
import Selector from "./components/Selector";

function App() {
  const chartRef = useRef();

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
      <Selector />
      <Graph ref={chartRef} />
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
