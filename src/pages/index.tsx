import Head from 'next/head'
import styles from '@/styles/home.module.scss'
import PaginationLink from '@/components/pagination'
import { useEffect, useState } from 'react'
import api from '@/services/api'
import { useDispatch, useSelector } from 'react-redux'
import  {numPage}  from '../redux/useSlice'
import Link from 'next/link';
import { useRouter } from "next/router";
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import LinearProgress from "@mui/material/LinearProgress";
import Image from 'next/image'

//tipagem do objeto Character
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
}

//tipagem do State da pagina
interface CharacterState {
  character: {
    name: string;
    page: number;
  }
}

export default function Home() {

  const router = useRouter();
  const dispatch = useDispatch();

  //receber o valor do estado da pagina para passar pela UseEffect e atualizar a paginacao
  const statePage = useSelector((state: CharacterState)  => state.character.page);

  const [character, setCharacter] = useState<Character[]>([]);//const que receber os personagens com a tipagem Character 
  const [pages, setPages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const [specie, setSpecie] = useState('')

  useEffect(()=>{
    async function handlePage(){
      await api.get('character', {
        params:{
          page: statePage, //valor obtido no State de qual pagina esta
          name: name,
          status: status,
          species: specie,
          gender: gender
        }
      }).then((response) => {
        //obtem os dados do personagem 
        setCharacter(response.data.results)
        //obtem os dados da pagina
        setPages(response.data.info.pages)

        setLoading(false);
      })
      .catch(() => {
          //caso params nao exista retorna a pagina inicial
        router.push("/");
      });
    }

    window.scrollTo(0, 0);

    handlePage();

  },[statePage, name, gender, status, specie, router]) //statePage passado pelo array para que toda vez que houver alteracao de estado executa o useEffect

  //Envia a quantidade de pagina obtido pela API e enviar o State para o componente de paginacao
  dispatch(numPage(pages))

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
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="listagem de personagens com busca e uma tela de detalhes Rick and Morty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className={styles.container}>

        <div className={styles.filtros}>
          <div className={styles.inputs}>
              <div className={styles.input}>
                <Input
                  placeholder='Buscar Personagem'
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                />
              </div>

              <div className={styles.selects}>
                <label>Genero</label>
                <Select
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
                >
                  <option></option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Genderless</option>
                  <option>Unknown</option>
                </Select>

                <label>Status</label>
                <Select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                >
                  <option></option>
                  <option>Alive</option>
                  <option>Dead</option>
                  <option>Unknown</option>
                </Select>

                <label>Especie</label>
                <Select
                value={specie}
                onChange={(e)=>setSpecie(e.target.value)}
                >
                  <option></option>
                  <option>Human</option>
                  <option>Alien</option>
                </Select>
              </div>
          </div>
        </div>

        <div className={styles.containerChild}>
          
            {/*Mmap para exibir todos os item do array de objetos*/}
            {character.map((itens)=>{
                return(
                    <div className={styles.characters}>
                      <article className="comments" key={itens.id}>
                        <div>
                            <Link href={`/character/${itens.id}`}>
                              <Image 
                                width={250}
                                height={250}
                                src={`https://rickandmortyapi.com/api/character/avatar/${itens.id}.jpeg`} 
                                alt={itens.name}
                              />
                            </Link>
                            <strong>{itens.name}</strong>
                        </div>
                      </article>
                    </div>
                )  
              })
            }
        </div>
        <div className={styles.pagination}>

          {/*Componante de paginacao */}
          <PaginationLink/>
        </div>
      </main>
      <Footer/>
    </>
  )
}
