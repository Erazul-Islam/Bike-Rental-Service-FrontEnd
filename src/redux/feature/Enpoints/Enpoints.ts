import { TBike, TResponseRedux } from "../../../utils/global";
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
        createBikes: builder.mutation({
            query: (newBike) => ({
                url: 'bikes',
                method: 'POST',
                body: newBike
            })
        })
    }),
});

export const { useGetAllBikesQuery, useCreateBikesMutation } = authApi;