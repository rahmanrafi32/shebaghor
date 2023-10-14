import { configureStore } from '@reduxjs/toolkit';
import {baseApi} from "@/redux/api/baseApi";
import {reducer} from "@/redux/rootReducer";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
