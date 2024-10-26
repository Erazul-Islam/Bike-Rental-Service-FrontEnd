import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Button, Card, Descriptions, Form, Input, Modal, notification } from 'antd';
import { useUpdateUserProfileMutation } from '../../../redux/feature/Enpoints/Enpoints';
import { setUser } from '../../../redux/feature/auth/authSlice';

const Profile = () => {

    const user = useSelector((state: RootState) => state.auth.user)
    console.log(user)

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
    const [errorMsg, setErrorMsg] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);

    };

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
            <div className="flex items-center justify-center min-h-screen  p-4 transition-colors duration-300">
                <Card
                    title={<h2 className="text-xl font-semibold text-white">User Profile</h2>}
                    style={{
                        maxWidth: 600,
                        margin: '0 auto',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient from pink to orange
                    }}
                    bodyStyle={{ padding: '1.5rem', borderRadius: '12px' }}
                    className="bg-transparent"
                >
                    <Descriptions bordered column={1} className="text-white">
                        <Descriptions.Item label="Name">{user?.name || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user?.email || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Phone">{user?.phone || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Address">{user?.address || "N/A"}</Descriptions.Item>
                    </Descriptions>
                    <Button
                        className="mt-6 w-full h-12 font-medium rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600 transition duration-200"
                        onClick={() => setIsModalVisible(true)}
                        type="primary"
                    >
                        Update Profile
                    </Button>

                </Card>

                <Modal
                    title={<h3 className="text-2xl text-white">Update Profile</h3>}
                    open={isModalVisible}
                    footer={null}
                    onCancel={() => setIsModalVisible(false)}
                    destroyOnClose
                    className="transition-colors duration-300"
                    style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }} // Same gradient for modal
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="space-y-4"
                    >
                        <Form.Item
                            name="name"
                            label={<span className="">Name</span>}
                        >
                            <Input className="w-full px-4 py-2 rounded-md " />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label={<span className="">Email</span>}
                        >
                            <Input className="w-full px-4 py-2 rounded-md " />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label={<span className="">Phone</span>}
                        >
                            <Input className="w-full px-4 py-2 rounded-md " />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label={<span className="">Address</span>}
                        >
                            <Input.TextArea
                                rows={4}
                                className="w-full px-4 py-2 rounded-md "
                            />
                        </Form.Item>
                        <Form.Item className="flex justify-between space-x-4">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                                className="w-full h-12 font-medium rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600 transition duration-200"
                            >
                                Update Profile
                            </Button>
                            <Button
                                className="w-full h-12 font-medium rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600 transition duration-200"
                                onClick={() => setIsModalVisible(false)}
                            >
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Profile;