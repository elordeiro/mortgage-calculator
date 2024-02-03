import React from "react";

import {
    calculateBiweeklyInterest,
    loanEndDateWithBiWeekly,
} from "../utils/Calculations";

interface BiWeeklyContainerProps {
    monthlyPayment: number;
    monthlyPayOffDate: string;
    totalInterest: number;
    loanAmount: number;
    interestRate: number;
    loanTerm: number;
    startDateMonth: number;
    startDateYear: number;
}

export default function BiWeeklyContainer({
    monthlyPayment,
    monthlyPayOffDate,
    totalInterest,
    loanAmount,
    interestRate,
    loanTerm,
    startDateMonth,
    startDateYear,
}: BiWeeklyContainerProps) {
    const { totalBiWeeklyInterest, numberOfPayments } =
        calculateBiweeklyInterest(loanAmount, interestRate, loanTerm);
    const biweeklyPayOffDate = loanEndDateWithBiWeekly(
        startDateMonth,
        startDateYear,
        numberOfPayments
    );
    const interestSavings = totalInterest - totalBiWeeklyInterest;

    return (
        <div id="biweekly-container" className="main-squares right-squares">
            <div className="text-left bg-slate-50 border-b-2 p-2">
                <span className="text-2xl font-bold p-2 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 mr-2"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Monthly vs Bi-Weekly Payment
                </span>
            </div>
            <div className="p-4 flex flex-col">
                <table className="biweekly-table max-w-full text-xl lg:text-2xl">
                    <colgroup>
                        <col className="w-1/2" />
                        <col className="w-1/2" />
                    </colgroup>
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
                            <p>{biweeklyPayOffDate}</p>
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
                            <p>
                                {totalBiWeeklyInterest.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </p>
                            <p className="biweekly-label">
                                Total Interest Paid
                            </p>
                        </td>
                    </tr>
                </table>
                <p className="text-center p-2 text-lg">
                    Total Interest Savings:{" "}
                    {interestSavings.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </p>
            </div>
        </div>
    );
}
