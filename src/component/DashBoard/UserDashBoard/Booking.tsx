import React, { useState } from 'react';
import { useAppSelector } from '../../../redux/hook';
import { useCreateFullPaymentIntentMutation, useCreatePaymentIntentMutation, useGetRentalsQuery, useUpdatePayementStatusMutation } from '../../../redux/feature/Enpoints/Enpoints';
import { Button, Form, message, Modal, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { TRental } from '../../../utils/global';

const Booking = () => {

    const token = useAppSelector(state => state.auth.token)
    const [currentRental, setCurrentRental] = useState<TRental | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('unpaid');
    const [createPaymentIntent] = useCreateFullPaymentIntentMutation();
    // const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const [updateRental] = useUpdatePayementStatusMutation()
    const { data } = useGetRentalsQuery(token as string)
    const stripe = useStripe();
    const elements = useElements();

    console.log(currentRental?.totalCost)

    const rentals = data?.data || [];
    const amount = Number(currentRental?.totalCost)
    const totalCostInCents = Math.round(Number(currentRental?.totalCost) * 100);

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
            console.log('api response',response)
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
                <TabPane key="unpaid" tab="Unpaid">
                    <div className="flex flex-col gap-4">
                        {unpaidRentals.length > 0 ? (
                            unpaidRentals.map(rental => (
                                <div key={rental._id} className="border p-4 rounded-lg shadow">
                                    <p><strong>Start Time:</strong> {new Date(rental.startTime).toLocaleString()}</p>
                                    <p><strong>Total Cost:</strong> {rental.totalCost}</p>
                                    <p>Admin calculate your totalCost</p>
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
                <TabPane key="paid" tab="Paid">
                    <div className="flex flex-col gap-4">
                        {paidRentals.length > 0 ? (
                            paidRentals.map(rental => (
                                <div key={rental._id} className="border p-4 rounded-lg shadow">
                                    <p><strong>Start Time:</strong> {new Date(rental.startTime).toLocaleString()}</p>
                                    <p><strong>Return Time:</strong> {rental.returnTime ? new Date(rental.returnTime).toLocaleString() : 'Not Returned'}</p>
                                    <p><strong>Total Cost:</strong> {rental.totalCost}</p>
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
                <Form  layout="vertical">
                    
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