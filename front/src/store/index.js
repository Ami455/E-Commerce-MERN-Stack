import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/AuthSlices';
import favoriteReducer from './slices/FavoriteSlices';
import cartReducer from './slices/CartSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartReducer,
    }
});
