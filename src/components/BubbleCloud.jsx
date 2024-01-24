import React, { useEffect, useState } from "react";
import { data } from "@/constants/change_in_crypto";

const FloatingBubbles = ({ method }) => {
    const sortedData = (data, method) => {
        if (!["day", "week", "month", "year"].includes(method)) {
            console.error(
                "Invalid sortBy argument. Use 'day', 'week', 'month', or 'year'."
            );
            return data; // Return the original array if the argument is invalid
        }

        // Sort the array based on the provided sortBy argument
        return data.sort((a, b) => {
            const changeA = a[`change_${method}`];
            const changeB = b[`change_${method}`];

            return changeB - changeA; // Sorting in descending order
        });
    };
    var coinArr = [];
    useEffect(() => {
        coinArr = sortedData(data, method);
    }, []);

    // Example usage:
    // const sortedData = sortDataByChange(data, "day");
    var numberOfBubbles = 80;

    // console.log("method is :0", method);
    const [bubbles, setBubbles] = useState([]);
    const scaleFactor = 200;
    var percentageFactor = 0;

    const calculateRadius = (value) => {
        const radius = (value / percentageFactor) * scaleFactor;
        return Math.max(radius, 60);
    };

    useEffect(() => {
        const changes = coinArr.map((entry) => entry[method]);
        const maxChange = Math.max(...changes);
        percentageFactor = maxChange;

        const initialBubbles = Array.from(
            { length: numberOfBubbles },
            (_, index) => {
                const randomValue = coinArr[index]?.[method].toFixed(2);
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
                    text: randomValue,
                    radius: radius,
                };
            }
        );

        setBubbles(initialBubbles);
    }, []);

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
                            bubble.text > 0
                                ? "rgba(0, 255, 0, 0.3)"
                                : "rgba(255, 0, 0, 0.3)",
                        width: `${bubble.radius}px`,
                        height: `${bubble.radius}px`,
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        padding: "10px",
                    }}
                >
                    {bubble.text}%
                </div>
            ))}
        </div>
    );
};

export default FloatingBubbles;
