import {createApi} from '@reduxjs/toolkit/query/react'
import {axiosBaseQuery} from "@/helpers/axiosBaseQuery";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({baseUrl}),
    tagTypes: ['service', 'admin','user', 'booking'],
    endpoints: () => ({}),
})

