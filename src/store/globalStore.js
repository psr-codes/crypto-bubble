import { create } from "zustand";

// Define your store
const globalStore = create((set) => ({
    activeTab: "day",
    setActiveTab: (activeTab) => set({ activeTab }),
}));

export default globalStore;
