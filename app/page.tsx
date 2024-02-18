"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";

import {
    loanEndDate,
    calculateTotalInterest,
    calcPMI,
} from "./utils/Calculations";
import InputContainer from "./components/InputContainer";
import GraphContainer from "./components/GraphContainer";
import MortgageDetailContainer from "./components/MortgageDetailContainer";
import BiWeeklyContainer from "./components/BiWeeklyContainer";
import AmortizationTable from "./components/AmortizationTable";

export default function Home() {
    const [homeValue, setHomeValue] = useState(300000);
    const [downPayment, setDownPayment] = useState(50000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(
        (downPayment / homeValue) * 100
    );
    const [loanAmount, setLoanAmount] = useState(homeValue - downPayment);
    const [interestRate, setInterestRate] = useState(4.0);
    const [loanTerm, setLoanTerm] = useState(30);
    const [startDateMonth, setStartDateMonth] = useState(
        new Date().getMonth() + 1
    );
    const [startDateYear, setStartDateYear] = useState(
        new Date().getFullYear()
    );
    const [propertyTax, setPropertyTax] = useState(2400);
    const [PMI, setPMI] = useState(1.0);
    const [homeInsurance, setHomeInsurance] = useState(1000);
    const [monthlyHOA, setMonthlyHOA] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [showAmortization, setShowAmortization] = useState(false);

    const linkRef = useRef(null);
    useEffect(() => {
        if (window.self !== window.top) {
            if (linkRef && linkRef.current) {
                (linkRef.current as HTMLAnchorElement).target = "_blank";
                (linkRef.current as HTMLAnchorElement).rel =
                    "noopener noreferrer";
            }
        }
    }, []);

    return (
        <div
            id="page"
            className="flex flex-col justify-center text-black bg-white"
        >
            <header className="title py-10 px-2 flex justify-center items-center">
                <h1 className="font-bold">Mortgage</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 lg:w-16 lg:h-16"
                >
                    <path
                        fillRule="evenodd"
                        d="M6.32 1.827a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93ZM7.5 11.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H8.25Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75H8.25Zm1.748-6a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.007Zm-.75 3a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.007Zm1.754-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.008Zm1.748-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-8.25-6A.75.75 0 0 1 8.25 6h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-.75Zm9 9a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.25Z"
                        clipRule="evenodd"
                    />
                </svg>
                <h1 className="font-bold">Calculator</h1>
            </header>

            <div
                id="outter-container"
                className="grid grid-cols-1 lg:grid-cols-2 text-xs gap-5 mx-[1dvw] lg:ml-[10dvw]"
            >
                <InputContainer
                    homeValue={homeValue}
                    setHomeValue={setHomeValue}
                    downPayment={downPayment}
                    setDownPayment={setDownPayment}
                    downPaymentPercent={downPaymentPercent}
                    setDownPaymentPercent={setDownPaymentPercent}
                    loanAmount={loanAmount}
                    setLoanAmount={setLoanAmount}
                    interestRate={interestRate}
                    setInterestRate={setInterestRate}
                    loanTerm={loanTerm}
                    setLoanTerm={setLoanTerm}
                    startDateMonth={startDateMonth}
                    setStartDateMonth={setStartDateMonth}
                    startDateYear={startDateYear}
                    setStartDateYear={setStartDateYear}
                    propertyTax={propertyTax}
                    setPropertyTax={setPropertyTax}
                    PMI={PMI}
                    setPMI={setPMI}
                    homeInsurance={homeInsurance}
                    setHomeInsurance={setHomeInsurance}
                    monthlyHOA={monthlyHOA}
                    setMonthlyHOA={setMonthlyHOA}
                    monthlyPayment={monthlyPayment}
                    setMonthlyPayment={setMonthlyPayment}
                />

                <GraphContainer
                    homeValue={homeValue}
                    loanAmount={loanAmount}
                    interestRate={interestRate}
                    loanTerm={loanTerm}
                    startDateMonth={startDateMonth}
                    startDateYear={startDateYear}
                    propertyTax={propertyTax}
                    PMI={PMI}
                    homeInsurance={homeInsurance}
                    monthlyHOA={monthlyHOA}
                    downPayment={downPayment}
                    monthlyPayment={monthlyPayment}
                    showAmortization={showAmortization}
                    onClick={setShowAmortization}
                />

                <AmortizationTable
                    showAmortization={showAmortization}
                    loanAmount={loanAmount}
                    interestRate={interestRate}
                    loanTerm={loanTerm}
                    startDateMonth={startDateMonth}
                    startDateYear={startDateYear}
                />

                <MortgageDetailContainer
                    homeValue={homeValue}
                    loanAmount={loanAmount}
                    interestRate={interestRate}
                    loanTerm={loanTerm}
                    startDateMonth={startDateMonth}
                    startDateYear={startDateYear}
                    propertyTax={propertyTax}
                    PMI={PMI}
                    homeInsurance={homeInsurance}
                    downPayment={downPayment}
                    downPaymentPercent={downPaymentPercent}
                    monthlyHOA={monthlyHOA}
                />

                <BiWeeklyContainer
                    monthlyPayment={monthlyPayment - calcPMI(loanAmount, PMI)}
                    monthlyPayOffDate={loanEndDate(
                        startDateMonth,
                        startDateYear,
                        loanTerm
                    )}
                    totalInterest={calculateTotalInterest(
                        loanAmount,
                        interestRate,
                        loanTerm
                    )}
                    loanAmount={loanAmount}
                    interestRate={interestRate}
                    loanTerm={loanTerm}
                    startDateMonth={startDateMonth}
                    startDateYear={startDateYear}
                />
            </div>
            <footer className="mt-24 mb-10 py-2 flex border-y border-gray-500 bg-300 justify-center items-center lg:col-span-2">
                <p>
                    Created by{" "}
                    <a
                        href="https://estevao.lordeiro.com"
                        ref={linkRef}
                        className="underline font-medium"
                    >
                        elordeiro
                    </a>
                </p>
            </footer>
        </div>
    );
}
