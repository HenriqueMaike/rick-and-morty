import axios from "axios";

//instacia da base da api para poder ser consumida por outros componentes
const api = axios.create({
    baseURL: "https://rickandmortyapi.com/api/"
})

export default api;