import React, { useState, useEffect } from 'react';
import { Table, message, DatePicker } from 'antd';
import { Button } from '@nextui-org/button';
import moment from 'moment';
import './Rentaltable.css'

const RentalTable = ({ rentals, onCalculate }) => {
    const [endTimes, setEndTimes] = useState({});

    useEffect(() => {
        // Automatically set current time as end time for each rental
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const initialEndTimes = rentals.reduce((acc, rental) => {
            acc[rental._id] = now;
            return acc;
        }, {});
        setEndTimes(initialEndTimes);
    }, [rentals]);

    const columns = [
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'End Time',
            key: 'endTime',
            render: (text, record) => (
                <span>{endTimes[record._id]}</span> // Display end time directly without DatePicker
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <button
                    color="success"
                    className="h-12"
                    onClick={() => {
                        if (endTimes[record._id]) {
                            onCalculate(record._id, endTimes[record._id]);
                        } else {
                            message.warning('End time is not set');
                        }
                    }}
                >
                    Calculate
                </button>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={rentals}
            rowKey="_id"
            pagination={{ pageSize: 4 }}
            scroll={{ x: true }}
        />
    );
};

export default RentalTable;
