import { apiSlice } from "../../app/api/apiSlice";


export const adviceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdvice: builder.query({
            query: (arg) => ({
                url: "/advice"
            }),
            providesTags: ["advice"]
        }),
    })
})


export const {
    useGetAdviceQuery
} = adviceApiSlice