import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TUser {
    [_id: string]: any;
    name: string,
    email: string,
    password: string,
    phone: string,
    image : string
    address: string,
    country : string,
    city : string
    createdAt: Date,
    updatedAt: Date,
    role: 'admin' | 'user'
};

type TAuthState = {
    user: null | TUser;
    token: null | string;
};

const initialState: TAuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: TUser | null; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;