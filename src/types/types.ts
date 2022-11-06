export type IsNumberOrNull = Number | null;

export type Props = {
    children?: React.ReactNode | React.ReactNode[];
    value?: string;
    values?: string[]

};

export type CalculatorContextObj = {
    previousValue?: Number | null;
    currentValue?: Number | null;
    pendingValue?: Number | null;
    handlePreviousValue: (value: IsNumberOrNull) => void;
    handleCurrentValue: (value: IsNumberOrNull) => void;
    handlePendingValue: (value: IsNumberOrNull) => void;
};