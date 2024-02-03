import React from "react";
import { calculateAmortizationTable } from "../utils/Calculations";

interface AmortizationTableProps {
    showAmortization: boolean;
    loanAmount: number;
    interestRate: number;
    loanTerm: number;
    startDateMonth: number;
    startDateYear: number;
}

export default function AmortizationTable({
    showAmortization,
    loanAmount,
    interestRate,
    loanTerm,
    startDateMonth,
    startDateYear,
}: AmortizationTableProps) {
    const amortizationTable = calculateAmortizationTable(
        loanAmount,
        interestRate,
        loanTerm,
        startDateMonth,
        startDateYear
    );

    return (
        <div className="col-span-1 lg:col-span-2 w-[90vw] justify-self-center max-w-[1100px] lg:mr-[4vw]">
            {showAmortization ? (
                <>
                    <h2 className="text-3xl font-bold text-center">
                        Amortization Table
                    </h2>
                    <table className="w-full mt-5">
                        <thead>
                            <tr className="border-b-2 border-black">
                                <th className="text-left">Year</th>
                                <th className="text-left">Interest</th>
                                <th className="text-left">Principal</th>
                                <th className="text-left">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {amortizationTable.map((row) => (
                                <tr key={row.year}>
                                    <td>{row.year}</td>
                                    <td>${row.interest.toFixed(2)}</td>
                                    <td>${row.principal.toFixed(2)}</td>
                                    <td>${row.balance.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : null}
        </div>
    );
}
