import styles from './styles.module.scss'
import Link from 'next/link'

import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import Image from 'next/image'

export function Header(){

  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

  return(
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link href="/">
            <Image src="/favicon.ico" width={10} height={10} alt="logo"/>
          </Link>

          <nav className={styles.menuNav}>

            <div>
              <Button className={styles.menu} variant="contained" {...bindTrigger(popupState)}>
                Menu
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>{<Link href="/"> HOME </Link>}</MenuItem>
                <MenuItem onClick={popupState.close}>{<Link href="/favoritos"> FAVORITOS </Link>}</MenuItem>

                <MenuItem onClick={popupState.close}>
                </MenuItem>
              </Menu>
            </div>

                
          </nav>

        </div>
      </header>
      <div className={styles.containerBanner}>
        <div className={styles.banner}>
          <h1>Rick and Morty</h1>
            <p> 
              Malucas viagens no tempo-espaço e por universos paralelos com Rick, 
              um cientista com problemas com a bebida, e seu neto Morty, um adolescente 
              não tão brilhante quanto o avô.
            </p>
        </div>
      </div>
    </>
  )
}