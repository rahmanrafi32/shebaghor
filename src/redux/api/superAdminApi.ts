import {baseApi} from "./baseApi"


const URL = "/super-admin";
const USER_URL = "/users";

export const superAdminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createAdmin: build.mutation({
            query: (loginData) => ({
                url: `${URL}/create-admin`,
                method: "POST",
                data: loginData
            }),
            invalidatesTags: ["admin"],
        }),
        deleteAdmin: build.mutation({
            query: (id) => ({
                url: `${URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["admin"],
        }),
        manageAdminRole: build.mutation({
            query: ({id, ...data}) => ({
                url: `${URL}/manage-admin/${id}`,
                method: "PATCH",
                data
            }),
            invalidatesTags: ["admin"],
        }),
        getAllAdmins: build.query({
            query: () => ({
                url: `${URL}`,
                method: "GET",
            }),
            providesTags: ["admin"]
        }),
        getAllUsers: build.query({
            query: () => ({
                url: `${USER_URL}`,
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"],
        }),
        editUser: build.mutation({
            query: ({id, ...data}) => ({
                url: `${USER_URL}/${id}`,
                method: "PATCH",
                data
            }),
            invalidatesTags: ["user", 'admin'],
        }),
        createUser: build.mutation({
            query: (loginData) => ({
                url: `/auth/signup`,
                method: "POST",
                data: loginData
            }),
            invalidatesTags: ["user"],
        }),
    }),
})

export const {
    useCreateAdminMutation,
    useGetAllAdminsQuery,
    useDeleteAdminMutation,
    useManageAdminRoleMutation,
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useEditUserMutation,
    useCreateUserMutation
} = superAdminApi
