import React, { useState } from "react";
import Tabs from "../components/Tabs";
import BubbleCloud from "../components/BubbleCloud";
import CryptoTable from "../components/CryptoTable";

export default function Home() {
    const [activeTab, setActiveTab] = useState("day");

    return (
        <main>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className=" ">
                <BubbleCloud method={activeTab} />
            </div>
            <CryptoTable />
        </main>
    );
}
