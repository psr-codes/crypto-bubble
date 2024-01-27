import React, { useEffect, useState } from "react";
import { data } from "@/constants/change_in_crypto";
import CandlestickPage from "@/components/Chart";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import styles from "./bubbleStyle.module.css";

import { symbols } from "@/constants/crypto_logo";

function DrawerDemo({ bubble, key }) {
    return (
        <Drawer key={key} className="">
            <DrawerTrigger asChild>
                <section
                    key={bubble.id}
                    // className={`floating-bubble    transition-all duration-500 ease-in-out `}
                    className={`${styles.stage} cursor-pointer floating-bubble    transition-all duration-500 ease-in-out bg-transparent `}
                    style={{
                        top: bubble.top,
                        left: bubble.left,
                        // backgroundColor:
                        //     bubble.text[0] > 0
                        //         ? "rgba(0, 255, 0, 0.3)"
                        //         : "rgba(255, 0, 0, 0.3)",
                        backgroundColor: "transparent",
                        width: `${bubble.radius}px`,
                        height: `${bubble.radius}px`,
                        backdropFilter: "blur(10px)",
                        // border: "1px solid rgba(255, 255, 255, 0.5)",
                        // padding: "10px",
                    }}
                >
                    <figure
                        //  className="flex-col justify-center items-center mx-auto"
                        className={`${styles.bubble} ${styles.ball} relative`}
                        style={{
                            backgroundColor:
                                bubble.text[0] > 0
                                    ? "rgba(0, 255, 0, 0.2)"
                                    : "rgba(255, 0, 0, 0.3)",
                        }}
                    >
                        {/* <p className="text-xs mx-auto">{bubble?.text[1]}</p> */}
                        <div
                            className="text-xs absolute  w-full h-full  mx-auto text-center flex-col justify-center items-center"
                            style={{
                                // transform: "translateY(-50%) ",
                                top: "40%",
                                // left: "50%",
                            }}
                        >
                            <p>{bubble?.symbol?.symbol}</p>
                            <p>{bubble?.text[0]}%</p>
                        </div>
                    </figure>
                </section>

                {/* <BubbleComponent /> */}
            </DrawerTrigger>
            <DrawerContent className="text-white bg-black  mx-auto opacity-85 flex justify-center items-center">
                <CandlestickPage bubble={bubble} />
            </DrawerContent>
        </Drawer>
    );
}

const FloatingBubbles = ({ method }) => {
    const [coinArr, setCoinArr] = useState(data);
    const [field, setField] = useState("change_day");
    const sortedData = (data, field) => {
        console.log("Sorting data...");
        const sortedArray = data.slice().sort((a, b) => {
            const changeA = Math.abs(a[field]);
            const changeB = Math.abs(b[field]);
            return changeB - changeA; // Sorting in descending order of magnitude
        });
        console.log("Data sorted:", sortedArray);
        return sortedArray;
    };

    useEffect(() => {
        if (!["day", "week", "month", "year"].includes(method)) {
            console.error(
                "Invalid sortBy argument. Use 'day', 'week', 'month', or 'year'.",
                method
            );
            return;
        }

        setField(`change_${method}`);
        console.log("method", method);
    }, [method]);

    useEffect(() => {
        setCoinArr(sortedData(data, field));
    }, [field]);

    useEffect(() => {
        console.log("coinArr", coinArr);
    }, [coinArr]);
    // Example usage:
    // const sortedData = sortDataByChange(data, "day");
    var numberOfBubbles = 50;

    const [bubbles, setBubbles] = useState([]);

    const calculateRadius = (value, method) => {
        var scaleFactor = 0;
        switch (method) {
            case "day":
                scaleFactor = 10;
                break;
            case "week":
                scaleFactor = 5;
                break;
            case "month":
                scaleFactor = 2;
                break;
            case "year":
                scaleFactor = 1;
                break;
            default:
                scaleFactor = 0;
        }
        const radius = Math.min(value * scaleFactor, 200);

        return Math.max(radius, 60);
    };

    useEffect(() => {
        if (!coinArr.length) return;
        const changes = coinArr.map((entry) => entry[field]);
        const maxChange = Math.max(...changes);
        // percentageFactor = maxChange;

        const initialBubbles = Array.from(
            { length: numberOfBubbles },
            (_, index) => {
                const randomValue = coinArr[index]?.[field].toFixed(2);
                const radius = calculateRadius(Math.abs(randomValue), method);

                return {
                    id: index + 1,
                    top: Math.random() * (window.innerHeight - radius),
                    left: Math.random() * (window.innerWidth - radius),
                    velocityX: Math.random() * 3 - 1,
                    velocityY: Math.random() * 3 - 1,
                    text: [randomValue, coinArr[index]["coin_name"]],
                    symbol: symbols.cryptocurrencies.find((item) => {
                        if (item.name === coinArr[index]["coin_name"]) {
                            return item.symbol;
                        }
                        return null; // Handle the case when the condition isn't met
                    }),
                    radius: radius,
                };
            }
        );

        setBubbles(initialBubbles);
    }, [coinArr]);

    useEffect(() => {
        const updateBubbles = () => {
            setBubbles((prevBubbles) => {
                return prevBubbles.map((bubble) => {
                    let newTop = bubble.top + bubble.velocityY;
                    let newLeft = bubble.left + bubble.velocityX;

                    // Check for collisions with window edges
                    if (newTop < 0) {
                        newTop = 0; // Restrict to the top of the window
                        bubble.velocityY *= -1; // Reverse Y velocity on collision
                    } else if (newTop > window.innerHeight - 200) {
                        newTop = window.innerHeight - 200; // Restrict to 85vh from the top
                        bubble.velocityY *= -1; // Reverse Y velocity on collision
                    }

                    // Check for collisions with window edges
                    if (newLeft < 0) {
                        newLeft = 0; // Restrict to the left of the window
                        bubble.velocityX *= -1; // Reverse X velocity on collision
                    } else if (newLeft > window.innerWidth - 90) {
                        newLeft = window.innerWidth - 90; // Restrict to the width of the window
                        bubble.velocityX *= -1; // Reverse X velocity on collision
                    }

                    return { ...bubble, top: newTop, left: newLeft };
                });
            });
        };

        const intervalId = setInterval(updateBubbles, 16);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="relative w-[100vw]  h-[85vh]">
            {bubbles.map((bubble, index) => (
                <DrawerDemo bubble={bubble} key={index} />
            ))}
        </div>
    );
};

export default FloatingBubbles;
