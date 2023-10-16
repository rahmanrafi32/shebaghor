import {baseApi} from "./baseApi"


const URL = "/booking";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBooking: build.mutation({
            query: (bookingData) => ({
                url: `${URL}/`,
                method: "POST",
                data: bookingData
            }),
            invalidatesTags: ['booking']
        }),
        getAllBookings: build.query({
            query: () => ({
                url: `${URL}/`,
                method: "GET",
            }),
            providesTags: ['booking']
        }),
        deleteUserBooking: build.mutation({
            query: (id) => ({
                url: `${URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['booking']
        }),
        getAllBookingsForAdmin: build.query({
            query: () => ({
                url: `${URL}/all-bookings`,
                method: "GET",
            }),
            providesTags: ['booking']
        }),
        changeBookingStatus: build.mutation({
            query: ({id, ...data}) => ({
                url: `${URL}/edit-status/${id}`,
                method: "PATCH",
                data
            }),
            invalidatesTags: ['booking']
        }),
        deleteBooking: build.mutation({
            query: (id) => ({
                url: `${URL}/delete-booking/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['booking']
        }),
    }),
})

export const {
    useCreateBookingMutation,
    useGetAllBookingsQuery,
    useDeleteUserBookingMutation,
    useGetAllBookingsForAdminQuery,
    useChangeBookingStatusMutation,
    useDeleteBookingMutation,
} = bookingApi;
