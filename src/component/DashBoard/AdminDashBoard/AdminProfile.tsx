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
        <div>
     <div className="min-h-screen bg-black p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center bg-gray-800 p-6">
                        <img
                            src={user?.image || 'https://via.placeholder.com/150'}
                            alt={`${user?.name || 'User'}'s profile`}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-700"
                        />
                        <div className="text-center md:text-left md:ml-6 mt-4 md:mt-0">
                            <Title level={4} className="text-white">
                                {user?.name || 'User Name'}
                            </Title>
                            <Text className="text-gray-400">{user?.email}</Text>
                            <br />
                            <Text className="text-gray-400">{user?.phone || 'No phone available'}</Text>
                        </div>
                    </div>

                    <div className="p-6">
                        <Title level={5} style={{color:"white"}} className="mb-4 border-b border-gray-300 pb-2 text-white">
                            Profile Details
                        </Title>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Text strong className="text-gray-400">Address:</Text> <Text className="text-white">{user?.address || 'Not provided'}</Text>
                            </div>
                            <div>
                                <Text strong className="text-gray-400">City:</Text> <Text className="text-white">{user?.city || 'Not provided'}</Text>
                            </div>
                            <div>
                                <Text strong className="text-gray-400">Country:</Text> <Text className="text-white">{user?.country || 'Not provided'}</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <Button type="primary" className='h-12 bg-blue-600' onClick={() => setIsModalVisible(true)}>
                        Update Profile
                    </Button>
                </div>

                <Modal
                    title="Update Profile"
                    open={isModalVisible}
                    footer={null}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            name: user?.name,
                            email: user?.email,
                            phone: user?.phone,
                            address: user?.address,
                            city: user?.city,
                            country: user?.country,
                        }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please enter your email' }]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true, message: 'Please enter your phone number' }]}
                        >
                            <Input placeholder="Enter your phone number" />
                        </Form.Item>

                        <Form.Item name="address" label="Address">
                            <Input.TextArea rows={2} placeholder="Enter your address" />
                        </Form.Item>

                        <Form.Item name="city" label="City">
                            <Input placeholder="Enter your city" />
                        </Form.Item>

                        <Form.Item name="country" label="Country">
                            <Input placeholder="Enter your country" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={isLoading} block>
                                Update Profile
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
        </div>
    );
};

export default AdminProfile;