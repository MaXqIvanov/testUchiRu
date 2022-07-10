import { FavoriteCatPage } from './../pages/FavoriteCatPage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getCatAsync:any = createAsyncThunk(
  'profile/getCatAsync',
  async (params:any, state:any) => { // here you have two arguments
     let page = state.getState().main.page;
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=15&page=${Number(page)}&order=Desc`,{
        headers:{
            'x-api-key': 'bcd1380a-774c-4270-a5e8-4a7ebb522479'
      }
      })
    return response
  },
)


const mainSlice:any = createSlice({
  name: 'main',
  initialState: {
    cats: [] as any[],
    favoritesCat: [] as any[],
    page: 1,
    // async 
    loading: true as boolean,
  },
  reducers: {
    getFavorite(state:any, action:any) {
        let keys =  Object.keys(localStorage);
        keys = keys.filter((elem:any)=> elem.includes('cat'))
        state.favoritesCat = keys.map((elem:any)=> JSON.parse(String(localStorage.getItem(elem))));
    },
    addFavorite(state:any, action:any) {
        localStorage.setItem(`cat${action.payload.id}`, JSON.stringify(action.payload))
        state.favoritesCat = [state.favoritesCat, action.payload];
    },
    deleteFavorite(state:any, action:any) {
        localStorage.removeItem(`cat${action.payload.id}`)
        state.favoritesCat = state.favoritesCat.filter((elem:any)=> elem.id !== action.payload.id)
    },
    changePage(state:any, payload:any) {
        state.loading = false;
        state.page = Number(state.page) + 1;
    }
  },
  extraReducers: {
    [getCatAsync.pending]: (state:any, action:any) => {
      state.loading = false;
    },
    [getCatAsync.fulfilled]: (state:any, { payload }:any) => {
        state.loading = true;
        state.cats.push(...payload.data);
    },
    [getCatAsync.rejected]: (state:any, action: any) => {
      state.loading = true;
    },
  }
})

export default mainSlice.reducer;
export const { addFavorite, deleteFavorite, getFavorite, changePage } =
mainSlice.actions;