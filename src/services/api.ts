import axios from "axios";

//instacia da base da api para poder ser consumida por outros componentes
const api = axios.create({
    baseURL: "https://rickandmortyapi.com/api/"
})

export default api;

//https://jumbled-smoke-7ef.notion.site/Desafio-T-cnico-Frontend-Web-fd6b6af685a5460794ffd45622f27dad