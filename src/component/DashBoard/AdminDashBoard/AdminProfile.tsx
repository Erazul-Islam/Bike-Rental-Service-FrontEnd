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
            <div className="md:min-h-screen  text-white px-4 py-6">
                <div className="">
                    <div className=" bg-black text-white  p-4">
                        <div className="max-w-lg md:w-full bg-gray-900 rounded-sm shadow-lg overflow-hidden">
                            <div className="bg-gray-800 md:p-6  flex items-center space-x-4">
                                <img
                                    src={user?.image}
                                    alt={`${user?.name}'s profile`}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
                                />
                                <div>
                                    <div className="text-2xl font-semibold">{user?.name}</div>
                                    <div className="text-sm text-gray-400">{user?.email}</div>
                                    <div className="text-sm text-gray-400">{user?.phone}</div>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Profile Details</h2>
                                <ul className="space-y-3">
                                    <li>
                                        <span className="font-medium text-gray-300">Address:</span> {user?.address}
                                    </li>
                                    <li>
                                        <span className="font-medium text-gray-300">City:</span> {user?.city}
                                    </li>
                                    <li>
                                        <span className="font-medium text-gray-300">Country:</span> {user?.country}
                                    </li>
                                    <li>
                                        {/* <span className="font-medium text-gray-300">Member Since:</span> {(user.createdAt).toISOString()} */}
                                    </li>
                                    <li>
                                        {/* <span className="font-medium text-gray-300">Last Updated:</span> {(user.updatedAt).toDateString()} */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="text-center ml-4 mt-6">
                        <button
                            className="px-6 py-3 bg-pink-500 text-white font-medium rounded-sm shadow-md  focus:outline-none"
                            onClick={() => setIsModalVisible(true)}
                        >
                            Update Profile
                        </button>
                    </div>

                    <Modal
                        title={<span className="text-white">Update Profile</span>}
                        open={isModalVisible}
                        footer={null}
                        onCancel={() => setIsModalVisible(false)}
                        className="rounded-lg bg-gray-900"
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
                            <Form.Item name="name" label={<span className="text-black">Name</span>}>
                                <Input placeholder="Enter your name" className=" text-black" />
                            </Form.Item>
                            <Form.Item name="email" label={<span className="text-black">Email</span>}>
                                <Input placeholder="Enter your email" className=" text-black" />
                            </Form.Item>
                            <Form.Item name="phone" label={<span className="text-black">Phone</span>}>
                                <Input
                                    placeholder="Enter your phone number"
                                    className=" text-black"
                                />
                            </Form.Item>
                            <Form.Item name="address" label={<span className="text-black">Address</span>}>
                                <Input.TextArea
                                    rows={2}
                                    placeholder="Enter your address"
                                    className=" text-black"
                                />
                            </Form.Item>
                            <Form.Item name="city" label={<span className="text-black">City</span>}>
                                <Input placeholder="Enter your city" className=" text-black" />
                            </Form.Item>
                            <Form.Item name="country" label={<span className="text-black">Country</span>}>
                                <Input placeholder="Enter your country" className=" text-black" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full"
                                    loading={isLoading}
                                >
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