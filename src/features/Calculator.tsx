import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faMinimize, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { ReactFontSizeByTextLength } from "react-font-size-by-text-length";
import Button from "../components/Button/Button";
import useToggle from "../hooks/useToggle/useToggle";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { CalculatorContext } from "../context/CalculatorContext";

const Calculator = () => {
    const [isExpanded, setIsExpanded] = useToggle();
    const { addToExpression, clear, remove, setFraction, setModule, calculate, expression, result } = useContext(CalculatorContext);

    return (
        <div className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-white dark:bg-dark-600 md:max-h-[720px] md:max-w-[360px] md:rounded-3xl md:drop-shadow-3xl">
            <ThemeSwitcher />
            <div className="flex h-full flex-col-reverse p-5 text-right text-4xl font-bold text-stone-800 dark:text-gray-100">
                <span className="text-lg text-stone-600 dark:text-zinc-300">({result || 0})</span>
                <ReactFontSizeByTextLength changePerChar={5} startAtChar={12} minPercent={50}>
                    <span className="break-all">{expression || 0}</span>
                </ReactFontSizeByTextLength>
            </div>
            <section
                className={`grid ${isExpanded ? "grid-cols-5" : "grid-cols-4"} rounded-t-2xl bg-stone-50 p-5 dark:bg-dark-400 ${
                    isExpanded ? "[&_button]:text-base" : ""
                }`}
            >
                <div
                    className={`${isExpanded ? "col-span-4" : "col-span-3"} mr-3 grid  ${isExpanded ? "grid-cols-4" : "grid-cols-3"} gap-3`}
                >
                    <Button label="AC" color="red" onClick={clear} />
                    <Button label="C" color="red" onClick={remove} />
                    <Button label="%" color="red" onClick={addToExpression("%")} />
                    {isExpanded && <Button label="1/x" color="red" onClick={setFraction} />}
                    {isExpanded && <Button label="(" onClick={addToExpression("(")} />}
                    {isExpanded && <Button label=")" onClick={addToExpression(")")} />}
                    {isExpanded && <Button label="!" onClick={addToExpression("!")} />}
                    {isExpanded && <Button label="√" onClick={addToExpression("√")} />}
                    <Button label="7" onClick={addToExpression("7")} />
                    <Button label="8" onClick={addToExpression("8")} />
                    <Button label="9" onClick={addToExpression("9")} />
                    {isExpanded && <Button label="π" onClick={addToExpression("π")} />}
                    <Button label="4" onClick={addToExpression("4")} />
                    <Button label="5" onClick={addToExpression("5")} />
                    <Button label="6" onClick={addToExpression("6")} />
                    {isExpanded && <Button label="e" onClick={addToExpression("e")} />}
                    <Button label="1" onClick={addToExpression("1")} />
                    <Button label="2" onClick={addToExpression("2")} />
                    <Button label="3" onClick={addToExpression("3")} />
                    {isExpanded && <Button label="||" onClick={setModule} />}
                    <Button
                        label={!isExpanded ? <FontAwesomeIcon icon={faExpand} /> : <FontAwesomeIcon icon={faMinimize} />}
                        onClick={() => setIsExpanded()}
                        ariaLabel={!isExpanded ? "Expand" : "Minimize"}
                    />
                    <Button label="0" onClick={addToExpression("0")} />
                    <Button label="." onClick={addToExpression(".")} />
                    {isExpanded && (
                        <Button
                            label={<FontAwesomeIcon icon={faShuffle} />}
                            onClick={addToExpression(Math.floor(Math.random() * 10).toString())}
                        />
                    )}
                </div>
                <div className="ml-3 grid grid-cols-1 gap-3">
                    {isExpanded && <Button label="^" color="red" onClick={addToExpression("^")} />}
                    <Button label="÷" color="red" onClick={addToExpression("÷")} />
                    <Button label="*" color="red" onClick={addToExpression("*")} />
                    <Button label="-" color="red" onClick={addToExpression("-")} />
                    <Button label="+" color="red" onClick={addToExpression("+")} />
                    <Button label="=" color="red" onClick={calculate} />
                </div>
            </section>
        </div>
    );
};
export default Calculator;
