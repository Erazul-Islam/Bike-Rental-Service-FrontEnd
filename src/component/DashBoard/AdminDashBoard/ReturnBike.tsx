import React from 'react';
import { useGetAllRentalsQuery, useUpdateRentalMutation } from '../../../redux/feature/Enpoints/Enpoints';
import RentalTable from '../../RentalTable/RentalTable';
import { message, notification } from 'antd';

const ReturnBike = () => {

    const { data } = useGetAllRentalsQuery(null)
    const [updateRental] = useUpdateRentalMutation()

    const handleCalculate = async (rentalId, endTime) => {
        try {
            const response = await updateRental({ rentalId, endTime }).unwrap();
            console.log(response)

            if (response.success) {
                notification.success({
                    message : "Success",
                    description : "Bike returned successfully"
                });
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