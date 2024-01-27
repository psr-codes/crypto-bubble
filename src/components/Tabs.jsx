import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

import { tabsData } from "@/constants/data";

export default function TabsDemo({ activeTab, setActiveTab }) {
    const handleValueChange = (value) => {
        if (value === "compare") {
            return;
        }
        console.log(value);
        setActiveTab(value);
    };

    useEffect(() => {
        console.log("active tab changed", activeTab);
    }, [activeTab]);

    const router = useRouter();
    const handleRedirectToCompare = () => {
        router.push("/compare");
    };
    return (
        <Tabs
            defaultValue="account"
            className="w-[400px] ml-10 p-0 m-0 "
            onValueChange={(value) => {
                handleValueChange(value);
            }}
        >
            <TabsList className="grid w-full grid-cols-5 ">
                {tabsData.map((tab) => (
                    <TabsTrigger
                        value={tab.value}
                        key={tab.id}
                        className={`text-white py-2 px-2 text-xl mx-[2px] rounded-b-lg`}
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

                <TabsTrigger
                    value="compare"
                    className={`text-white py-2 px-2 w-fit text-xl mx-[2px] rounded-b-lg`}
                    style={{
                        borderTop: "none",
                        borderRight:
                            activeTab === "compare"
                                ? "2px solid #33ff33"
                                : "2px solid orange",
                        borderBottom:
                            activeTab === "compare"
                                ? "2px solid #33ff33"
                                : "2px solid orange",

                        borderLeft:
                            activeTab === "compare"
                                ? "2px solid #33ff33"
                                : "2px solid orange",

                        backgroundColor:
                            activeTab === "compare" ? "#228822" : "transparent",
                    }}
                    onClick={() => {
                        handleRedirectToCompare();
                    }}
                >
                    Compare
                </TabsTrigger>
            </TabsList>
            <TabsContent value="day"></TabsContent>
            <TabsContent value="week"></TabsContent>
            <TabsContent value="month"></TabsContent>
            <TabsContent value="year"></TabsContent>
        </Tabs>
    );
}
