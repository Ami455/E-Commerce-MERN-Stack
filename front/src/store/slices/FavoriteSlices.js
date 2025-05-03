import { createSlice } from '@reduxjs/toolkit';



const favoriteSlice = createSlice({
  name: 'favorites',
  initialState : {
    favoriteCount: 0,
  },
  reducers: {
    setFavoriteCount: (state, action) => {
      state.favoriteCount = action.payload;
    },
    clearFavoriteCount: (state, action) => {
      state.favoriteCount = 0;
    },
  },
});

export const { setFavoriteCount ,clearFavoriteCount} = favoriteSlice.actions;
export default favoriteSlice.reducer;
