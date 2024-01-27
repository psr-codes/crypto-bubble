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

import { X } from "lucide-react";
import styles from "./bubbleStyle.module.css";

import { symbols } from "@/constants/crypto_logo";

// function DrawerDemo({
//     bubble,
//     key,
//     isModalOpen,
//     setIsModalOpen,
//     activeBubble,
//     setActiveBubble,
// }) {
//     return (
//         <Drawer key={key} className="">
//             <DrawerTrigger asChild>

//                 {/* <BubbleComponent /> */}
//             </DrawerTrigger>
//             {/* <DrawerContent className="text-white bg-black  mx-auto opacity-85 flex justify-center items-center">
//                 <CandlestickPage bubble={bubble} />
//             </DrawerContent> */}
//         </Drawer>
//     );
// }

const FloatingBubbles = ({ method, setActiveTab }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeBubble, setActiveBubble] = useState(null);
    const [coinArr, setCoinArr] = useState(data);
    const [field, setField] = useState("change_day");
    const sortedData = (data, field) => {
        console.log("Sorting data...");
        const sortedArray = data.slice().sort((a, b) => {
            const changeA = Math.abs(a[field]);
            const changeB = Math.abs(b[field]);
            return changeB - changeA; // Sorting in descending order of magnitude
        });
        // console.log("Data sorted:", sortedArray);
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

    // useEffect(() => {
    //     console.log("coinArr", coinArr);
    // }, [coinArr]);
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

        const initialBubbles = Array.from(
            { length: numberOfBubbles },
            (_, index) => {
                const randomValue = coinArr[index]?.[field].toFixed(2);
                const radius = calculateRadius(Math.abs(randomValue), method);

                // Calculate initial positions within the visible screen area
                const initialTop =
                    Math.random() * (window.innerHeight - radius);
                const initialLeft =
                    Math.random() * (window.innerWidth - radius);

                return {
                    id: index + 1,
                    top: initialTop,
                    left: initialLeft,
                    velocityX: Math.random() * 1 - 1,
                    velocityY: Math.random() * 1 - 1,
                    text: [randomValue, coinArr[index]["coin_name"]],
                    symbol: symbols.cryptocurrencies.find(
                        (item) => item.name === coinArr[index]["coin_name"]
                    ),
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

                    // Reverse velocity and adjust position if bubble hits window edges
                    if (
                        newTop < 0 ||
                        newTop + bubble.radius > window.innerHeight
                    ) {
                        bubble.velocityY *= -1; // Reverse Y velocity
                        newTop = Math.max(
                            0,
                            Math.min(window.innerHeight - bubble.radius, newTop)
                        ); // Keep bubble within window boundaries
                    }

                    if (
                        newLeft < 0 ||
                        newLeft + bubble.radius > window.innerWidth
                    ) {
                        bubble.velocityX *= -1; // Reverse X velocity
                        newLeft = Math.max(
                            0,
                            Math.min(window.innerWidth - bubble.radius, newLeft)
                        ); // Keep bubble within window boundaries
                    }

                    return { ...bubble, top: newTop, left: newLeft };
                });
            });
        };

        const intervalId = setInterval(updateBubbles, 16);

        if (isModalOpen) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isModalOpen]);

    return (
        <div className="relative max-w-[100vw] flex justify-center items-center h-[85vh] overflow-hidden">
            {bubbles.map((bubble, index) => (
                // <DrawerDemo
                //     bubble={bubble}
                //     key={index}
                //     isModalOpen={isModalOpen}
                //     setIsModalOpen={setIsModalOpen}
                //     setActiveBubble={setActiveBubble}
                //     activeBubble={activeBubble}
                // />
                <section
                    onClick={() => {
                        setIsModalOpen(true);
                        setActiveBubble(bubble.text[1]);
                    }}
                    key={index}
                    // className={`floating-bubble    transition-all duration-500 ease-in-out `}
                    className={`${styles.stage} cursor-pointer floating-bubble    transition-all duration-500 ease-in-out bg-transparent `}
                    style={{
                        top: bubble.top,
                        left: bubble.left,

                        backgroundColor: "transparent",
                        width: `${bubble.radius}px`,
                        height: `${bubble.radius}px`,
                        backdropFilter: "blur(10px)",
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
            ))}

            {isModalOpen && activeBubble && (
                <div className="absolute   w-[75%] bottom-0 h-full text-white bg-black  mx-auto opacity-85 flex justify-center items-center">
                    <p
                        className="absolute top-5 right-5"
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                    >
                        <X size={30} />
                    </p>

                    <div className="w-full">
                        <CandlestickPage
                            // bubble={bubble}
                            bubble={activeBubble}
                            method={method}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FloatingBubbles;
