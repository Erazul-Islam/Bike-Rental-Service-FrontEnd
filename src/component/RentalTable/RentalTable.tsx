import React, { useState, useEffect } from 'react';
import { Table, message, DatePicker, notification } from 'antd';
import { Button } from '@nextui-org/button';
import moment from 'moment';
import './Rentaltable.css'

const RentalTable = ({ rentals, onCalculate }) => {
    const [endTimes, setEndTimes] = useState({});

    useEffect(() => {

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
            title: 'Bike Name',
            dataIndex: 'bikeName',
            key: 'bikeName',
            render: (bikeName) => <span style={{  color: '' }}>{bikeName}</span>
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            render: (userName) => <span style={{  color: '' }}>{userName}</span>
        },
        {
            title: 'End Time',
            key: 'endTime',
            render: (text, record) => (
                <span>{endTimes[record._id]}</span> 
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
                        if(record.isReturned === true){
                            notification.warning({
                                message : "Calculated"
                            })
                        }
                        else if (endTimes[record._id]) {
                            onCalculate(record._id, endTimes[record._id]);
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
