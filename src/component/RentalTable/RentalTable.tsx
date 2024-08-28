import React, { useState, useEffect } from 'react';
import { Table, Input, Button, message } from 'antd';

const RentalTable = ({ rentals, onCalculate }) => {
    const [endTimes, setEndTimes] = useState({});

    useEffect(() => {
        // Initialize endTimes with current time for rentals that don't have an end time
        const now = new Date().toISOString();
        const initialEndTimes = rentals.reduce((acc, rental) => {
            if (!rental.returnTime) {
                acc[rental._id] = now;
            }
            return acc;
        }, {});
        setEndTimes(initialEndTimes);
    }, [rentals]);

    const handleInputChange = (value, id) => {
        setEndTimes({ ...endTimes, [id]: value });
    };

    const columns = [
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'End Time',
            key: 'endTime',
            render: (text, record) => (
                <Input
                    placeholder="Enter End Time"
                    value={endTimes[record._id] || new Date().toISOString()}
                    onChange={(e) => handleInputChange(e.target.value, record._id)}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        if (endTimes[record._id]) {
                            onCalculate(record._id, endTimes[record._id]);
                        } else {
                            message.warning('Please enter the end time');
                        }
                    }}
                >
                    Calculate
                </Button>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={rentals}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
        />
    );
};

export default RentalTable;
