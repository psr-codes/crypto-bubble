import React, { useState } from "react";
import Tabs from "../components/Tabs";
import BubbleCloud from "../components/bubble/BubbleCloud";
import CryptoTable from "../components/CryptoTable";

import { stats } from "@/constants/crypto_stats";

import globalStore from "@/store/globalStore";
export default function Home() {
    const { activeTab, setActiveTab } = globalStore();

    return (
        <main className="  ">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="  ">
                <BubbleCloud method={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="w-full mx-auto  flex justify-center">
                <CryptoTable stats={stats} />
            </div>
        </main>
    );
}
