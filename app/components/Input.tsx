import React from "react";

interface InputProps {
    label: string;
    symbol: string;
    value: number;
    roundTo?: number;
    inverted?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
    label,
    symbol,
    value,
    inverted,
    roundTo,
    onChange,
}: InputProps) {
    return (
        <div className="flex justify-between m-1 mb-5">
            <h2 className="grow max-w-[25%] text-left">{label}:</h2>
            <div className="grow max-w-[73%] border border-gray-300 m-1 rounded-md h-fit">
                {inverted ? (
                    <div className="flex">
                        <input
                            className="rounded-l-md px-2 z-10 grow w-[calc(100%-40%)]"
                            type="number"
                            value={value.toFixed(roundTo ?? 0)}
                            onChange={onChange}
                        />
                        <div className="bg-gray-200 px-2 border-l-[1px] border-gray-300 rounded-r-[5px]">
                            {symbol}
                        </div>
                    </div>
                ) : (
                    <div className="flex">
                        <div className="bg-gray-200 px-2 rounded-l-[5px] border-r-[1px] border-gray-300">
                            {symbol}
                        </div>
                        <input
                            className="rounded-r-md px-2 grow w-[calc(100%-40%)]"
                            type="number"
                            value={value.toFixed(roundTo ?? 0)}
                            onChange={onChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
