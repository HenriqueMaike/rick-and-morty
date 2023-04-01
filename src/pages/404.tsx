import { useRouter } from 'next/router';
import { useEffect } from 'react';

import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import styles from '@/styles/home.module.scss'

export default function Custom404(): ReactNode {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a pagina inicial depois de 3 segundos
    const timeout = setTimeout(() => {
      router.push('/');
    }, 3000);

    // Limpa o timeout se o componente for desmontado antes que o tempo limite seja atingido
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <>
      <Header/>
        <div className={styles.error}>
          <h1>404</h1>
          <h2>Página não encontrada</h2>
          <p>Você será redirecionado para a página inicial em segundos.</p>
        </div>
        
      <Footer/>
    </>
  );
}