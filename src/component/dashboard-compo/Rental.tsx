import React from 'react';
import { useGetAllRentalsQuery } from '../../redux/feature/Enpoints/Enpoints';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const Rental = () => {

    const { data } = useGetAllRentalsQuery(null)

    const rents = data?.data

    const chartData = rents?.map((item) => ({
        date: new Date(item?.createdAt).toLocaleDateString(),
        cost: item.discountedTotalCost
    }));

    console.log(chartData)

    return (
        <div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            color: '#fff',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        }}
                        itemStyle={{
                            color: '#ff7300',
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="cost"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Rental;