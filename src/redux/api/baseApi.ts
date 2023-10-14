import { createApi } from '@reduxjs/toolkit/query/react'
import {axiosBaseQuery} from "@/helpers/axiosBaseQuery";

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: `http://localhost:8080/api/v1` }),
    tagTypes: ['service'],
    endpoints: () => ({}),
})

