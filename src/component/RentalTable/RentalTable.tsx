import React, { useState, useEffect } from 'react';
import { Table,  message, DatePicker } from 'antd';
import { Button } from '@nextui-org/button';
import moment from 'moment';
import './Rentaltable.css'

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

   const handleDateChange = (date, dateString, id) => {
        setEndTimes({ ...endTimes, [id]: dateString });
    };
    const columns = [
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: 'End Time',
            key: 'endTime',
            render: (text, record) => (
                <DatePicker 
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={endTimes[record._id] ? moment(endTimes[record._id]) : moment()}
                    onChange={(date, dateString) => handleDateChange(date, dateString, record._id)}
                    className="responsive-input"
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button
                    color='success'
                    className='h-12'
                    onClick={() => {
                        if (endTimes[record._id]) {
                            onCalculate(record._id, endTimes[record._id]);
                        }else{
                            message.warning('Please put end time')
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
            pagination={{ pageSize: 4 }}
            scroll={{ x: true }}
        />
    );
};

export default RentalTable;
