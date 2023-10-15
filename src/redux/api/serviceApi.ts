import {baseApi} from "./baseApi"


const URL = "/services";

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllServices: build.query({
            query: () => ({
                url: `${URL}`,
                method: "GET",
            }),
            providesTags: ["service"]
        }),
        getServiceById: build.query({
            query: (id) => ({
                url: `${URL}/${id}`,
                method: "GET",
            }),
            providesTags: ["service"]
        }),
        addReview: build.mutation({
            query: ({id, ...data}) => ({
                url: `${URL}/add-review/${id}`,
                method: "POST",
                data: {reviews: data}
            }),
            invalidatesTags: ["service"],
        }),
        addService: build.mutation({
            query: (payload) => ({
                url: `${URL}/create-service`,
                method: "POST",
                data: payload
            }),
            invalidatesTags: ["service"],
        }),
        deleteService: build.mutation({
            query: (id) => ({
                url: `${URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["service"],
        }),
        editService: build.mutation({
            query: ({id, ...data}) => ({
                url: `${URL}/edit-service/${id}`,
                method: "PATCH",
                data
            }),
            invalidatesTags: ["service"],
        }),
    }),
})

export const {
    useGetAllServicesQuery,
    useAddReviewMutation,
    useGetServiceByIdQuery,
    useAddServiceMutation,
    useDeleteServiceMutation,
    useEditServiceMutation
} = serviceApi
