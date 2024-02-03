import { GraphContainerProps } from "../components/GraphContainer";
import { MortgageContainerProps } from "../components/MortgageDetailContainer";

interface optionsObject {
    principal: number;
    interest: number;
    propertyTax: number;
    HOAandInsurance: number;
    downPayment: number;
}
const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function loanEndDate(
    startDateMonth: number,
    startDateYear: number,
    loanTerm: number
) {
    const endMonth = startDateMonth - 1;
    const endYear = startDateYear + loanTerm - (endMonth < 1 ? 1 : 0);
    const endMonthAdjusted = endMonth < 1 ? endMonth + 12 : endMonth;
    return `${MONTHS[endMonthAdjusted - 1]}, ${endYear}`;
}

export function loanEndDateWithBiWeekly(
    startDateMonth: number,
    startDateYear: number,
    numberOfPayments: number
) {
    const years = Math.floor(numberOfPayments / 12);
    const months = (numberOfPayments - 1) % 12;
    const endMonth = startDateMonth + months;
    const endYear = startDateYear + years + (endMonth > 12 ? 1 : 0);
    const endMonthAdjusted = endMonth > 12 ? endMonth - 12 : endMonth;

    return `${MONTHS[endMonthAdjusted - 1]}, ${endYear}`;
}

export function PMIEndDate(
    startDateMonth: number,
    startDateYear: number,
    length: number
) {
    const years = Math.floor(length / 12);
    const months = length % 12;
    const endMonth = startDateMonth + months;
    const endYear = startDateYear + years + (endMonth > 12 ? 1 : 0);
    const endMonthAdjusted = endMonth > 12 ? endMonth - 12 : endMonth;
    return `${MONTHS[endMonthAdjusted - 1]}, ${endYear}`;
}

export function createOptionsObject(props: GraphContainerProps): optionsObject {
    const {
        loanAmount,
        interestRate,
        loanTerm,
        propertyTax,
        homeInsurance,
        monthlyHOA,
        downPayment,
    } = props;

    const principal = loanAmount;
    const interest = calculateTotalInterest(loanAmount, interestRate, loanTerm);
    const totalPropertyTax = propertyTax * loanTerm;
    const HOAandInsurance =
        homeInsurance * loanTerm + monthlyHOA * loanTerm * 12;

    const total = calculateTotalPayment(props);
    return {
        principal: parseFloat(((principal / total) * 100).toFixed(2)),
        interest: parseFloat(((interest / total) * 100).toFixed(2)),
        propertyTax: parseFloat(((totalPropertyTax / total) * 100).toFixed(2)),
        HOAandInsurance: parseFloat(
            ((HOAandInsurance / total) * 100).toFixed(2)
        ),
        downPayment: parseFloat(((downPayment / total) * 100).toFixed(2)),
    };
}

export function calcPMI(loanAmount: number, PMI: number): number {
    return ((PMI / 100) * loanAmount) / 12;
}

export function calcPMILength(
    homeValue: number,
    loanAmount: number,
    interestRate: number,
    loanTerm: number
) {
    if (loanAmount <= homeValue * 0.8) {
        return 0;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const pureMonthlyPayment = calculatePureMonthlyPayment(
        interestRate,
        loanAmount,
        loanTerm
    );

    let i = -1;
    while (loanAmount > homeValue * 0.8) {
        const monthlyInterestPaid = loanAmount * monthlyInterestRate;
        const principalPaid = pureMonthlyPayment - monthlyInterestPaid;
        loanAmount -= principalPaid;
        i++;
    }
    return i;
}

export function calcTotalPMIPaid(
    homeValue: number,
    loanAmount: number,
    PMI: number,
    interestRate: number,
    loanTerm: number
): number {
    const monthlyPMI = calcPMI(loanAmount, PMI);
    const monthlyInterestRate = interestRate / 100 / 12;
    const pureMonthlyPayment = calculatePureMonthlyPayment(
        interestRate,
        loanAmount,
        loanTerm
    );

    let i = -1;
    while (loanAmount > homeValue * 0.8) {
        const monthlyInterestPaid = loanAmount * monthlyInterestRate;
        const principalPaid = pureMonthlyPayment - monthlyInterestPaid;
        loanAmount -= principalPaid;
        i++;
    }
    return i > 0 ? monthlyPMI * i : 0;
}

export function calculateTotalInterest(
    loanAmount: number,
    interestRate: number,
    loanTerm: number
): number {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
        (monthlyRate * loanAmount) /
        (1 - (1 + monthlyRate) ** -(loanTerm * 12));
    let totalInterestPaid = 0;

    for (let i = 0; i < loanTerm * 12; i++) {
        const monthlyInterestPaid = loanAmount * monthlyRate;
        const principalPaid = monthlyPayment - monthlyInterestPaid;
        loanAmount -= principalPaid;
        totalInterestPaid += monthlyInterestPaid;
    }

    return totalInterestPaid;
}

export function calculateMonthlyPayment(
    loanAmount: number,
    interestRate: number,
    loanTerm: number,
    PMI: number,
    propertyTax: number,
    homeInsurance: number,
    monthlyHOA: number,
    downPaymentPercent: number
) {
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

export function calculateTotalPayment({
    homeValue,
    interestRate,
    loanAmount,
    loanTerm,
    PMI,
    propertyTax,
    homeInsurance,
    monthlyHOA,
}: GraphContainerProps | MortgageContainerProps): number {
    const totalInterestPaid = calculateTotalInterest(
        loanAmount,
        interestRate,
        loanTerm
    );

    const totalPMIPaid = calcTotalPMIPaid(
        homeValue,
        loanAmount,
        PMI,
        interestRate,
        loanTerm
    );

    const totalPropertyTax = propertyTax * loanTerm;
    const totalHomeInsurance = homeInsurance * loanTerm;
    const totalHOA = monthlyHOA * loanTerm * 12;

    return (
        loanAmount +
        totalInterestPaid +
        totalPMIPaid +
        totalPropertyTax +
        totalHomeInsurance +
        totalHOA
    );
}

function calculatePureMonthlyPayment(
    interestRate: number,
    loanAmount: number,
    loanTerm: number
): number {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
        (monthlyRate * loanAmount) /
        (1 - (1 + monthlyRate) ** -(loanTerm * 12));

    return monthlyPayment;
}

export function calculateBiweeklyInterest(
    loanAmount: number,
    interestRate: number,
    loanTerm: number
): { totalBiWeeklyInterest: number; numberOfPayments: number } {
    const d = interestRate / 100 / 26;
    const r = interestRate / 100 / 12;
    const n = loanAmount;
    const p = (n * r) / (1 - Math.pow(1 + r, -(loanTerm * 12)));
    const m = p / 2;
    const g = Math.round(-Math.log(1 - (d * n) / m) / Math.log(1 + d));
    const f = Math.round((g / 26) * 12);
    return {
        totalBiWeeklyInterest: m * g - n,
        numberOfPayments: f,
    };
}

export function calculateAmortizationTable(
    loanAmount: number,
    interestRate: number,
    loanTerm: number,
    startDateMonth: number,
    startDateYear: number
): Array<{
    year: number;
    interest: number;
    principal: number;
    balance: number;
}> {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
        (monthlyRate * loanAmount) /
        (1 - (1 + monthlyRate) ** -(loanTerm * 12));
    let balance = loanAmount;
    let month = startDateMonth;
    let year = startDateYear;
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    const amortizationTable = [];

    while (balance > monthlyPayment) {
        const monthlyInterestPaid = balance * monthlyRate;
        const principalPaid = monthlyPayment - monthlyInterestPaid;
        balance -= principalPaid;
        yearlyInterest += monthlyInterestPaid;
        yearlyPrincipal += principalPaid;
        if (month % 12 === 0) {
            amortizationTable.push({
                year: year,
                interest: yearlyInterest,
                principal: yearlyPrincipal,
                balance,
            });
            year++;
            yearlyInterest = 0;
            yearlyPrincipal = 0;
        }
        month++;
    }
    if (balance > 0) {
        const monthlyInterestPaid = balance * monthlyRate;
        const principalPaid = balance;
        balance = 0;
        yearlyInterest += monthlyInterestPaid;
        yearlyPrincipal += principalPaid;
        amortizationTable.push({
            year: year,
            interest: yearlyInterest,
            principal: yearlyPrincipal,
            balance,
        });
    }

    return amortizationTable;
}

// function calculateMonthlyPaymentWithPMI(
//     interestRate: number,
//     loanAmount: number,
//     loanTerm: number,
//     PMI: number
// ): number {
//     const monthlyRate = interestRate / 100 / 12;
//     const monthlyPayment =
//         (monthlyRate * loanAmount) /
//         (1 - (1 + monthlyRate) ** -(loanTerm * 12));
//     const monthlyPMI = ((PMI / 100) * loanAmount) / 12;

//     return monthlyPayment + monthlyPMI;
// }
