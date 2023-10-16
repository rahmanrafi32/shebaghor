import {baseApi} from "./baseApi"


const URL = "/users";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userInfo: build.query({
            query: () => ({
                url: `${URL}/user-info`,
                method: "GET",
            }),
            providesTags: ["user"]
        }),
    }),

})

export const {useUserInfoQuery} = userApi
