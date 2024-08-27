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

    const date = new Date().getTime()
    console.log(date)

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
                .then(() =>{
                    message.success(' Booking confirmed.');
                })
                .catch((err) =>{
                    message.error('Failed to create Rental: ' + err.message);
                })
                await updateBikeAvailability({ id: _id, isAvailable: false })
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
        <div className=' bg-black h-screen'>
            <div >
                <h1 className='pt-3 pl-4 text-left'>Name: {product?.name}</h1>
                <img className='' src={product?.image} alt="" />
                <div className='flex gap-12 pl-8 pr-8 pt-4'>
                    <div>
                        <div className='flex gap-2'>
                            <h1 className='text-red-600 text-2xl'><RiMotorbikeFill /> </h1>
                            <h2 className="text-white">{product?.name}</h2>
                        </div>
                        <div className='flex mt-4 gap-2'>
                            <h1 className='text-red-600 text-2xl'><FaCcDinersClub /> </h1>
                            <h2 className="text-white">{product?.cc}</h2>
                        </div>
                        <div className='flex mt-4 gap-2'>
                            <h1 className='text-red-600 text-2xl'><GiCalendarHalfYear /> </h1>
                            <h2 className="text-white">{product?.year}</h2>
                        </div>
                    </div>
                    <div>
                        <div className='flex gap-2'>
                            <h1 className='text-red-600 text-2xl'><MdOutlinePriceCheck /> </h1>
                            <h2 className="text-white">{product?.pricePerHour}</h2>
                        </div>
                        <div className='flex mt-4 gap-2'>
                            <h1 className='text-red-600 text-2xl'><MdOutlineModelTraining /> </h1>
                            <h2 className="text-white">{product?.model}</h2>
                        </div>
                        <div className='flex mt-4 gap-2'>
                            <h1 className='text-red-600 text-2xl'><TbBrandAdobe /> </h1>
                            <h2 className="text-white">{product?.brand}</h2>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    {product?.description}
                    <div onClick={() => setIsModalVisible(true)} className='text-center'><Button className='h-12'>Book Now</Button></div>
                </div>
            </div>
            <Modal
                title="For Rental"
                open={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="start_time" label="Start Time">
                        <Input defaultValue={new Date().toLocaleString()} />
                    </Form.Item>
                    <CardElement />
                    <Button type="primary" onClick={handlePayment} className='pb-4 h-12'>
                        Pay Now
                    </Button>
                    <Button onClick={handleCancel} className='pb-4 h-12'>
                        Cancel
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default BikeDetail;