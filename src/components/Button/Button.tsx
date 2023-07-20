interface Props {
    label: string | JSX.Element;
    color?: "teal" | "red" | "gray";
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    ariaLabel?: string;
}

const Button = ({ label, color = "gray", onClick, type = "button", ariaLabel }: Props) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`aspect-square appearance-none rounded-2xl bg-stone-100 text-2xl font-bold ${
                color === "teal"
                    ? "text-teal-300 dark:text-teal-200"
                    : color === "red"
                    ? "text-red-400"
                    : "text-stone-700 dark:text-gray-100"
            } hover:bg-stone-200 focus-visible:bg-stone-200 active:bg-zinc-100 
            dark:bg-dark-500 dark:hover:bg-dark-800 dark:focus-visible:bg-dark-800 dark:active:bg-dark-300`}
            aria-label={ariaLabel}
        >
            {label}
        </button>
    );
};
export default Button;
