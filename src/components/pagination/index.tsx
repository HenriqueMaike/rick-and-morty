import * as React from 'react';
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '@/redux/useSlice';

//tipagem dos valores do fluxo
interface CharacterState {
  character: {
    name: string;
    page: number;
    pages: number;
  }
}

function Content() {

  //dispatch responsavel pelo envio do estado atual de qual pagina esta para ser consumido pelo params da API em HOME no Pages/index
  const dispatch = useDispatch();

  //variavell com o estado do numero de paginas obtidos pela API
  const statePage = useSelector((state: CharacterState)  => +state.character.pages);


  //bloco do componente do Material UI
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);


  //funcao que envia o estado pagina atual pelo fluxo para o componente HOME
  function handleChangePage(newPage: number) {
    dispatch(changePage(newPage));
  }

  return (
    <>
      <Pagination
        page={page}
        count={statePage} //<= estado que possue o numero de pagina da API
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
            {...item}
          />
        )}
        //evento que obtem o numero da pagina que se encontra
        onChange={(event, newPage) => handleChangePage(newPage)}
      />
    </>
  );
}


//bloco do componente do Material UI 
export default function PaginationLink() {
  return (
    <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
      <Routes>
        <Route path="*" element={<Content />} />
      </Routes>
    </MemoryRouter>
  );
}