import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.adviceslip.com/",
})


const baseQueryWithChange = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.data) {
        result.data = result.data.slip.advice
    }
    return result
}


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithChange,
    tagTypes: ["advice"],
    endpoints: builder => ({})
})

