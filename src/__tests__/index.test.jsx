import { render, screen } from "@testing-library/react";
import Favoritos from "../../src/pages/favoritos";

describe("Favoritos", () => {
  it('Testar por nome renderizado', ()=>{
    const mockPersonagens = [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        gender: "Male",
        origin: { name: "Earth (C-137)" },
        location: { name: "Earth (Replacement Dimension)" },
      },
    ];

    localStorage.setItem("@meusfavoritos", JSON.stringify(mockPersonagens));

    render(<Favoritos />);

    const personagem = screen.getByText('Rick Sanchez');

    expect(personagem).toBeInTheDocument();
  })
});