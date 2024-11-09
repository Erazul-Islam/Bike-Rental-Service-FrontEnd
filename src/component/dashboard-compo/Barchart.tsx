import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { useGetAllTransactionHistoyQuery } from '../../redux/feature/Enpoints/Enpoints';


const Barchart = () => {
    const { data: transactions, } = useGetAllTransactionHistoyQuery([])
    const transtactionData = transactions?.data

    const chartData = transtactionData?.map((transaction) => ({
        name: transaction.id,
        amount: transaction.amount / 100,
        status: transaction.status,
    }));

    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
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
                    <Bar
                        dataKey="amount"
                        animationDuration={1000}
                        radius={[10, 10, 0, 0]}
                        isAnimationActive={true}
                    >
                        {chartData?.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.status === 'succeeded' ? '#82ca9d' : '#ff4d4d'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Barchart;
