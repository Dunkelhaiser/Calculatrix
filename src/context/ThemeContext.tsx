import React, { createContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light" | "system";

interface IThemeContext {
    theme: Theme | null;
    isSystem: boolean;
    setThemeDark: () => void;
    setThemeLight: () => void;
    setThemeSystem: () => void;
}

const ThemeContextState = {
    theme: null,
    isSystem: false,
    setThemeDark: () => {},
    setThemeLight: () => {},
    setThemeSystem: () => {},
};

export const ThemeContext = createContext<IThemeContext>(ThemeContextState);

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(JSON.parse(localStorage.getItem("theme") || "null"));
    const [isSystem, setIsSystem] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    const setThemeHandler = (selectedTheme: Theme) => {
        setTheme(selectedTheme);
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", selectedTheme === "dark" ? "#1a1c22" : "#e7e7e7");
        localStorage.setItem("theme", JSON.stringify(selectedTheme));
    };

    const setThemeDark = () => {
        setThemeHandler("dark");
        setIsSystem(false);
    };

    const setThemeLight = () => {
        setThemeHandler("light");
        setIsSystem(false);
    };

    const setThemeSystem = () => {
        setThemeHandler("system");
        setIsSystem(true);
    };

    useEffect(() => {
        if (theme === "dark") {
            document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#1a1c22");
        } else if (theme === "light") {
            document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#e7e7e7");
        } else if (theme === "system" || theme === null) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme("dark");
                setIsSystem(true);
                document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#1a1c22");
            } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
                setTheme("light");
                setIsSystem(true);
                document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#e7e7e7");
            }
        }
        setIsLoading(false);
    }, [theme]);

    const values = useMemo(
        () => ({
            theme,
            isSystem,
            setThemeDark,
            setThemeLight,
            setThemeSystem,
        }),
        [theme, isSystem]
    );
    return <ThemeContext.Provider value={values}>{!isLoading && children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
