"use client";

import React from "react";
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

export default function Home() {
    const [homeValue, setHomeValue] = useState(300000);
    const [downPayment, setDownPayment] = useState(50000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(
        (downPayment / homeValue) * 100
    );
    const [loanAmount, setLoanAmount] = useState(homeValue - downPayment);
    const [interestRate, setInterestRate] = useState(4.0);
    const [loanTerm, setLoanTerm] = useState(30);
    const [startDateMonth, setStartDateMonth] = useState(1);
    const [startDateYear, setStartDateYear] = useState(2024);
    const [propertyTax, setPropertyTax] = useState(2400);
    const [PMI, setPMI] = useState(1.0);
    const [homeInsurance, setHomeInsurance] = useState(1000);
    const [monthlyHOA, setMonthlyHOA] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    return (
        <div id="page" className="flex flex-col justify-center text-black">
            <header className="text-center p-10 text-7xl">
                <h1 className="font-bold">Mortgage Calculator</h1>
            </header>

            <div
                id="outter-container"
                className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 text-xs gap-5 sm:ml-[1dvw] lg:ml-[10dvw]"
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
                />

                <div></div>
                <div className="h-dvh"></div>
            </div>
        </div>
    );
}
