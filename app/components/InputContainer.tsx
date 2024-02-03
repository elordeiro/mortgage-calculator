"use client";

import React from "react";
import { useEffect } from "react";
import Input from "./Input";
import SlidingInput from "./SlidingInput";
import DateInput from "./DateInput";
import { calculateMonthlyPayment } from "../utils/Calculations";

interface InputContainerProps {
    homeValue: number;
    setHomeValue: (value: number) => void;
    downPayment: number;
    setDownPayment: (value: number) => void;
    downPaymentPercent: number;
    setDownPaymentPercent: (value: number) => void;
    loanAmount: number;
    setLoanAmount: (value: number) => void;
    interestRate: number;
    setInterestRate: (value: number) => void;
    loanTerm: number;
    setLoanTerm: (value: number) => void;
    startDateMonth: number;
    setStartDateMonth: (value: number) => void;
    startDateYear: number;
    setStartDateYear: (value: number) => void;
    propertyTax: number;
    setPropertyTax: (value: number) => void;
    PMI: number;
    setPMI: (value: number) => void;
    homeInsurance: number;
    setHomeInsurance: (value: number) => void;
    monthlyHOA: number;
    setMonthlyHOA: (value: number) => void;
    monthlyPayment: number;
    setMonthlyPayment: (value: number) => void;
}

export default function InputContainer({
    homeValue,
    setHomeValue,
    downPayment,
    setDownPayment,
    downPaymentPercent,
    setDownPaymentPercent,
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    startDateMonth,
    setStartDateMonth,
    startDateYear,
    setStartDateYear,
    propertyTax,
    setPropertyTax,
    PMI,
    setPMI,
    homeInsurance,
    setHomeInsurance,
    monthlyHOA,
    setMonthlyHOA,
    monthlyPayment,
    setMonthlyPayment,
}: InputContainerProps) {
    function updateDownPaymentPercent(newDownPayment: number) {
        console.log("New Down Payment: " + newDownPayment);

        let newDownPaymentPercent = (newDownPayment / homeValue) * 100;

        if (newDownPaymentPercent > 100) {
            newDownPaymentPercent = 100;
            if (newDownPayment > homeValue) {
                setDownPayment(homeValue);
            }
        } else if (newDownPaymentPercent < 0) {
            newDownPaymentPercent = 0;
            if (newDownPayment < 0) {
                setDownPayment(0);
            }
        }

        if (newDownPaymentPercent !== downPaymentPercent) {
            setDownPaymentPercent(newDownPaymentPercent);
        }
    }

    function updateDownPayment(newDownPaymentPercent: number) {
        let newDownPayment = (newDownPaymentPercent / 100) * homeValue;
        if (newDownPayment > homeValue) {
            newDownPayment = homeValue;
            if (newDownPaymentPercent > 100) {
                setDownPaymentPercent(100);
            }
        } else if (newDownPayment < 0) {
            newDownPayment = 0;
            if (newDownPaymentPercent < 0) {
                setDownPaymentPercent(0);
            }
        }
        if (newDownPayment !== downPayment) {
            setDownPayment(newDownPayment);
        }
    }

    useEffect(() => {
        setDownPayment((downPaymentPercent / 100.0) * homeValue);

        const newLoanAmount = homeValue - downPayment;
        if (newLoanAmount !== loanAmount) {
            setLoanAmount(newLoanAmount);
        }

        const newMonthlyPayment = calculateMonthlyPayment(
            newLoanAmount,
            interestRate,
            loanTerm,
            PMI,
            propertyTax,
            homeInsurance,
            monthlyHOA,
            downPaymentPercent
        );

        if (newMonthlyPayment !== monthlyPayment) {
            setMonthlyPayment(newMonthlyPayment);
        }
    }, [
        downPayment,
        downPaymentPercent,
        homeValue,
        interestRate,
        loanTerm,
        startDateMonth,
        startDateYear,
        propertyTax,
        PMI,
        homeInsurance,
        monthlyHOA,
    ]);

    return (
        <div id="input" className="main-squares left-squares shadow-none p-3">
            {/* <Input
                label="Home Value"
                symbol="$"
                value={homeValue}
                onChange={(e) => setHomeValue(parseInt(e.target.value))}
            /> */}
            <SlidingInput
                label="Home Value"
                symbol="$"
                value={homeValue}
                max={1000000}
                onChange={(e) => setHomeValue(parseFloat(e.target.value))}
            />
            <SlidingInput
                label="Down Payment"
                symbol="$"
                secondSymbol="%"
                value={downPayment}
                secondValue={downPaymentPercent}
                split={true}
                step={1}
                onChange={(e) => {
                    const newDownPayment = parseFloat(e.target.value);
                    setDownPayment(newDownPayment);
                    updateDownPaymentPercent(newDownPayment);
                    // console.log(newDownPayment);
                }}
                secondOnChange={(e) => {
                    const newDownPaymentPercent = parseFloat(e.target.value);
                    setDownPaymentPercent(newDownPaymentPercent);
                    updateDownPayment(newDownPaymentPercent);
                    // console.log(parseInt(e.target.value));
                }}
            />
            <Input label="Loan Amount" symbol="$" value={loanAmount} />
            <SlidingInput
                label="Interest Rate"
                symbol="%"
                value={interestRate}
                max={30.0}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
            <Input
                label="Loan Term"
                symbol="years"
                value={loanTerm}
                inverted={true}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
            />
            <DateInput
                label="Start Date"
                currentMonth={startDateMonth}
                onChangeSelect={(e) =>
                    setStartDateMonth(parseInt(e.target.value))
                }
                currentYear={startDateYear}
                onChangeInput={(e) =>
                    setStartDateYear(parseInt(e.target.value))
                }
            />
            <Input
                label="Property Tax"
                symbol="$/year"
                value={propertyTax}
                inverted={true}
                onChange={(e) => setPropertyTax(parseInt(e.target.value))}
            />
            <SlidingInput
                label="PMI"
                symbol="%"
                value={PMI}
                max={10.0}
                onChange={(e) => setPMI(parseFloat(e.target.value))}
            />
            <Input
                label="Home Insurance"
                symbol="$/year"
                value={homeInsurance}
                inverted={true}
                onChange={(e) => setHomeInsurance(parseInt(e.target.value))}
            />
            <Input
                label="Monthly HOA"
                symbol="$"
                value={monthlyHOA}
                onChange={(e) => setMonthlyHOA(parseInt(e.target.value))}
            />
            <Input
                label="Monthly Payment"
                symbol="$"
                value={monthlyPayment}
                roundTo={2}
                onChange={(e) => setMonthlyPayment(parseInt(e.target.value))}
            />
        </div>
    );
}
