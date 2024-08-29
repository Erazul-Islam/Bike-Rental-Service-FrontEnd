import { createSlice } from '@reduxjs/toolkit';

export const couponSlice = createSlice({
    name: 'coupon',
    initialState: {
        code: '',
    },
    reducers: {
        setCouponCode: (state, action) => {
            state.code = action.payload;
        },
    },
});

export const { setCouponCode } = couponSlice.actions;
export default couponSlice.reducer;
