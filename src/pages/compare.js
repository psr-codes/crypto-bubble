import React, { useState } from "react";
import { X } from "lucide-react";
import SelectCryptoForCompare from "@/components/SelectCryptoForCompare";
import CryptoTable from "@/components/CryptoTable2";
import CompareChart from "@/components/compare-page/CompareCharts";

import { stats } from "@/constants/crypto_stats";

const Page = () => {
  const [selectedCoins, setSelectedCoins] = useState([]);

  const stats1 = stats.filter((coin) => {
    if (selectedCoins.includes(coin.coin_name)) {
      return coin;
    }
  });

  return (
    <section className=" grid grid-cols-7 w-screen my-2">
      <div className="col-span-6 my-2">
        {selectedCoins.length && (
          <div className=" justify-start  ">
            {<CryptoTable stats={stats1} />}
          </div>
        )}

        <div className="max-w-[85%] my-2">
          {selectedCoins.map((coin, index) => (
            <div key={index} className="rounded-md">
              <CompareChart bubble={coin} />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1  min-h-[90vh] rounded-md p-1 bg-gray-700">
        <div className="py-2">
          <SelectCryptoForCompare
            selectedCoins={selectedCoins}
            setSelectedCoins={setSelectedCoins}
          />
        </div>
        <div className="grid grid-cols-1 text-gray-200 py-5  ">
          {selectedCoins.map((coin, index) => (
            <p
              key={index}
              className="col-span-1 pl-5 pr-7 font-semibold flex justify-between items-center"
            >
              <span>{coin}</span>
              <X
                className="mr-2 m-1"
                size={15}
                onClick={() => {
                  setSelectedCoins(selectedCoins.filter((c) => c !== coin));
                }}
              />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
