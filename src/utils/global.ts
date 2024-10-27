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
    _id: string,
    name: string,
    description: string,
    pricePerHour: number,
    cc: number,
    image: string,
    year: number,
    model: string,
    brand: string,
    isAvailable: boolean
};

export type TCoupon = {
    _id: string,
    code : string,
    discount: number
}

export type TRental = {
    _id: string
    bikeId: string,
    userId: Object | undefined
    startTime: string,
    returnTime: Date,
    totalCost: number,
    discountedTotalCost: number,
    isReturned: boolean,
    isPaid: boolean
};


export type TUser = {
    _id: string,
    name: string,
    role: string,
    email: string,
    address: string,
    phone: string
}

export type TResponse<T> = {
    data?: T;
    error?: TError;
    success: boolean;
    message: string;
};

export type TCart = {
    _id: string,
    userId: Object | undefined,
    userEmail: string | undefined,
    name: string | undefined,
    image: string | undefined,
    description: string | undefined,
    pricePerHour: number | undefined,
    cc: number | undefined,
    year: number | undefined,
    model: string | undefined,
    brand: string | undefined,
    isAvailable: boolean | undefined
}

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;