import { day_stats } from "@/constants/day_stats";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { data } from "@/constants/change_in_crypto";
import { stats } from "@/constants/crypto_stats";
import axios from "axios";
import globalStore from "@/store/globalStore";

const DynamicPlot = dynamic(() => import("react-plotly.js"), {
    ssr: false, // Disable server-side rendering
});

const CandlestickChart = ({ bubble }) => {
    const { activeTab, setActiveTab } = globalStore();

    const [candlestickData, setCandlestickData] = useState(null);

    console.log("coin name", bubble);

    useEffect(() => {
        if (!bubble) {
            return;
        }

        const url = `https://cryptostats.onrender.com/${activeTab}-stats`;
        axios
            .post(
                url,
                { name: bubble },
                { headers: { "Content-Type": "application/json" } }
            )
            .then((response) => {
                // Handle successful response
                console.log(response.data.data);
                console.log("timescale_${stats}", `${activeTab}_stats`);

                setCandlestickData(response.data.data[0][`${activeTab}_stats`]);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    }, [activeTab, bubble]);
    return (
        <div className="relative    w-full h-full">
            {candlestickData && (
                <DynamicPlot
                    className="  p-0 m-0"
                    data={[
                        {
                            type: "candlestick",
                            // x: candlestickData.map((item) => item.Date),
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
                        title: bubble,
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
                    if (i.coin_name === bubble) {
                        return (
                            <div
                                className="flex justify-evenly items-center p-0 m-0 w-full"
                                key={ind}
                            >
                                <div
                                    className={`text-white flex-col justify-center items-center font-bold cursor-pointer ${
                                        activeTab == "day"
                                            ? "bg-gray-700 px-3"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setActiveTab("day");
                                    }}
                                >
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

                                <div
                                    className={`text-white flex-col justify-center items-center font-bold cursor-pointer ${
                                        activeTab == "week"
                                            ? "bg-gray-700 px-3"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setActiveTab("week");
                                    }}
                                >
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
                                <div
                                    className={`text-white flex-col justify-center items-center font-bold cursor-pointer ${
                                        activeTab == "month"
                                            ? "bg-gray-700 px-3"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setActiveTab("month");
                                    }}
                                >
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
                                <div
                                    className={`text-white flex-col justify-center items-center font-bold cursor-pointer ${
                                        activeTab == "year"
                                            ? "bg-gray-700 px-3"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setActiveTab("year");
                                    }}
                                >
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
                    if (i.coin_name === bubble) {
                        return (
                            <div
                                className="flex justify-between px-[90px] items-center p-0 m-0 w-full"
                                key={ind}
                            >
                                <div className="text-white flex-col justify-center items-center font-bold cursor-pointer">
                                    <p className="text-gray-300">Volume</p>
                                    <p>{i?.crypto_stats?.["Volume"]}</p>
                                </div>
                                <div className="text-white flex-col justify-center items-center font-bold cursor-pointer">
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
    var activeTab = "month";
    console.log("bubble", bubble);
    return (
        <div className="bg-gray-700 m-1 rounded-md">
            <CandlestickChart bubble={bubble} />
        </div>
    );
};

export default CandlestickPage;
