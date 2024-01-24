import React from "react";

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
                            Hour
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
                    </tr>
                </thead>
                <tbody>
                    <tr className="   border-gray-700   hover:bg-gray-600">
                        <td className="w-4 p-4">1.</td>
                        <th
                            scope="row"
                            className="px-6 py-4   whitespace-nowrap   text-white  font-semibold"
                        >
                            Bitcoin
                        </th>

                        <td className="px-6 py-4">4554$</td>
                        <td className="px-6 py-4">461655$</td>
                        <td className="px-6 py-4">4856662$</td>
                        <td className="px-6 py-4">+5.5%</td>
                        <td className="px-6 py-4">+5.5%</td>
                        <td className="px-6 py-4">+5.5%</td>
                        <td className="px-6 py-4">+5.5%</td>
                        <td className="px-6 py-4">+5.5%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;
