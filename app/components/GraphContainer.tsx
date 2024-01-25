import React from "react";

import {
    calcPMI,
    createOptionsObject,
    calcPMILength,
    PMIEndDate,
} from "../utils/Calculations";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface GraphContainerProps {
    homeValue: number;
    loanAmount: number;
    interestRate: number;
    loanTerm: number;
    startDateMonth: number;
    startDateYear: number;
    propertyTax: number;
    PMI: number;
    homeInsurance: number;
    monthlyHOA: number;
    downPayment: number;
    monthlyPayment: number;
    PMILength?: number;
}

export default function GraphContainer(props: GraphContainerProps) {
    const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null);
    const {
        homeValue,
        loanAmount,
        interestRate,
        loanTerm,
        startDateMonth,
        startDateYear,
        propertyTax,
        PMI,
        homeInsurance,
        monthlyPayment,
    } = props;

    const hasPMI = loanAmount > homeValue * 0.8;
    const PMILength = calcPMILength(
        homeValue,
        loanAmount,
        interestRate,
        loanTerm
    );

    const extendedProps = {
        ...props,
        PMILength: PMILength,
    };
    const optionsObject = createOptionsObject(extendedProps);
    const options: Highcharts.Options = {
        title: {
            text: "Loan Breakdown",
        },
        series: [
            {
                type: "pie",
                data: [
                    {
                        name: "Principal",
                        y: optionsObject.principal,
                    },
                    {
                        name: "Interest",
                        y: optionsObject.interest,
                    },
                    {
                        name: "Property Tax",
                        y: optionsObject.propertyTax,
                    },
                    {
                        name: "HOA and Insurance",
                        y: optionsObject.HOAandInsurance,
                    },
                    {
                        name: "Down Payment",
                        y: optionsObject.downPayment,
                    },
                ],
            },
        ],
    };

    return (
        <div className="main-squares h-fit relative lg:w-[calc(40vw)] sm:justify-self-center lg:justify-self-start">
            <div className="flex flex-col text-left h-[15%] bg-slate-50 border-b-2 p-2">
                <span className="text-2xl font-bold">
                    {monthlyPayment.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </span>
                <span className="text-lg font-medium">
                    Your estimated monthly payment{hasPMI ? " with PMI." : "."}
                </span>
            </div>
            <div className="p-4">
                <table className="table-auto w-full loan-breakdown-table">
                    {hasPMI ? (
                        <tr>
                            <td>PMI:</td>
                            <td>
                                ${(((PMI / 100) * loanAmount) / 12).toFixed(2)}
                            </td>
                        </tr>
                    ) : null}
                    <tr>
                        <td>Monthly Tax Paid:</td>
                        <td>${(propertyTax / 12).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Monthly Home Insurance:</td>
                        <td>${(homeInsurance / 12).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <hr></hr>
                        </td>
                    </tr>
                    {hasPMI ? (
                        <>
                            <tr>
                                <td>PMI End Date:</td>
                                <td>
                                    {PMIEndDate(
                                        startDateMonth,
                                        startDateYear,
                                        PMILength
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Total PMI Payments:</td>
                                <td>{PMILength}</td>
                            </tr>
                            <tr>
                                <td>Monthly Payment after Mar, 2026:</td>
                                <td>
                                    {(
                                        monthlyPayment -
                                        calcPMI(loanAmount, PMI)
                                    ).toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </td>
                            </tr>
                        </>
                    ) : null}
                </table>
            </div>

            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
        </div>
    );
}
