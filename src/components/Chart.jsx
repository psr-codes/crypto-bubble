import { day_stats } from "@/constants/day_stats";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { data } from "@/constants/change_in_crypto";
import { stats } from "@/constants/crypto_stats";

const DynamicPlot = dynamic(() => import("react-plotly.js"), {
    ssr: false, // Disable server-side rendering
});

const CandlestickChart = ({ bubble, timeScale }) => {
    if (!bubble || !timeScale) {
        return;
    }
    const [candlestickData, setCandlestickData] = useState(null);
    console.log("coin name", bubble?.text?.[1]);

    // const fetchData = async () => {
    //     try {
    //         const res = await fetch(
    //             `https://cryptostats.onrender.com/${timeScale}-stats`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     coin: bubble.text[1],
    //                 }),
    //             }
    //         );

    //         if (!res.ok) {
    //             throw new Error(
    //                 `Failed to fetch data: ${res.status} ${res.statusText}`
    //             );
    //         }

    //         const data = await res.json();
    //         console.log("data", data);
    //         setCandlestickData(data);
    //     } catch (error) {
    //         console.error("Fetch error:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [timeScale]);
    return (
        <div className="relative">
            {candlestickData && (
                <DynamicPlot
                    className="  p-0 m-0"
                    data={[
                        {
                            type: "candlestick",
                            x: candlestickData.map((item) => item.Date),
                            open: candlestickData.map((item) => item.Open),
                            high: candlestickData.map((item) => item.High),
                            low: candlestickData.map((item) => item.Low),
                            close: candlestickData.map((item) => item.Close),
                            increasing: {
                                line: { color: "green", width: 1 },
                                opacity: 0.5,
                            },
                            decreasing: {
                                line: { color: "red", width: 1 },
                                opacity: 0.5,
                            },
                        },
                    ]}
                    layout={{
                        title: bubble.text[1],
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
            )}
            <div className=" absolute bottom-[20px] w-full">
                {data?.map((i, ind) => {
                    if (i.coin_name === bubble?.text?.[1]) {
                        return (
                            <div
                                className="flex justify-evenly items-center p-0 m-0 w-full"
                                key={ind}
                            >
                                <div className="text-white flex-col justify-center items-center font-bold">
                                    <p className="">Day</p>
                                    <p
                                        className={`${
                                            i.change_volume >= 0
                                                ? "text-green-400"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {i.change_day.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-white flex-col justify-center items-center font-bold">
                                    <p className="">Week</p>
                                    <p
                                        className={` ${
                                            i.change_week >= 0
                                                ? "text-green-400"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {i.change_week.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-white flex-col justify-center items-center font-bold">
                                    <p className="">Month</p>
                                    <p
                                        className={` ${
                                            i.change_month >= 0
                                                ? "text-green-400"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {i.change_month.toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-white flex-col justify-center items-center font-bold">
                                    <p className="">Year</p>
                                    <p
                                        className={` ${
                                            i.change_year >= 0
                                                ? "text-green-400"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {i.change_year.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className=" absolute top-[0] w-full">
                {stats?.map((i, ind) => {
                    if (i.coin_name === bubble?.text?.[1]) {
                        return (
                            <div
                                className="flex justify-between px-[90px] items-center p-0 m-0 w-full"
                                key={ind}
                            >
                                <div className="text-white flex-col justify-center items-center font-bold">
                                    <p className="text-gray-300">Volume</p>
                                    <p>{i?.crypto_stats?.["Volume"]}</p>
                                </div>
                                <div className="text-white flex-col justify-center items-center font-bold">
                                    <p className="text-gray-300">Market Cap</p>
                                    <p>{i?.crypto_stats?.["Market Cap"]}</p>
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};

const CandlestickPage = ({ bubble }) => {
    var timeScale = "month";
    console.log("bubble", bubble);
    return (
        <div>
            <CandlestickChart
                // candlestickData={candlestickData}
                bubble={bubble}
                timeScale={timeScale}
            />
        </div>
    );
};

export default CandlestickPage;
