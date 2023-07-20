/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: {
                    300: "#333842",
                    400: "#292d36",
                    500: "#272b33",
                    600: "#22252d",
                    700: "#1a1c22",
                    800: "#1c1f25",
                },
                red: {
                    400: "#eb6666",
                },
            },
            dropShadow: {
                "3xl": ["0 25px 25px rgb(0 0 0 / 0.05)"],
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
