import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LinearProgress from "@mui/material/LinearProgress";
import api from "@/services/api";

import styles from './styles.module.scss'
import { Button } from "@/components/ui/buttom";
import { Header } from "@/components/Header";
import { toast } from "react-toastify";
import Image from "next/image";


//tipagem do objeto character com as informacoes a exibir
interface Character {
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

export default function Character() {

    //responsavel por obter o index da pagina para o id
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);

  //definicao do array de objetos e as propriedade que vao receber
  const [character, setCharacter] = useState<Character>({
    id: 0,
    name: "",
    status: "",
    species: "",
    gender: "",
    location: { name: "" },
    origin: { name: "" },
  });

  //obtem as informacoes da API de acordo com o id do personagem
  useEffect(() => {
    async function loadCharacter() {
      await api
        .get(`character/${id}`)
        .then((response) => {
          setCharacter(response.data);
          setLoading(false);
        })
        .catch(() => {
            //caso a pagina ao exista retorna a tela principal
          router.push("/");
        });
    }

    loadCharacter();
  }, [id, router]);


function handleFavorite(character: Character) {
    // Obtem o valor do localStorage
    const minhalista = JSON.parse(localStorage.getItem("@meusfavoritos") || "[]");

    // Verificar se o personagem ja existe na lista de favoritos do localStorage
    const index = minhalista.findIndex((c: Character) => c.id === character.id);

    // Se o personagem ja existe, nao adiciona novamente
    if (index !== -1) {
        toast.error("Personagem já adicionado");
        return;
    }

    // Adicionar o objeto ao array
    minhalista.push(character);

    // Converter o array atualizado em uma string JSON
    const minhalistaString = JSON.stringify(minhalista);

    // Salvar a string JSON atualizada no localStorage
    localStorage.setItem("@meusfavoritos", minhalistaString);
    toast.success("Adicionado com sucesso")
}

//Se nao estiver carregado os dados da API exibir barra de loadind do Material UI
  if (loading) {
    return (
      <div>
        <div className="loading">
          <LinearProgress />
        </div>
      </div>
    );
  }

  return (
    <>
    <Header/>
      <div className={styles.containerCharacter}>
        <div className={styles.characters}>
          <div className={styles.character} key={character.id}>
            
              <div className={styles.imagem}>
                <Image
                    width={250}
                    height={250}
                    src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`}
                    alt={character.name}
                  />
              </div>
                

              <div className={styles.dados}>
                <h3>{character.name}</h3>
                <p><strong>Status: </strong>{character.status}</p>
                <p><strong>Espécie: </strong>{character.species}</p>
                <p><strong>Gênero: </strong>{character.gender}</p>
                <p><strong>Localização: </strong>{character.location.name}</p>
                <p><strong>Origem: </strong>{character.origin.name}</p>
              </div>

              <div className={styles.button}>
                  {/*Chama a funcao de armazenar nos favoritos os personagens*/}
                  <Button onClick={() => handleFavorite(character)}>Salvar Favoritos</Button>
              </div>

          </div>
        </div>
      </div>
    </>
  );
}
