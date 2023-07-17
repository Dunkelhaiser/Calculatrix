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

    const setThemeDark = () => {
        setTheme("dark");
        setIsSystem(false);
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#1a1c22");
        localStorage.setItem("theme", JSON.stringify("dark"));
    };

    const setThemeLight = () => {
        setTheme("light");
        setIsSystem(false);
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#e7e7e7");
        localStorage.setItem("theme", JSON.stringify("light"));
    };

    const setThemeSystem = () => {
        setTheme("system");
        setIsSystem(true);
        localStorage.setItem("theme", JSON.stringify("system"));
    };

    useEffect(() => {
        if (theme === "dark") {
            document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#1a1c22");
            setIsLoading(false);
        } else if (theme === "light") {
            document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#e7e7e7");
            setIsLoading(false);
        } else if (theme === "system" || theme === null) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme("dark");
                setIsSystem(true);
                document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#1a1c22");
                setIsLoading(false);
            } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
                setTheme("light");
                setIsSystem(true);
                document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#e7e7e7");
                setIsLoading(false);
            }
        }
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
