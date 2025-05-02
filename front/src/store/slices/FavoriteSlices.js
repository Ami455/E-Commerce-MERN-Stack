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
  },
});

export const { setFavoriteCount } = favoriteSlice.actions;
export default favoriteSlice.reducer;
