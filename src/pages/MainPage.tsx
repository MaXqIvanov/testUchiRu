import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../scss/MainPage.module.scss';
import { addFavorite, changePage, deleteFavorite } from '../store/mainSlice';

export const MainPage = () => {
    const dispatch = useDispatch();
    const {cats, loading} = useSelector((state:any)=> state.main)
    const [currentCat, setCurrentCat]= useState(null);
    const [fetching, setFetching] = useState(true);

    const scrollHandler = (e:any)=>{
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            if(loading === true){
                dispatch(changePage())
            }
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
    
      return () => {
        document.removeEventListener('scroll', scrollHandler)
      }
    }, [])
    

  return (
    <div className={styles.main}>
        <div className={styles.main_wrapper}>
            {cats.map((elem:any)=><div className={styles.cat} key={elem.id}>
                <div onMouseEnter={()=>setCurrentCat(elem.id)} style={{backgroundImage: `url(${elem.url})`}} className={styles.cat_wrapper}>
                    <div onClick={()=>{localStorage.getItem(`cat${elem.id}`) ? dispatch(deleteFavorite(elem)) : dispatch(addFavorite(elem))}} className={`${localStorage.getItem(`cat${elem.id}`) ? styles.favorite : currentCat == elem.id ? styles.btn_add : null}`}></div>
                </div>
            </div>)}
        </div>
        <div className={styles.pagination}>...Загружаем ещё котиков</div>
    </div>
  )
}
