import React, { useState } from "react";
import Tabs from "../components/Tabs";
import BubbleCloud from "../components/bubble/BubbleCloud";
import CryptoTable from "../components/CryptoTable";
import globalStore from "@/store/globalStore";
export default function Home() {
    const { activeTab, setActiveTab } = globalStore();

    return (
        <main className="  ">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="  ">
                <BubbleCloud method={activeTab} setActiveTab={setActiveTab} />
            </div>
            <CryptoTable />
        </main>
    );
}
