import React from 'react';
import { useGetAllRentalsQuery, useUpdateRentalMutation } from '../../../redux/feature/Enpoints/Enpoints';
import RentalTable from '../../RentalTable/RentalTable';
import { message } from 'antd';

const ReturnBike = () => {

    const { data } = useGetAllRentalsQuery(null)
    const [updateRental] = useUpdateRentalMutation()

    const handleCalculate = async (rentalId, endTime) => {
        try {
            const response = await updateRental({ rentalId, endTime }).unwrap();
            console.log(response)

            if (response.success) {
                message.success('Bike returned successfully');
            }
        } catch (error) {
            message.error('Failed to return bike');
        }
    };

    return (
        <div>
            {data && (
                <RentalTable rentals={data.data} onCalculate={handleCalculate} />
            )}
        </div>
    );
};

export default ReturnBike;