import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hook';
import { useCreateFullPaymentIntentMutation, useGetRentalsQuery, useUpdatePayementStatusMutation } from '../../../redux/feature/Enpoints/Enpoints';
import { Button, Form, Input, message, Modal, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { TRental } from '../../../utils/global';

const Booking = () => {

    const token = useAppSelector(state => state.auth.token)
    const [currentRental, setCurrentRental] = useState<TRental | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('unpaid');
    const [createPaymentIntent] = useCreateFullPaymentIntentMutation();
    const [updateRental] = useUpdatePayementStatusMutation()
    const { data } = useGetRentalsQuery(token as string)
    const stripe = useStripe();
    const elements = useElements();
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isValidCoupon, setIsValidCoupon] = useState(false);


    console.log(currentRental?.totalCost)

    const rentals = data?.data || [];
    const amount = Number(currentRental?.totalCost)
    console.log("amount",amount)
    const totalCostInCents = Math.round((Number(currentRental?.totalCost) - discount) * 100); 
    console.log('Cents',totalCostInCents)

    // console.log(rentals)

    const unpaidRentals = rentals?.filter(rental => rental.isPaid === false);
    const paidRentals = rentals?.filter(rental => rental.isPaid === true);

    const handlePayment = async () => {
        if (!stripe || !elements) {
            console.error('Stripe or Elements not initialized.');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        console.log(
            cardElement
        )

        if (!cardElement) {
            console.error('Card Element not found.');
            return;
        }

        if (!currentRental) {
            console.error('No rental selected.');
            return;
        }

        try {
            console.log('Attempting to create payment intent...');
            const response = await createPaymentIntent(totalCostInCents).unwrap();
            console.log('api response', response)
            console.log(response.data)
            const clientSecret = response?.data?.client_secret;
            console.log(clientSecret)

            if (!clientSecret) {
                throw new Error('Failed to retrieve client secret.');
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if (error) {
                console.error('Payment error:', error);
                // message.error('Your Payement is Unsuccessful')
            } else if (paymentIntent?.status === 'succeeded') {
                message.success('Your Payement is Successful')
                await updateRental({ id: currentRental._id, data: { isPaid: true } }).unwrap();
                setActiveTab('paid');
                setIsModalVisible(false);
            }
        } catch (error) {
            console.error('Payment error:', error);
            message.error('Your Payement is Unsuccessful')
        }
    };

    const validateCoupon = async () => {
        if (coupon === 'TAOSIF10') {
            setDiscount(currentRental?.totalCost * 0.1); 
            setIsValidCoupon(true);
        } else if (coupon === 'TAOSIF20)') {
            setDiscount(currentRental?.totalCost * 0.2); 
            setIsValidCoupon(true);
        } else if (coupon === 'TAOSIF30') {
            setDiscount(currentRental?.totalCost * 0.3);
            setIsValidCoupon(true);
        } else {
            setDiscount(0);
            setIsValidCoupon(false);
        }
    };

    useEffect(() => {
        if (coupon) {
            validateCoupon();
        }
    }, [coupon]);

    const showModal = (rental) => {
        setCurrentRental(rental);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Tabs
                aria-label="My Rentals Tabs"
                activeKey={activeTab}
                onChange={setActiveTab}
                className="mb-4"
            >
                <TabPane style={{ width: 300, }} key="unpaid" tab="Unpaid">
                    <div className="flex flex-col gap-4">
                        {unpaidRentals.length > 0 ? (
                            unpaidRentals.map(rental => (
                                <div key={rental._id} className="border p-4 rounded-lg shadow">
                                    <h1 className='text-orange-500'><strong>Start Time:</strong> {new Date(rental.startTime).toLocaleString()}</h1>
                                    <h1 className='text-orange-500'><strong>Total Cost:</strong> {rental.totalCost}</h1>
                                    <h1 className='text-orange-500'>Admin calculate your totalCost</h1>
                                    <button
                                        onClick={() => showModal(rental)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Pay
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No unpaid rentals found.</p>
                        )}
                    </div>
                </TabPane>
                <TabPane style={{ width: 300, color: 'bisque' }} key="paid" tab="Paid">
                    <div className="flex flex-col gap-4">
                        {paidRentals.length > 0 ? (
                            paidRentals.map(rental => (
                                <div key={rental._id} className="border p-4 rounded-lg text-orange-500">
                                    <h1 className='text-orange-500'><strong>Start Time:</strong> {new Date(rental.startTime).toLocaleString()}</h1>
                                    <h1 className='text-orange-500'><strong>Return Time:</strong> {rental.returnTime ? new Date(rental.returnTime).toLocaleString() : 'Not Returned'}</h1>
                                    <h1 className='text-orange-500'>Payement is done after discount</h1>
                                    <h1 className='text-orange-500'><strong>Total Cost:</strong> {rental.totalCost}</h1>
                                </div>
                            ))
                        ) : (
                            <p>No paid rentals found.</p>
                        )}
                    </div>
                </TabPane>
            </Tabs>
            <Modal
                title="For Rental"
                open={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="Coupon Code">
                        <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                        {isValidCoupon === true ? <h1 className='text-green-500 mt-4'>Coupon applied! Discount: {discount}</h1> : <h1 className='text-red-600 mt-4'>Use coupon</h1>}
                        {/* <h1 className='text-green-500 mt-4'>After discount {totalCostInCents}</h1> */}
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

export default Booking;