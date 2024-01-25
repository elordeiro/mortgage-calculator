import React from "react";

interface BiWeeklyContainerProps {
    monthlyPayment: number;
    monthlyPayOffDate: string;
    totalInterest: number;
}

export default function BiWeeklyContainer({
    monthlyPayment,
    monthlyPayOffDate,
    totalInterest,
}: BiWeeklyContainerProps) {
    return (
        <div
            id="biweekly-container"
            className="main-squares justify-self-start lg:w-[calc(25vw)]"
        >
            <div className="text-left bg-slate-50 border-b-2 p-2">
                <span className="text-2xl font-bold p-2">
                    Monthly vs Bi-Weekly Payment
                </span>
            </div>
            <div className="p-4">
                <table className="biweekly-table w-full text-2xl">
                    <tr>
                        <td>
                            <p>
                                {monthlyPayment.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </p>
                            <p className="biweekly-label">Monthly Payment</p>
                        </td>
                        <td>
                            <p>
                                {(monthlyPayment / 2).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </p>
                            <p className="biweekly-label">Bi-Weekly Payment</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{monthlyPayOffDate}</p>
                            <p className="biweekly-label">
                                Monthly Pay-off Date
                            </p>
                        </td>
                        <td>
                            <p>Jan, 1970</p>
                            <p className="biweekly-label">
                                Bi-Weekly Pay-off Date
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>
                                {totalInterest.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </p>
                            <p className="biweekly-label">
                                Total Interest Paid
                            </p>
                        </td>
                        <td>
                            <p>$12,345.67</p>
                            <p className="biweekly-label">
                                Total Interest Paid
                            </p>
                        </td>
                    </tr>
                </table>
                <p className="text-center p-2 text-lg">
                    Total Interest Savings: $12,345.67
                </p>
            </div>
        </div>
    );
}
