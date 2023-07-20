import { render, fireEvent } from "@testing-library/react";
import { vitest } from "vitest";
import Button from "./Button";

describe("Button", () => {
    const onClick = vitest.fn();

    const commonClasses =
        "aspect-square appearance-none rounded-2xl bg-stone-100 text-2xl font-bold hover:bg-stone-200 focus-visible:bg-stone-200 active:bg-zinc-100 dark:bg-dark-500 dark:hover:bg-dark-800 dark:focus-visible:bg-dark-800 dark:active:bg-dark-300";

    it("renders correctly with default props", () => {
        const { getByRole } = render(<Button label="Click me" />);
        const button = getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass(`${commonClasses} text-stone-700 dark:text-gray-100`);
        expect(button).toHaveTextContent("Click me");
        expect(button).toHaveAttribute("type", "button");
    });

    it("renders correctly with specified props", () => {
        const { getByRole } = render(<Button label="Delete" color="red" onClick={onClick} type="submit" ariaLabel="Delete" />);
        const button = getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass(`${commonClasses} text-red-400`);
        expect(button).toHaveTextContent("Delete");
        expect(button).toHaveAttribute("type", "submit");
        expect(button).toHaveAttribute("aria-label", "Delete");
    });

    it("calls onClick when clicked", () => {
        const { getByRole } = render(<Button label="Click me" onClick={onClick} />);
        const button = getByRole("button");
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
