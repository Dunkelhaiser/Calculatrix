import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faMinimize, faShuffle } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import useToggle from "../hooks/useToggle";
import ThemeSwitcher from "../components/ThemeSwitcher";

const Calculator = () => {
    const [isExpanded, setIsExpanded] = useToggle();

    return (
        <div className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-white dark:bg-dark-600 md:max-h-[720px] md:max-w-[360px] md:rounded-3xl md:drop-shadow-3xl">
            <ThemeSwitcher />
            <div className="flex h-full flex-col-reverse p-5 text-right text-4xl font-bold text-stone-800 dark:text-gray-100">
                <span className="text-lg text-stone-600 dark:text-zinc-300">({0})</span>
                <span>{0}</span>
            </div>
            <section
                className={`grid ${isExpanded ? "grid-cols-5" : "grid-cols-4"} rounded-t-2xl bg-stone-50 p-5 dark:bg-dark-400 ${
                    isExpanded ? "[&_button]:text-base" : ""
                }`}
            >
                <div
                    className={`${isExpanded ? "col-span-4" : "col-span-3"} mr-3 grid  ${isExpanded ? "grid-cols-4" : "grid-cols-3"} gap-3`}
                >
                    <Button label="AC" color="red" />
                    <Button label="C" color="red" />
                    <Button label="%" color="red" />
                    {isExpanded && <Button label="/" color="red" />}
                    {isExpanded && <Button label="(" />}
                    {isExpanded && <Button label=")" />}
                    {isExpanded && <Button label="!" />}
                    {isExpanded && <Button label="√" />}
                    <Button label="7" />
                    <Button label="8" />
                    <Button label="9" />
                    {isExpanded && <Button label="π" />}
                    <Button label="4" />
                    <Button label="5" />
                    <Button label="6" />
                    {isExpanded && <Button label="e" />}
                    <Button label="1" />
                    <Button label="2" />
                    <Button label="3" />
                    {isExpanded && <Button label="||" />}
                    <Button
                        label={isExpanded === false ? <FontAwesomeIcon icon={faExpand} /> : <FontAwesomeIcon icon={faMinimize} />}
                        onClick={() => setIsExpanded()}
                    />
                    <Button label="0" />
                    <Button label="." />
                    {isExpanded && <Button label={<FontAwesomeIcon icon={faShuffle} />} />}
                </div>
                <div className="ml-3 grid grid-cols-1 gap-3">
                    {isExpanded && <Button label="^" color="red" />}
                    <Button label="÷" color="red" />
                    <Button label="*" color="red" />
                    <Button label="-" color="red" />
                    <Button label="+" color="red" />
                    <Button label="=" color="red" />
                </div>
            </section>

            {/* <section className="grid grid-cols-4 gap-4 bg-zinc-700 p-4">
                <Button label="AC" />
                <Button label="C" />
                <Button label="%" />
                <Button label="÷" />
                <Button label="7" />
                <Button label="8" />
                <Button label="9" />
                <Button label="*" />
                <Button label="4" />
                <Button label="5" />
                <Button label="6" />
                <Button label="-" />
                <Button label="1" />
                <Button label="2" />
                <Button label="3" />
                <Button label="+" />
                <Button label="." />
                <Button label="0" />
                <Button label="." />
                <Button label="=" />
            </section> */}
        </div>
    );
};
export default Calculator;
