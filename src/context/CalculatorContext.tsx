import React, { createContext, useEffect, useMemo, useState } from "react";

interface ICalculatorContext {
    expression: string;
    result: number;
    addToExpression: (value: string) => () => void;
    calculate: () => void;
    setFraction: () => void;
    setModule: () => void;
    clear: () => void;
    remove: () => void;
}

const CalculatorContextState = {
    expression: "",
    result: 0,
    addToExpression: () => () => {},
    calculate: () => {},
    setFraction: () => {},
    setModule: () => {},
    clear: () => {},
    remove: () => {},
};

export const CalculatorContext = createContext<ICalculatorContext>(CalculatorContextState);

const CalculatorContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState(0);

    const operators = ["÷", "*", "+", "-", ".", "^"];

    const moreOpenThanClose = (str: string) =>
        // eslint-disable-next-line no-param-reassign
        str.split("").reduce((total, char) => (char === "(" ? ++total : char === ")" ? --total : total), 0) > 0;

    const addToExpression = (value: string) => {
        if (
            (operators.includes(value) &&
                (expression === "" || expression.lastIndexOf("(") === expression.length - 1) &&
                value !== "√" &&
                value !== "-") ||
            (expression.endsWith("√") && value === "√") ||
            (expression.endsWith("√") && operators.includes(value)) ||
            (expression.endsWith("e") && value === "e") ||
            (expression.endsWith("π") && value === "π") ||
            (expression.endsWith("π") && value === ".") ||
            (expression.endsWith("π") && !operators.includes(value) && value !== "(" && value !== ")") ||
            (expression.endsWith("e") && value === ".") ||
            (expression.endsWith("e") && !operators.includes(value) && value !== "(" && value !== ")") ||
            (expression.match(/[+\-/*^.√!]$|^$/) && value === "!") ||
            (expression.match(/[0-9]*\.[0-9]+$/) && value === ".") ||
            (expression.match(/[0-9]%$/) && value === "%") ||
            (expression.length === 0 && value === "%") ||
            ((!expression.match(/[0-9]$|e$|π$|!$|[)]$/) || !moreOpenThanClose(expression)) && value === ")") ||
            (operators.includes(expression[expression.length - 1]) && value === "%") ||
            (expression.slice(-1) === "-" && operators.includes(value)) ||
            (operators.includes(value) && operators.includes(expression.slice(-1)) && value === ".")
        ) {
            return () => {};
        }
        if (
            (operators.includes(value) && operators.includes(expression.slice(-1)) && value !== "-") ||
            (/(\+|\|\*|\/)0$/.test(expression) && !operators.includes(value) && value !== "-")
        ) {
            return () => setExpression((prev) => prev.slice(0, -1) + value);
        }
        if (expression.length === 1 && expression[0] === "0" && !operators.includes(value)) {
            return () => setExpression(value);
        }
        return () => setExpression((prev) => prev + value);
    };

    const setModule = () => {
        if (expression.match(/[0-9+\-/*^eπ.√!]$|^$/)) {
            setExpression((prev) => `${prev}|`);
        }
    };

    const setFraction = () => {
        const regex = /(\d+|e|π|\((.+?)\))$/;
        if (expression.match(regex)) {
            const invertedNumber = `(1/${expression.match(regex)?.[0]})`;
            setExpression(expression.replace(regex, invertedNumber));
        }
    };

    const calculate = () => {
        try {
            setResult(1);
            setExpression("1");
        } catch (err) {}
    };

    const clear = () => {
        setExpression("");
    };

    const remove = () => {
        if (expression.endsWith("NaN") || expression.endsWith("Infinity")) {
            setExpression(expression.replace(/NaN$|Infinity$/, ""));
        } else {
            setExpression(expression.slice(0, -1));
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const allowedKeys = new Set(["^", "+", "-", "*", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "%", "!", "(", ")"]);
        const keyMap = new Map([
            ["/", "÷"],
            ["\\", "√"],
            ["p", "π"],
            ["з", "π"],
            ["п", "π"],
            ["e", "e"],
            ["у", "e"],
            ["е", "e"],
        ]);
        if (allowedKeys.has(e.key)) {
            addToExpression(e.key)();
        } else {
            switch (e.key) {
                case "Backspace":
                    remove();
                    break;
                case "=":
                    calculate();
                    break;
                case "Delete":
                    clear();
                    break;
                case "|":
                    setModule();
                    break;
                default:
                    if (keyMap.has(e.key)) {
                        addToExpression(keyMap.get(e.key) as string)();
                    }
                    break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    const values = useMemo(
        () => ({
            expression,
            result,
            addToExpression,
            calculate,
            setFraction,
            setModule,
            clear,
            remove,
        }),
        [expression, result]
    );
    return <CalculatorContext.Provider value={values}>{children}</CalculatorContext.Provider>;
};

export default CalculatorContextProvider;
