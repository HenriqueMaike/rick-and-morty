import { ReactNode, SelectHTMLAttributes } from "react";
import styles from './styles.module.scss'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    children: ReactNode;
}

export function Select({children, ...rest}: SelectProps){
    return(
        <select className={styles.select} {...rest}>
            {children}
        </select>
    )
}