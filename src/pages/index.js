import Image from "next/image";
import { Inter } from "next/font/google";
import Tabs from "../components/Tabs";
import BubbleCloud from "../components/BubbleCloud";
import CryptoTable from "../components/CryptoTable";
export default function Home() {
    return (
        <main>
            <Tabs />
            <BubbleCloud />
            <CryptoTable />
        </main>
    );
}
