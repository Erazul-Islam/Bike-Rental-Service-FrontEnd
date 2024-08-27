import React, { useState } from 'react';
import { useAppSelector } from '../../../redux/hook';
import { useGetRentalsQuery } from '../../../redux/feature/Enpoints/Enpoints';
import { Button, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { Navigate } from 'react-router-dom';

const Booking = () => {

    const token = useAppSelector(state => state.auth.token)
    const [activeTab, setActiveTab] = useState('unpaid');
    const { data } = useGetRentalsQuery(token as string)
    console.log(data)

    const rentals = data?.data || [];
    console.log(rentals)

    const unpaidRentals = rentals?.filter(rental => rental.isReturned === false);
    const paidRentals = rentals?.filter(rental => rental.isReturned === true);
    // console.log(unpaidRentals)
    // console.log(paidRentals)


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
                                    <button
                                        onClick={() => {/* Redirect to Payment Page */ }}
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
            
        </div>
    );
};

export default Booking;