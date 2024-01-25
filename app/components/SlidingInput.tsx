import React from "react";
import { useState } from "react";

interface SlidingInputProps {
    label: string;
    symbol: string;
    secondSymbol?: string;
    value: number;
    secondValue?: number;
    split?: boolean;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    secondOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    thirdOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SlidingInput({
    label,
    symbol,
    secondSymbol,
    value,
    secondValue,
    split,
    min,
    max,
    step,
    onChange,
    secondOnChange,
}: SlidingInputProps) {
    const [onFocusOne, setOnFocusOne] = useState(false);
    const [onFocusTwo, setOnFocusTwo] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const [secondLocalValue, setSecondLocalValue] = useState(secondValue);

    return (
        <div>
            <div className="flex justify-between m-1 mb-5">
                <h2 className="grow max-w-[25%] text-left">{label}:</h2>
                <div className="grow max-w-[73%] border border-gray-300 m-1 rounded-md">
                    {split ? (
                        <div className="flex border rounded-md">
                            <div className="bg-gray-200 px-2 rounded-l-md border-r-[1px] border-gray-300">
                                {symbol}
                            </div>
                            <input
                                className="pl-2 grow w-[calc(100%-40%)]"
                                type="number"
                                value={
                                    onFocusOne ? localValue : value.toFixed(2)
                                }
                                onChange={(e) => {
                                    onChange?.(e);
                                    setLocalValue(parseFloat(e.target.value));
                                }}
                                onFocus={() => {
                                    setOnFocusOne(true);
                                    setLocalValue(
                                        parseFloat(
                                            (value?.toFixed(2) ?? 0).toString()
                                        )
                                    );
                                }}
                                onBlur={() => {
                                    setOnFocusOne(false);
                                }}
                            />
                            <div className="flex justify-between">
                                <input
                                    className="mx-[2px] pl-2 border-l-[1px] border-gray-300 grow w-[calc(100%-40%)]"
                                    type="number"
                                    value={
                                        (onFocusTwo
                                            ? secondLocalValue
                                            : secondValue?.toFixed(2)) ?? 0
                                    }
                                    onChange={(e) => {
                                        secondOnChange?.(e);
                                        setSecondLocalValue(
                                            parseFloat(e.target.value)
                                        );
                                    }}
                                    onFocus={() => {
                                        setOnFocusTwo(true);
                                        setSecondLocalValue(
                                            parseFloat(
                                                (
                                                    secondValue?.toFixed(2) ?? 0
                                                ).toString()
                                            )
                                        );
                                    }}
                                    onBlur={() => {
                                        setOnFocusTwo(false);
                                    }}
                                />
                                <div className="bg-gray-200 px-2 rounded-r-md border-l-[1px] border-gray-300">
                                    {secondSymbol}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between border rounded-md">
                            <input
                                className="mx-[2px] pl-2 border-gray-300 grow rounded-md w-[calc(100%-40%)]"
                                type="number"
                                value={
                                    onFocusOne ? localValue : value.toFixed(2)
                                }
                                onChange={(e) => {
                                    onChange?.(e);
                                    setLocalValue(parseFloat(e.target.value));
                                }}
                                onFocus={() => {
                                    setOnFocusOne(true);
                                    setLocalValue(
                                        parseFloat(
                                            (value?.toFixed(2) ?? 0).toString()
                                        )
                                    );
                                }}
                                onBlur={() => {
                                    setOnFocusOne(false);
                                }}
                            />
                            <div className="bg-gray-200 px-2 rounded-r-md border-l-[1px] border-gray-300">
                                {symbol}
                            </div>
                        </div>
                    )}
                    <div className="flex p-2">
                        <input
                            className="grow w-full"
                            type="range"
                            min={min ?? 0}
                            max={max ?? 100}
                            step={step ?? 0.1}
                            value={secondValue ?? value}
                            onChange={split ? secondOnChange : onChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
