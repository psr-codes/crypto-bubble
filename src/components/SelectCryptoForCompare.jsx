"use client";

import React, { useState, useEffect } from "react";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Check, MoveVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { symbols } from "@/constants/crypto_logo";

// const symbols.cryptocurrencies = [
//     {
//         value: "next.js",
//         name: "Next.js",
//     },
//     {
//         value: "sveltekit",
//         name: "SvelteKit",
//     },
//     {
//         value: "nuxt.js",
//         name: "Nuxt.js",
//     },
//     {
//         value: "remix",
//         name: "Remix",
//     },
//     {
//         value: "astro",
//         name: "Astro",
//     },
// ];

export default function ComboboxDemo() {
    const [open, setOpen] = useState(false);
    const [selectedCoins, setSelectedCoins] = useState([]);

    useEffect(() => {
        console.log("selected coins", selectedCoins);
    }, [selectedCoins]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="text-white">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    Select coin...
                    {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                    <X
                        className="ml-2 h-4 w-4 shrink-0 opacity-50"
                        onClick={() => {
                            setOpen(false);
                        }}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 text-white ">
                <Command>
                    <CommandInput
                        placeholder="Search coin..."
                        className="h-9"
                    />
                    <CommandEmpty>No coin found.</CommandEmpty>
                    <CommandGroup>
                        {symbols.cryptocurrencies.map((coin) => (
                            <CommandItem
                                key={coin.name}
                                value={coin.name}
                                className="  flex justify-start items-center"
                                onSelect={() => {
                                    if (!selectedCoins.includes(coin.name)) {
                                        setSelectedCoins([
                                            ...selectedCoins,
                                            coin.name,
                                        ]);
                                    } else {
                                        setSelectedCoins(
                                            selectedCoins.filter(
                                                (coin) => coin !== coin.name
                                            )
                                        );
                                    }
                                }}
                            >
                                <p>{coin.name}</p>
                                <Check
                                    className={` ml-auto h-4 w-4"
                                        ${
                                            selectedCoins.includes(coin.name)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
