import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
    {
        id: 1,
        name: "Day",
        value: "day",
    },
    {
        id: 2,
        name: "Week",
        value: "week",
    },
    {
        id: 3,
        name: "Month",
        value: "month",
    },
    {
        id: 4,
        name: "Year",
        value: "year",
    },
];
export default function TabsDemo() {
    const [activeTab, setActiveTab] = useState("day");
    const handleValueChange = (value) => {
        console.log(value);
        setActiveTab(value);
    };

    useEffect(() => {
        console.log("active tab changed", activeTab);
    }, [activeTab]);
    return (
        <Tabs
            defaultValue="account"
            className="w-[400px] ml-10 p-0 m-0 "
            onValueChange={(value) => {
                handleValueChange(value);
            }}
        >
            <TabsList className="grid w-full grid-cols-4 ">
                {tabs.map((tab) => (
                    <TabsTrigger
                        value={tab.value}
                        key={tab.id}
                        className={`text-white py-2 text-xl mx-[2px] rounded-b-lg`}
                        style={{
                            borderTop: "none",
                            borderRight:
                                activeTab === tab.value
                                    ? "2px solid #33ff33"
                                    : "2px solid orange",
                            borderBottom:
                                activeTab === tab.value
                                    ? "2px solid #33ff33"
                                    : "2px solid orange",

                            borderLeft:
                                activeTab === tab.value
                                    ? "2px solid #33ff33"
                                    : "2px solid orange",

                            backgroundColor:
                                activeTab === tab.value
                                    ? "#228822"
                                    : "transparent",
                        }}
                    >
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="day"></TabsContent>
            <TabsContent value="week"></TabsContent>
            <TabsContent value="month"></TabsContent>
            <TabsContent value="year"></TabsContent>
        </Tabs>
    );
}
