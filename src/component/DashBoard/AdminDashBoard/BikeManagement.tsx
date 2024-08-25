import React from 'react';
import { useGetAllBikesQuery } from '../../../redux/feature/Enpoints/Enpoints';

const BikeManagement = () => {

    const { data, error, isLoading,} = useGetAllBikesQuery(null)
    console.log(data)
    return (
        <div>
            Bike
        </div>
    );
};

export default BikeManagement;