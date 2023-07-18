import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Calculator from "./features/Calculator";
import CalculatorContextProvider from "./context/CalculatorContext";

function App() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`${theme === "dark" ? "dark" : ""}`}>
            <main className="grid h-screen place-items-center bg-stone-100 dark:bg-dark-700">
                <CalculatorContextProvider>
                    <Calculator />
                </CalculatorContextProvider>
            </main>
        </div>
    );
}

export default App;
