import { baseApi } from "./baseApi"


const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => ({
                url:`${ AUTH_URL}/sign-in`,
                method: "POST",
                data: loginData
            }),
        }),
    }),

})

export const { useUserLoginMutation } = authApi
