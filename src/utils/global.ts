import { BaseQueryApi } from "@reduxjs/toolkit/query";


export type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};

export type TBike = {
    name: string,
    description: string,
    pricePerHour: number,
    cc: number,
    year: number,
    model: string,
    brand: string,
    isAvailable: boolean
};

export type TResponse<T> = {
    data?: T;
    error?: TError;
    success: boolean;
    message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;