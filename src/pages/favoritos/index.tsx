import { Header } from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react"

import { RiDeleteBin6Line } from "react-icons/ri";
import styles from './styles.module.scss'

import { toast } from "react-toastify";
import Image from "next/image";

interface Character{
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
}


export default function Favoritos(){

    const [character, setCharacter] = useState<Character[]>([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@meusfavoritos") ?? "[]";
        setCharacter(JSON.parse(minhaLista) || []);
    }, [])

    function ExcluirFavorito(id: any){
        let filtroFavoritos = character.filter((character)=>{
            return (character.id !== id)
        })

        setCharacter(filtroFavoritos);
        localStorage.setItem("@meusfavoritos", JSON.stringify(filtroFavoritos));
        toast.success("Removido com sucesso!")
    }

    if(character.length === 0){
        return (
            <>
            <Header/>
                <div className={styles.nenhum}>
                    <h1>Nenhum personagem salvo</h1>
                </div>
            </>
        )
    }


    return(
        <>
        <Header/>
            <div className={styles.containerFavorito}>
                <div className={styles.favorito}>
                    <ul>
                        {
                        character.map((character)=>{
                            return(
                                <li key={character.id}>
                                    <Link href={`/character/${character.id}`}>
                                        <Image
                                        width={40}
                                        height={40}
                                        src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`} alt={character.name}/>
                                    </Link>
                                    <span><strong>Nome: </strong>{character.name}</span>
                                    <p><strong>Status: </strong>{character.status}</p>
                                    <p><strong>Especie: </strong>{character.species}</p>
                                    <button onClick={()=>ExcluirFavorito(character.id)}><RiDeleteBin6Line/></button>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}