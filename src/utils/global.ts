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

export type TImage = {
  image : string
}


export type TCoupon = {
    _id: string,
    code : string,
    discount: number
}

export type TRental = {
    createdAt: string | number | Date;
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

type PaymentIntent = {
    id: string;
    object: string;
    amount: number;
    amount_capturable: number;
    amount_details: {
      tip: Record<string, unknown>;
    };
    amount_received: number;
    application: string | null;
    application_fee_amount: number | null;
    automatic_payment_methods: string | null;
    canceled_at: number | null;
    cancellation_reason: string | null;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    created: number;
    currency: string;
    customer: string | null;
    description: string | null;
    invoice: string | null;
    last_payment_error: string | null;
    latest_charge: string;
    livemode: boolean;
    metadata: Record<string, unknown>;
    next_action: string | null;
    on_behalf_of: string | null;
    payment_method: string;
    payment_method_configuration_details: string | null;
    payment_method_options: {
      card: {
        installments: string | null;
        mandate_options: string | null;
        network: string | null;
        request_three_d_secure: string;
      };
    };
    payment_method_types: string[];
    processing: string | null;
    receipt_email: string | null;
    review: string | null;
    setup_future_usage: string | null;
    shipping: string | null;
    source: string | null;
    statement_descriptor: string | null;
    statement_descriptor_suffix: string | null;
    status: string;
    transfer_data: string | null;
    transfer_group: string | null;
  };
  
export  type TPaymentResponse = {
    status: any;
    amount: number;
    id: any;
    success: boolean;
    data: PaymentIntent[];
  };
  

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;