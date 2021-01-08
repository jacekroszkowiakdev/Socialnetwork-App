import React from "react";
import ProfilePic from "./profilepic";
import { render, fireEvent } from "@testing-library/react";
import { container } from "webpack";

test("When no url is passed, /default.jpg is used as src", () => {
    // "container" is the same thing as "document" from week 2
    // it is our entry point into the DOM
    const { container } = render(<ProfilePic />);

    console.log(
        `container.querySelector("img): `,
        container.querySelector("img")
    );

    expect(container.querySelector("img").src.endsWith("/default.jpg")).toBe(
        true
    );
});

test("When first and last props are passed, first and last are assigned the value of the alt attribute", () => {
    const { container } = render(<ProfilePic first="Ivana" last="Matijevic" />);
    expect(container.querySelector("img").alt).toBe("asdasddsad");
});

test("onClick prop runs when the img is clicked", () => {
    const mockOnClick = jest.fn();
    // this is name of the prop that is cacalling mockOnClick, not adding the handler to ProfilePic here:
    render(<ProfilePic onClick={mockOnClick} />);

    // click on img in our test:
    fireEvent.click(container.querySelector("img"));

    // confirm that click handler was fired just once:
    expect(mockOnClick.mock.calls.length).toBe(1);
});
