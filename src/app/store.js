import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from "./api/apiSlice";


export const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(apiSlice.middleware),
    devTools: true
})


export default store