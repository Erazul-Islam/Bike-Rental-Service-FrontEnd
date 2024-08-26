import { TBike, TResponseRedux, TUser } from "../../../utils/global";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBikes: builder.query({
            query: () => {
                return { url: '/bikes', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TBike[]>) => {
                return {
                    data: response.data
                };
            },
        }),
        getAllProfile: builder.query({
            query: () => {
                return { url: '/auth/all-profile', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TUser[]>) => {
                return {
                    data: response.data
                };
            },
        }),
        
        createBikes: builder.mutation({
            query: (newBike) => ({
                url: 'bikes',
                method: 'POST',
                body: newBike
            })
        }),
        deleteBike: builder.mutation({
            query: (id) => ({
                url: `bikes/${id}`,
                method: 'DELETE'
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `auth/${id}`,
                method: 'DELETE'
            })
        }),
        updateBike: builder.mutation({
            query: ({ id, ...updatedBike }) => ({
                url : `bikes/${id}`,
                method: 'PUT',
                body: updatedBike
            })
        }),
        updateUserProfile : builder.mutation({
            query: (updatedUser) => ({
                url: '/auth/me',
                method: 'PUT',
                body: updatedUser
            }),
            transformResponse: (response:TResponseRedux<TUser>) => response.data
        })
    }),
});

export const { useGetAllBikesQuery, useCreateBikesMutation, useDeleteBikeMutation,useUpdateBikeMutation, useGetAllProfileQuery,useDeleteUserMutation,useUpdateUserProfileMutation } = authApi;