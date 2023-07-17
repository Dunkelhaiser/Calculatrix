import { faDisplay, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeSwitcher = () => {
    const { theme, isSystem, setThemeDark, setThemeLight, setThemeSystem } = useContext(ThemeContext);
    return (
        <div className="absolute left-1/2 top-4 flex -translate-x-1/2 transform gap-6 rounded-xl bg-stone-50 px-4 py-2 dark:bg-dark-400">
            <FontAwesomeIcon
                icon={faSun}
                className={`cursor-pointer text-xl ${
                    theme === "light" && !isSystem ? "text-stone-700" : "text-stone-300 dark:text-gray-500"
                }`}
                onClick={setThemeLight}
            />
            <FontAwesomeIcon
                icon={faMoon}
                className={`cursor-pointer text-xl  ${
                    theme === "dark" && !isSystem ? "dark:text-gray-100" : "text-stone-300 dark:text-gray-500"
                }`}
                onClick={setThemeDark}
            />
            <FontAwesomeIcon
                icon={faDisplay}
                className={`cursor-pointer text-xl  ${
                    isSystem ? "text-stone-700 dark:text-gray-100" : "text-stone-300 dark:text-gray-500"
                }`}
                onClick={setThemeSystem}
            />
        </div>
    );
};
export default ThemeSwitcher;
