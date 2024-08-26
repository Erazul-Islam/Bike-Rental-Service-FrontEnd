import React from 'react';
import { useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store';
import { Card, Descriptions } from 'antd';

const AdminProfile = () => {

    const user = useAppSelector((state: RootState) => state.auth.user)

    return (
        <div>
            <Card title="Admin Profile" style={{ maxWidth: 600, margin: '0 auto' }}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{user?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Address">{user?.address}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default AdminProfile;