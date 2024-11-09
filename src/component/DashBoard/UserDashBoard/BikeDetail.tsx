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

        const email = user?.email

        const name = user?.name


        try {

            if (!email || !name) {
                message.error('User name or email is missing.');
                return;
            }

            const data = { name: name, email: email, amount: 200 };

            const response = await createPaymentIntent(100).unwrap();
            console.log(response.data)
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
        <div className='w-full rounded-lg shadow-lg overflow-hidden p-6  transition-colors duration-300'>
            <div className="flex flex-col md:flex-row items-center justify-around p-4 rounded-lg  transition-colors duration-300">
                <img
                    className="w-full md:w-1/2 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                    src={product?.image}
                    alt={product?.name}
                />

                <div className="md:ml-8 w-96 mt-6 md:mt-0  bg-gray-600 pt-12 pl-12 pb-12 pr-12 dark:text-white">
                    <div className=" gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center text-xl font-semibold">
                                <RiMotorbikeFill className="text-3xl mr-2 text-pink-700 dark:text-pink-600" />
                                <span>Bike name :  {product?.name}</span>
                            </div>
                            <div className="flex items-center text-xl font-semibold">
                                <FaCcDinersClub className="text-3xl mr-2 text-pink-700 dark:text-pink-600" />
                                <span>CC : {product?.cc} cc</span>
                            </div>
                            <div className="flex items-center text-xl font-semibold">
                                <GiCalendarHalfYear className="text-3xl mr-2 text-pink-700 dark:text-pink-600" />
                                <span>Year : {product?.year}</span>
                            </div>
                        </div>
                        <div className="flex mt-4 flex-col gap-4">
                            <div className="flex items-center text-xl font-semibold">
                                <MdOutlinePriceCheck className="text-3xl mr-2 text-pink-700 dark:text-pink-600" />
                                <span>Price per hour  ${product?.pricePerHour} / hour</span>
                            </div>
                            <div className="flex items-center text-xl font-semibold">
                                <MdOutlineModelTraining className="text-3xl mr-2 text-pink-700 dark:text-pink-600" />
                                <span>Model : {product?.model}</span>
                            </div>
                            <div className="flex items-center text-xl font-semibold">
                                <TbBrandAdobe className="text-3xl mr-2 text-pink-700 dark:text-pink-600" />
                                <span>Brand : {product?.brand}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        {product?.description}
                    </div>
                </div>
            </div>
            <div className='text-center mt-6'>
                {user ? (
                    <button
                        onClick={() => setIsModalVisible(true)}
                        className='w-full ml-20 md:w-1/3 h-12 bg-pink-800'
                        disabled={product?.isAvailable === false}
                    >
                        Book Now
                    </button>
                ) : (
                    <Link to='/login' className='text-blue-500'>Please Login</Link>
                )}
            </div>
            <Modal
                title="For Rental || Automatically Cut 100 Tk"
                open={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                centered
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Name">
                        <Input value={user?.name || ''} disabled />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input value={user?.email || ''} disabled />
                    </Form.Item>
                    <Form.Item name="start_time" label="Start Time">
                        <Input defaultValue={new Date().toLocaleString()} />
                        <div className='text-green-500 font-bold mt-2'>CARD NUMBER 4242 4242 4242 4242</div>
                    </Form.Item>
                    <CardElement />
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