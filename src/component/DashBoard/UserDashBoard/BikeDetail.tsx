import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCreatePaymentIntentMutation, useCreateRentalsMutation, useGetAllBikesQuery, useUpdateBikeAvailabilityMutation } from '../../../redux/feature/Enpoints/Enpoints';
import { TBike } from '../../../utils/global';
import { RiMotorbikeFill } from "react-icons/ri";
import { MdOutlinePriceCheck } from "react-icons/md";
import { FaCcDinersClub } from "react-icons/fa";
import { GiCalendarHalfYear } from "react-icons/gi";
import { MdOutlineModelTraining } from "react-icons/md";
import { TbBrandAdobe } from "react-icons/tb";
import { Button, Form, Input, message, Modal, } from 'antd';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

const BikeDetail = () => {

    const { _id } = useParams()
    const { data } = useGetAllBikesQuery({})
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const [updateBikeAvailability] = useUpdateBikeAvailabilityMutation();
    const [createRental] = useCreateRentalsMutation()
    const [form] = Form.useForm();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.auth.user)

    const [product, setProduct] = useState<TBike>()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    useEffect(() => {
        const findProduct = data?.data?.find((product: { _id: string | undefined; }) => product._id === _id)
        setProduct(findProduct)
    }, [_id, data])

    const handlePayment = async () => {
        if (!stripe || !elements) {
            console.error('Stripe or Elements not initialized.');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            console.error('Card Element not found.');
            return;
        }

        try {
            // Create payment intent
            const response = await createPaymentIntent(100).unwrap();
            console.log(response)
            const clientSecret = response?.data?.client_secret;
            console.log(clientSecret)

            if (!clientSecret) {
                throw new Error('Failed to retrieve client secret.');
            }

            // Confirm the payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if (error) {
                console.error('Payment confirmation error:', error.message);
                message.error('Payment confirmation error: ' + error.message);
            } else if (paymentIntent?.status === 'succeeded') {
                message.success('Payment successful!');
                await createRental({ bikeId: _id, startTime: new Date() }).unwrap()
                    .then(() => {
                        message.success(' Booking confirmed.');
                    })

                    .catch((err) => {
                        message.error('Failed to create Rental: ' + err.message);
                    })
                await updateBikeAvailability({ id: _id })
                    .unwrap()
                    .then(() => {
                        console.log()
                    })
                    .catch((err) => {
                        message.error('Failed to update bike availability: ' + err.message);
                    });
                setIsModalVisible(false);
                navigate('/user/dashboard/booking')
            }
        } catch (error) {
            console.error('Payment error:', error);
        }
    };


    return (
        <div className='min-h-screen flex flex-col items-center p-4'>
            <div className='max-w-4xl w-full rounded-lg shadow-md p-6'>
                <h1 className='text-3xl font-bold text-center mb-4'>{product?.name}</h1>
                <div className='flex flex-col md:flex-row items-center justify-center'>
                    <img className='w-full md:w-1/2 rounded-lg' src={product?.image} alt={product?.name} />
                    <div className='md:ml-6 mt-6 md:mt-0'>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center text-lg'>
                                    <RiMotorbikeFill className='text-red-600 text-2xl mr-2' />
                                    <span>{product?.name}</span>
                                </div>
                                <div className='flex items-center text-lg'>
                                    <FaCcDinersClub className='text-red-600 text-2xl mr-2' />
                                    <span>{product?.cc}</span>
                                </div>
                                <div className='flex items-center text-lg'>
                                    <GiCalendarHalfYear className='text-red-600 text-2xl mr-2' />
                                    <span>{product?.year}</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center text-lg'>
                                    <MdOutlinePriceCheck className='text-red-600 text-2xl mr-2' />
                                    <span>{product?.pricePerHour}</span>
                                </div>
                                <div className='flex items-center text-lg'>
                                    <MdOutlineModelTraining className='text-red-600 text-2xl mr-2' />
                                    <span>{product?.model}</span>
                                </div>
                                <div className='flex items-center text-lg'>
                                    <TbBrandAdobe className='text-red-600 text-2xl mr-2' />
                                    <span>{product?.brand}</span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-6 text-lg '>
                            {product?.description}
                        </div>
                    </div>
                </div>
                <div className='text-center mt-6'>
                    {user ? (
                        <Button
                            onClick={() => setIsModalVisible(true)}
                            className='w-full md:w-1/3 h-12 bg-blue-500 text-white hover:bg-blue-600'
                            disabled={product?.isAvailable === false}
                        >
                            Book Now
                        </Button>
                    ) : (
                        <Link to='/login' className='text-blue-500'>Please Login</Link>
                    )}
                </div>
            </div>
            <Modal
                title="For Rental || Automatically Cut 100 Tk"
                open={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                centered
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="start_time" label="Start Time">
                        <Input defaultValue={new Date().toLocaleString()} />
                        <h1 className='text-green-500 font-bold mt-2'>CARD NUMBER 4242 4242 4242 4242</h1>
                    </Form.Item>
                    <CardElement className='mb-4 p-2 border rounded-md' />
                    <Button type="primary" onClick={handlePayment} className='w-full h-12 bg-green-500 text-white hover:bg-green-600'>
                        Pay Now
                    </Button>
                    <Button onClick={handleCancel} className='w-full h-12 mt-2 bg-red-500 text-white hover:bg-red-600'>
                        Cancel
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default BikeDetail;