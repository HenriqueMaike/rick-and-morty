import { render } from "@testing-library/react";
import { Button } from "../components/ui/buttom"
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'


describe('<Button>', ()=>{
    it('Testar por entrada de texto', ()=>{
        const { getByText, getByRole } = render(<Button>button</Button>)

        expect(getByText('button')).toBeInTheDocument();
        expect(getByRole('button')).toBeInTheDocument();
    })
})