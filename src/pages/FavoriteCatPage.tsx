import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../scss/Favorite.module.scss';
import { deleteFavorite, getFavorite } from '../store/mainSlice';


export const FavoriteCatPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFavorite())
  }, [])
  const {favoritesCat} = useSelector((state:any)=> state.main)
  const [currentFavoriteCat, setCurrentFavoriteCat]= useState(null);
  
  return (
    <div className={styles.favorite}>
      <div className={styles.favorite_wrapper}>
       {favoritesCat.map((elem:any)=><div className={styles.cat} key={elem.id}>
                <div onMouseEnter={()=>setCurrentFavoriteCat(elem.id)} style={{backgroundImage: `url(${elem.url})`}} className={styles.cat_wrapper}>
                   <div onClick={()=>{ dispatch(deleteFavorite(elem))}} className={`${currentFavoriteCat == elem.id ? styles.btn_favorite : null}`}></div>
                </div>
            </div>)}
      </div>
    </div>
  )
}
