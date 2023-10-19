import {baseApi} from "./baseApi"


const URL = "/feedback";

export const feedbackApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        giveFeedback: build.mutation({
            query: (feedback) => ({
                url: `${URL}/`,
                method: "POST",
                data: {feedback}
            }),
            invalidatesTags: ['feedback']
        }),
        getFeedbacks: build.query({
            query: () => ({
                url: `${URL}/`,
                method: "GET",
            }),
            providesTags: ['feedback']
        }),
    }),
})

export const {useGiveFeedbackMutation, useGetFeedbacksQuery} = feedbackApi
