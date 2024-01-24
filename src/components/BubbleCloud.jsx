import React, { useEffect, useState } from "react";
import { data } from "@/constants/change_in_crypto";

const FloatingBubbles = ({ method }) => {
    const [coinArr, setCoinArr] = useState(data);
    const [field, setField] = useState("change_day");
    const sortedData = (data, field) => {
        console.log("Sorting data...");
        const sortedArray = data.slice().sort((a, b) => {
            const changeA = a[field];
            const changeB = b[field];
            return changeB - changeA; // Sorting in descending order
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
    var numberOfBubbles = 80;

    const [bubbles, setBubbles] = useState([]);
    const scaleFactor = 200;
    var percentageFactor = 0;

    const calculateRadius = (value) => {
        const radius = (value / percentageFactor) * scaleFactor;
        return Math.max(radius, 60);
    };

    useEffect(() => {
        if (!coinArr.length) return;
        const changes = coinArr.map((entry) => entry[field]);
        const maxChange = Math.max(...changes);
        percentageFactor = maxChange;

        const initialBubbles = Array.from(
            { length: numberOfBubbles },
            (_, index) => {
                const randomValue = coinArr[index]?.[field].toFixed(2);
                const radius = calculateRadius(
                    Math.abs(randomValue),
                    maxChange
                );

                return {
                    id: index + 1,
                    top: Math.random() * (window.innerHeight - radius),
                    left: Math.random() * (window.innerWidth - radius),
                    velocityX: Math.random() * 2 - 1,
                    velocityY: Math.random() * 2 - 1,
                    text: [randomValue, coinArr[index]["coin_name"]],
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
            {bubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className={`floating-bubble    transition-all duration-500 ease-in-out `}
                    style={{
                        top: bubble.top,
                        left: bubble.left,
                        backgroundColor:
                            bubble.text[0] > 0
                                ? "rgba(0, 255, 0, 0.3)"
                                : "rgba(255, 0, 0, 0.3)",
                        width: `${bubble.radius}px`,
                        height: `${bubble.radius}px`,
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        padding: "10px",
                    }}
                >
                    <div className="flex-col justify-center items-center mx-auto">
                        <p className="text-xs mx-auto">{bubble?.text[1]}</p>
                        <p>{bubble?.text[0]}%</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FloatingBubbles;
