import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/AuthSlices';


export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});
