import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from '../scss/Header.module.scss';

export const Header = () => {
    const [activePage, setActivePage] = useState<any>(1);
    const links = [
        {
            id: 1,
            path: '/',
            name: 'Все котики'
        },
        {
            id: 2,
            path: '/favorite',
            name: 'Любимые котики'
        }
    ]
  return (
    <div className={styles.header}>
        <div className={styles.header_wrapper}>
            {links.map((elem:any)=>
                <Link key={elem.id} onClick={()=>setActivePage(elem.id)} className={`${styles.Link} ${activePage == elem.id ? styles.active : null}`} to={elem.path}>{elem.name}</Link>
            )}
        </div>
    </div>
  )
}
