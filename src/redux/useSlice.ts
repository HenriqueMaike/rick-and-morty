import { createSlice } from "@reduxjs/toolkit";

//tipagem do valor de cada variavel 
interface RootState {
    character: string;
    page: number;
    pages: number,
}

//estado inicial de cada variavel 
const initialState: RootState = {
    character: '',
    page: 0,
    pages: 0,
};

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        //funcao responsavel por armazenar o nome do personagem para buscas 
        changeCharacter(state, { payload }) {
        return { ...state, character: payload };
        },
        //funcai responsavel pelo estado que pagina esta a navegacao
        changePage(state, { payload }) {
            return { ...state, page: payload };
        },
        //funcao responsavel pelo estado que contem a quantidade de paginas
        numPage(state, { payload }) {
            return { ...state, pages: payload };
        },
    },
});

export const { changeCharacter, changePage, numPage } = characterSlice.actions;

export const selectCharacter = (state: RootState) => state.character;
export const selectPage = (state: RootState) => state.page;
export const selectNumPages = (state: RootState) => state.pages;

export default characterSlice.reducer;