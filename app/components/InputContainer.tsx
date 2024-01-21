"use client";

import { useState, useEffect } from "react";
import Input from "./Input";
import SlidingInput from "./SlidingInput";
import DateInput from "./DateInput";

export default function InputContainer() {
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

    function updateDownPayement(varToChange: string, newValue: number) {
        if (varToChange === "downPayment") {
            let newDownPayment = ((newValue / 100) * homeValue);
            if (newDownPayment > homeValue) {
                newDownPayment = homeValue;
                if (newValue > 100) {
                    setDownPaymentPercent(100);
                }
            } else if (newDownPayment < 0) {
                newDownPayment = 0;
                if (newValue < 0) {
                    setDownPaymentPercent(0);
                }
            }
            if (newDownPayment !== downPayment) {
                setDownPayment(newDownPayment);
            }
        } else if (varToChange === "downPaymentPercent") {
            let newDownPaymentPercent = (newValue / homeValue) * 100;
            if (newDownPaymentPercent > 100) {
                newDownPaymentPercent = 100;
                if (newValue > homeValue) {
                    setDownPayment(homeValue);
                }
            } else if (newDownPaymentPercent < 0) {
                newDownPaymentPercent = 0;
                if (newValue < 0) {
                    setDownPayment(0);
                }
            }
            setDownPaymentPercent(newDownPaymentPercent);
        }
    }

    useEffect(() => {
        updateDownPayement("downPaymentPercent", downPayment);
    }, [downPayment]);
    useEffect(() => {
        updateDownPayement("downPayment", downPaymentPercent);
    }, [downPaymentPercent]);

    useEffect(() => {
        const newLoanAmount = homeValue - downPayment;
        if (newLoanAmount !== loanAmount) {
            setLoanAmount(newLoanAmount);
        }

        const newMonthlyPayment = calculateMonthlyPayment(newLoanAmount);
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

    function calculateMonthlyPayment(loanAmount: number) {
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        let monthlyPayment =
            (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        const monthlyPropertyTax = propertyTax / 12;
        const monthlyPMI = ((PMI / 100) * loanAmount) / 12;
        const monthlyHomeInsurance = homeInsurance / 12;
        monthlyPayment +=
            monthlyPropertyTax +
            (downPaymentPercent < 20 ? monthlyPMI : 0) +
            monthlyHomeInsurance +
            monthlyHOA;
        return monthlyPayment;
    }

    return (
        <div id="input" className="bg-white main-squares">
            <h2>Input</h2>
            <Input
                label="Home Value"
                symbol="$"
                value={homeValue}
                onChange={(e) => setHomeValue(parseInt(e.target.value))}
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
                    setDownPayment(parseFloat(e.target.value));
                    console.log(parseInt(e.target.value));
                }}
                secondOnChange={(e) => {
                    setDownPaymentPercent(parseFloat(e.target.value));
                    console.log(parseInt(e.target.value));
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
