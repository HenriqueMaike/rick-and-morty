import { render, screen } from "@testing-library/react";
import {Input} from "../components/ui/Input";

describe("<Input>", () => {
  test("Testar por elemento de entrada", () => {

    render(<Input></Input>);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
});