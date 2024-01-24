import React from "react";
import { stats } from "@/constants/crypto_stats";
import { data } from "@/constants/change_in_crypto";
const CryptoTable = () => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-[85%] mx-auto z-999">
            <table className="w-full text-sm text-left rtl:text-right   text-white  font-semibold bg-[#1E2A31]  ">
                <thead className="text-xs   uppercase bg-gray-700    text-white  font-semibold">
                    <tr>
                        <th scope="col" className="p-4">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Market Cap
                        </th>
                        <th scope="col" className="px-6 py-3">
                            24h Volume
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Day
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Week
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Month
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Year
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Circulating Supply
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stats?.map((item, index) => (
                        <tr
                            className="   border-gray-700   hover:bg-gray-600"
                            key={index}
                        >
                            <td className="w-4 p-4">1.</td>
                            <th
                                scope="row"
                                className="px-6 py-4   whitespace-nowrap   text-white  font-semibold"
                            >
                                {item.coin_name}
                            </th>
                            <td className="px-6 py-4">
                                {item?.crypto_stats?.["Market Cap"]}$
                            </td>
                            <td className="px-6 py-4">
                                {item?.crypto_stats?.Open}$
                            </td>
                            <td className="px-6 py-4">
                                {item?.crypto_stats?.Volume}$
                            </td>

                            {data?.map((i) => {
                                if (i.coin_name === item.coin_name) {
                                    return (
                                        <td
                                            className={`px-6 py-4 border-b ${
                                                i.change_day >= 0 == 0
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }`}
                                        >
                                            {i.change_year.toFixed(2)}%
                                        </td>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            {data?.map((i) => {
                                if (i.coin_name === item.coin_name) {
                                    return (
                                        <td
                                            className={`px-6 py-4 border-b ${
                                                i.change_week >= 0 == 0
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }`}
                                        >
                                            {i.change_year.toFixed(2)}%
                                        </td>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            {data?.map((i) => {
                                if (i.coin_name === item.coin_name) {
                                    return (
                                        <td
                                            className={`px-6 py-4 border-b ${
                                                i.change_month >= 0 == 0
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }`}
                                        >
                                            {i.change_year.toFixed(2)}%
                                        </td>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            {data?.map((i) => {
                                if (i.coin_name === item.coin_name) {
                                    return (
                                        <td
                                            className={`px-6 py-4 border-b ${
                                                i.change_year >= 0 == 0
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }`}
                                        >
                                            {i.change_year.toFixed(2)}%
                                        </td>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            <td className="px-6 py-4">
                                {item?.crypto_stats?.["Circulating Supply"]}$
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;
