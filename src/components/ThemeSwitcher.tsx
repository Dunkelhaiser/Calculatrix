import { faDisplay, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeSwitcher = () => {
    const { theme, isSystem, setThemeDark, setThemeLight, setThemeSystem } = useContext(ThemeContext);
    return (
        <div className="absolute left-1/2 top-4 flex -translate-x-1/2 transform gap-6 rounded-xl bg-stone-50 px-4 py-2 dark:bg-dark-400">
            <button
                className="appearance-none leading-none"
                onClick={setThemeLight}
                aria-label="Light Theme"
                aria-pressed={theme === "light" && !isSystem}
            >
                <FontAwesomeIcon
                    icon={faSun}
                    className={`cursor-pointer text-xl ${
                        theme === "light" && !isSystem
                            ? "text-stone-700"
                            : "text-stone-300 hover:text-stone-400 focus-visible:text-stone-400 dark:text-gray-500 hover:dark:text-gray-400 focus-visible:dark:text-gray-400"
                    }`}
                />
            </button>
            <button
                className="appearance-none leading-none"
                onClick={setThemeDark}
                aria-label="Dark Theme"
                aria-pressed={theme === "dark" && !isSystem}
            >
                <FontAwesomeIcon
                    icon={faMoon}
                    className={`cursor-pointer text-xl  ${
                        theme === "dark" && !isSystem
                            ? "dark:text-gray-100"
                            : "text-stone-300 hover:text-stone-400 focus-visible:text-stone-400 dark:text-gray-500 hover:dark:text-gray-400 focus-visible:dark:text-gray-400"
                    }`}
                />
            </button>
            <button className="appearance-none leading-none" onClick={setThemeSystem} aria-label="System Theme" aria-pressed={isSystem}>
                <FontAwesomeIcon
                    icon={faDisplay}
                    className={`cursor-pointer text-xl  ${
                        isSystem
                            ? "text-stone-700 dark:text-gray-100"
                            : "text-stone-300 hover:text-stone-400 focus-visible:text-stone-400 dark:text-gray-500 hover:dark:text-gray-400 focus-visible:dark:text-gray-400"
                    }`}
                />
            </button>
        </div>
    );
};
export default ThemeSwitcher;
