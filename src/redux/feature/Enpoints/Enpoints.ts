import { TBike, TCoupon, TRental, TResponseRedux, TUser } from "../../../utils/global";
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
        getAllRentals: builder.query({
            query: () => {
                return { url: '/rentals/all-rental', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TRental[]>) => {
                return {
                    data: response.data
                };
            },
        }),
        getRentals: builder.query<TRental[], string>({
            query: (token) => ({
                url: '/rentals',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
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
        createCoupon: builder.mutation({
            query: (newCoupon) => ({
                url: '/coupon',
                method: 'POST',
                body: newCoupon
            })
        }),
        getAllCoupon: builder.query({
            query: () => {
                return { url: '/coupon', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TCoupon[]>) => {
                return {
                    data: response.data
                };
            },
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/coupon/${id}`,
                method: 'DELETE'
            })
        }),
        updateCoupomn: builder.mutation({
            query: ({ couponlId, data }) => ({
                url: `coupon/${couponlId}`,
                method: 'PUT',
                body: { data }
            })
        }),
        createRentals: builder.mutation({
            query: (newRent) => ({
                url: 'rentals',
                method: 'POST',
                body: newRent
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
                url: `bikes/${id}`,
                method: 'PUT',
                body: updatedBike
            })
        }),
        updateRental: builder.mutation({
            query: ({ rentalId, isReturned }) => ({
                url: `rentals/${rentalId}/return`,
                method: 'PUT',
                body: { isReturned }
            })
        }),
        updateUserProfile: builder.mutation({
            query: (updatedUser) => ({
                url: '/auth/me',
                method: 'PUT',
                body: updatedUser
            }),
            transformResponse: (response: TResponseRedux<TUser>) => response.data
        }),
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: { role }
            }),
            transformResponse: (response: TResponseRedux<TUser>) => response.data
        }),
        createPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: '/payement/create-payment-intent',
                method: 'POST',
                body: { amount }
            })
        }),
        createFullPaymentIntent: builder.mutation({
            query: (amount) => ({
                url: '/payement/create-full-payment-intent',
                method: 'POST',
                body: { amount }
            })
        }),
        updateBikeAvailability: builder.mutation({
            query: ({ id, isAvailable }) => ({
                url: `bikes/${id}/availability`,
                method: 'PATCH',
                body: { isAvailable },
            }),
        }),
        updatePayementStatus: builder.mutation({
            query: ({ id, isPaid }) => ({
                url: `rentals/${id}`,
                method: 'PATCH',
                body: { isPaid },
            }),
        }),
    }),
});

export const { useGetAllBikesQuery, useUpdateCoupomnMutation, useDeleteCouponMutation, useCreateCouponMutation, useGetAllCouponQuery, useCreateFullPaymentIntentMutation, useUpdatePayementStatusMutation, useUpdateRentalMutation, useGetAllRentalsQuery, useGetRentalsQuery, useCreateRentalsMutation, useCreateBikesMutation, useDeleteBikeMutation, useUpdateBikeMutation, useGetAllProfileQuery, useDeleteUserMutation, useUpdateUserProfileMutation, useCreatePaymentIntentMutation, useUpdateUserRoleMutation, useUpdateBikeAvailabilityMutation } = authApi;