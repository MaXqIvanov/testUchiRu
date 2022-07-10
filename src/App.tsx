import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { FavoriteCatPage } from './pages/FavoriteCatPage';
import { MainPage } from './pages/MainPage';
import { getCatAsync } from './store/mainSlice';

function App() {
  const dispatch = useDispatch()
  const {page} = useSelector((state:any) => state.main)
  useEffect(() => {
    dispatch(getCatAsync())
  }, [page])
  
  return (
    <div className="App">
      <Header />
        <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/favorite'} element={<FavoriteCatPage />} />
        </Routes>
    </div>
  );
}

export default App;
