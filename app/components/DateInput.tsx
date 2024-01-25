import React from "react";

interface DateInputProps {
    label: string;
    currentMonth: number;
    currentYear: number;
    onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateInput({
    label,
    currentMonth,
    currentYear,
    onChangeSelect,
    onChangeInput,
}: DateInputProps) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <div className="flex justify-between m-1 mb-5">
            <h2 className="grow max-w-[25%] text-left">{label}:</h2>
            <div className="grow max-w-[73%] border border-gray-300 m-1 rounded-md">
                <div className="flex">
                    <select
                        className="rounded-l-md px-2 flex-grow bg-white border-r-[1px] border-gray-300 w-[calc(100%-40%)]"
                        onChange={onChangeSelect}
                    >
                        {months.map((month, index) => {
                            return (
                                <option
                                    key={index}
                                    value={index + 1}
                                    selected={
                                        currentMonth === index + 1
                                            ? true
                                            : false
                                    }
                                >
                                    {month}
                                </option>
                            );
                        })}
                    </select>
                    <input
                        className="rounded-r-md px-2 flex-grow w-[calc(100%-60%)]"
                        type="number"
                        value={currentYear}
                        onChange={onChangeInput}
                    />
                </div>
            </div>
        </div>
    );
}
