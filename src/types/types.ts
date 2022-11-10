import React from "react";

export type IsNumberOrStringOrNull = number | string | null;

export type Props = {
    children?: React.ReactNode | React.ReactNode[];
    value?: string;
    values?: string[];
    className?: string
};

export type CalculatorContextObj = {
    previousValue?: IsNumberOrStringOrNull;
    currentValue?: IsNumberOrStringOrNull;
    pendingValue?: IsNumberOrStringOrNull;
    handlePreviousValue: (value: IsNumberOrStringOrNull) => void;
    handleCurrentValue: (value: IsNumberOrStringOrNull) => void;
    handlePendingValue: (value: IsNumberOrStringOrNull) => void;
};