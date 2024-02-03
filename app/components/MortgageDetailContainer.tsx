import React from "react";

import {
    calculateTotalInterest,
    calcTotalPMIPaid,
    calcPMILength,
    PMIEndDate,
    calculateTotalPayment,
    loanEndDate,
} from "../utils/Calculations";

export interface MortgageContainerProps {
    homeValue: number;
    loanAmount: number;
    startDateMonth: number;
    startDateYear: number;
    interestRate: number;
    loanTerm: number;
    propertyTax: number;
    PMI: number;
    homeInsurance: number;
    downPayment: number;
    downPaymentPercent: number;
    monthlyHOA: number;
    PMILength?: number;
}

export default function MortgageDetailContainer(props: MortgageContainerProps) {
    const {
        homeValue,
        loanAmount,
        startDateMonth,
        startDateYear,
        interestRate,
        loanTerm,
        propertyTax,
        PMI,
        homeInsurance,
        downPayment,
        downPaymentPercent,
        monthlyHOA,
    } = props;

    const hasPMI = loanAmount > homeValue * 0.8;
    const PMILength = calcPMILength(
        homeValue,
        loanAmount,
        interestRate,
        loanTerm
    );

    const totalInterest = calculateTotalInterest(
        loanAmount,
        interestRate,
        loanTerm
    );
    const totalPMI = calcTotalPMIPaid(
        homeValue,
        loanAmount,
        PMI,
        interestRate,
        loanTerm
    );
    const totalPropertyTax = loanTerm * propertyTax;
    const totalHomeInsurance = loanTerm * (homeInsurance + monthlyHOA * 12);
    const totalPayment = calculateTotalPayment(props);

    return (
        <div
            id="mortgage-detail-container"
            className="main-squares left-squares"
        >
            <div className="text-left bg-slate-50 border-b-2 p-2">
                <div className="flex items-center text-2xl font-bold p-2 ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 mr-2"
                    >
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                    Mortgage Details
                </div>
            </div>
            <div className="p-3">
                <table className="w-full mortgage-detail-table">
                    <colgroup>
                        <col className="w-1/3" />
                        <col className="w-1/3" />
                        <col className="w-1/3" />
                    </colgroup>
                    <tr>
                        <td>Loan Amount:</td>
                        <td>
                            {loanAmount.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </td>
                        <td>
                            <div className="flex">
                                <div
                                    className="flex bg-black"
                                    style={{
                                        width: (loanAmount / totalPayment) * 80,
                                    }}
                                ></div>
                                <div className="pl-1">
                                    {(
                                        (loanAmount / totalPayment) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Down Payment:</td>
                        <td>
                            {downPayment.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}{" "}
                            ({downPaymentPercent.toFixed(2)}%)
                        </td>
                        <td>
                            <div className="flex">
                                <div
                                    className="flex bg-black"
                                    style={{
                                        width:
                                            (downPayment / totalPayment) * 80,
                                    }}
                                ></div>
                                <div className="pl-1">
                                    {(
                                        (downPayment / totalPayment) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Total Interest Paid:</td>
                        <td>
                            {totalInterest.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </td>
                        <td>
                            <div className="flex">
                                <div
                                    className="flex bg-black"
                                    style={{
                                        width:
                                            (totalInterest / totalPayment) * 80,
                                    }}
                                ></div>
                                <div className="pl-1">
                                    {(
                                        (totalInterest / totalPayment) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Total PMI
                            {hasPMI
                                ? " to " +
                                  PMIEndDate(
                                      startDateMonth,
                                      startDateYear,
                                      PMILength
                                  ) +
                                  ":"
                                : null}
                        </td>
                        <td>
                            {totalPMI.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </td>
                        <td>
                            <div className="flex">
                                <div
                                    className="flex bg-black"
                                    style={{
                                        width: (totalPMI / totalPayment) * 80,
                                    }}
                                ></div>
                                <div className="pl-1">
                                    {((totalPMI / totalPayment) * 100).toFixed(
                                        2
                                    )}
                                    %
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Total Tax Paid:</td>
                        <td>
                            {totalPropertyTax.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </td>
                        <td>
                            <div className="flex">
                                <div
                                    className="flex bg-black"
                                    style={{
                                        width:
                                            (totalPropertyTax / totalPayment) *
                                            80,
                                    }}
                                ></div>
                                <div className="pl-1">
                                    {(
                                        (totalPropertyTax / totalPayment) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Total Home Insurance:</td>
                        <td>
                            {totalHomeInsurance.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </td>
                        <td>
                            <div className="flex">
                                <div
                                    className="flex bg-black"
                                    style={{
                                        width:
                                            (totalHomeInsurance /
                                                totalPayment) *
                                            80,
                                    }}
                                ></div>
                                <div className="pl-1">
                                    {(
                                        (totalHomeInsurance / totalPayment) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <hr className="my-5"></hr>
                        </td>
                    </tr>
                    <tr>
                        <td>Total of {loanTerm * 12} Payments:</td>
                        <td>
                            {totalPayment.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>Loan pay-off date:</td>
                        <td>
                            {loanEndDate(
                                startDateMonth,
                                startDateYear,
                                loanTerm
                            )}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
