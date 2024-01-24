import React, { useState } from "react";
import Tabs from "../components/Tabs";
import BubbleCloud from "../components/BubbleCloud";
import CryptoTable from "../components/CryptoTable";

import { tabsData } from "@/constants/data";

export default function Home() {
    const [activeTab, setActiveTab] = useState("day");

    return (
        <main>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className=" ">
                <BubbleCloud
                    method={
                        tabsData.find((tab) => tab.value === activeTab).method
                    }
                />
            </div>
            <CryptoTable />
        </main>
    );
}
