import { day_stats } from "@/constants/day_stats";
import dynamic from "next/dynamic";
import axios from "axios";
import { useEffect, useState } from "react";

const DynamicPlot = dynamic(() => import("react-plotly.js"), {
  ssr: false, // Disable server-side rendering
});

const CandlestickChart = ({ candlestickData }) => {
  return (
    <DynamicPlot
      data={[
        {
          type: "candlestick",
          x: candlestickData.map((item) => item.Date),
          open: candlestickData.map((item) => item.Open),
          high: candlestickData.map((item) => item.High),
          low: candlestickData.map((item) => item.Low),
          close: candlestickData.map((item) => item.Close),
          increasing: { line: { color: "green", width: 1 }, opacity: 0.5 },
          decreasing: { line: { color: "red", width: 1 }, opacity: 0.5 },
        },
      ]}
      layout={{
        title: "Candlestick Chart",
        plot_bgcolor: "rgba(0,0,0,0)", // Make the plot background transparent
        paper_bgcolor: "rgba(0,0,0,0)", // Make the paper background transparent
        font: { color: "white" }, // Set the font color to white for better visibility
        xaxis: {
          gridcolor: "rgba(255,255,255,0.1)", // Set the x-axis grid color
        },
        yaxis: {
          gridcolor: "rgba(255,255,255,0.1)", // Set the y-axis grid color
        },
      }}
    />
  );
};

const CandlestickPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [candlestickData, setCandlestickData] = useState(
    day_stats[0].day_stats
  );

  useEffect(() => {
    // Define the URL and name to send in the POST request
    const apiUrl = "https://cryptostats.onrender.com/week-stats";
    const name = "Aeternity";

    // Send the POST request using Axios
    axios
      .post(
        apiUrl,
        { name: name },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        // Handle successful response
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

  return (
    <div>
      <h1>Candlestick Chart Example</h1>
      <CandlestickChart candlestickData={candlestickData} />
    </div>
  );
};

export default CandlestickPage;
