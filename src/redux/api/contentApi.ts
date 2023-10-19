import {baseApi} from "./baseApi"


const URL = "/content";

export const feedbackApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addContent: build.mutation({
            query: (content) => ({
                url: `${URL}/`,
                method: "POST",
                data: content
            }),
            invalidatesTags: ['content']
        }),
        getContents: build.query({
            query: () => ({
                url: `${URL}/`,
                method: "GET",
            }),
            providesTags: ['content']
        }),
    }),
})

export const {useAddContentMutation, useGetContentsQuery} = feedbackApi
