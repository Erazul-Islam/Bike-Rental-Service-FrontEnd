import React, { useState } from 'react';
import { useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store';
import { Button, Card, Descriptions, Divider, Form, Input, Modal, notification, Typography } from 'antd';
import { useUpdateUserProfileMutation } from '../../../redux/feature/Enpoints/Enpoints';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/feature/auth/authSlice';

const AdminProfile = () => {

    const user = useAppSelector((state: RootState) => state.auth.user)

    const { Title, Text } = Typography

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [updateUserProfile, { isLoading, }] = useUpdateUserProfileMutation();
    const [errorMsg, setErrorMsg] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSubmit = async (values) => {
        try {
            const updatedUser = await updateUserProfile(values).unwrap();
            dispatch(setUser(updatedUser))
            notification.success({
                message: 'Profile Updated',
                description: 'Your profile has been successfully updated.',
            })
        } catch (error) {
            setErrorMsg(error.message);
            notification.error({
                message: 'Update Failed',
                description: errorMsg || 'An error occurred while updating your profile.',
            });
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px', backgroundColor: 'pink', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Profile</Title>
            <Divider />
            <div className='shadow-lg bg-gradient-to-r '>
                <Descriptions bordered column={1} style={{ marginBottom: '20px' }}>
                    <Descriptions.Item label="Name">
                        <Text >{user?.name}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        <Text>{user?.email}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                        <Text>{user?.phone}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                        <Text>{user?.address}</Text>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <button className='pb-3 h-12 bg-red-600 border-none text-white' onClick={() => setIsModalVisible(true)} >
                Update Profile
            </button>
            <Modal
                title="Update Profile"
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ name: user?.name, email: user?.email, phone: user?.phone, address: user?.address }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"

                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button className='pb-4 h-12' type="primary" htmlType="submit" loading={isLoading}>
                            Update Profile
                        </Button>
                        
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminProfile;