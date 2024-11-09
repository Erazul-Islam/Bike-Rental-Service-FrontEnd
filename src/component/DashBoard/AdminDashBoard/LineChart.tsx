import React from 'react';
import Barchart from '../../dashboard-compo/Barchart';
import Rental from '../../dashboard-compo/Rental';


const LineChart = () => {
    return (
        <div>
            <div className='text-center text-white text-xl'>Payment History</div>
            <Barchart />
            <div className='text-center text-white text-xl'>Discount</div>
            <Rental/>
        </div>
    );
};

export default LineChart;