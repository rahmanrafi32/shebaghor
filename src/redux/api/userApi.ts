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
        updateUserInfo: build.mutation({
            query: (payload) => ({
                url: `${URL}/`,
                method: "PATCH",
                data: payload
            }),
            invalidatesTags: ["user"]
        }),
    }),

})

export const {useUserInfoQuery, useLazyUserInfoQuery,useUpdateUserInfoMutation} = userApi
