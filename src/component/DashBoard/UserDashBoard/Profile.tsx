import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Button, Form, Input, Modal, notification } from 'antd';
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
         <div className="flex flex-col items-center p-6 space-y-6 bg-black min-h-screen">
            <h2 className="text-3xl font-semibold text-white">My Profile</h2>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg w-full">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <img
                        src={user?.image}
                        alt={`${user?.name}'s profile`}
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-600"
                    />
                    <div className="flex flex-col items-center md:items-start space-y-2">
                        <h3 className="text-2xl font-semibold text-white">{user?.name}</h3>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                        <p className="text-sm text-gray-400">{user?.phone}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-xl font-semibold text-white">Profile Details</h4>
                    <ul className="mt-4 space-y-3 text-gray-400">
                        <li>
                            <span className="font-medium">Address:</span> {user?.address}
                        </li>
                        <li>
                            <span className="font-medium">City:</span> {user?.city}
                        </li>
                        <li>
                            <span className="font-medium">Country:</span> {user?.country}
                        </li>
                    </ul>
                </div>

                <button
                    className="mt-6 w-full py-3 bg-gray-600 text-white rounded-lg font-semibold transition duration-300 hover:bg-gray-700"
                    onClick={() => setIsModalVisible(true)}
                >
                    Update Profile
                </button>
            </div>

            <Modal
                title={<h3 className="text-xl text-center text-white">Update Profile</h3>}
                open={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                destroyOnClose
                className="bg-gray-800"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-6"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        initialValue={user?.name}
                    >
                        <Input className="w-full px-4 py-2 rounded-md text-gray-700" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        initialValue={user?.email}
                    >
                        <Input className="w-full px-4 py-2 rounded-md text-gray-700" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        initialValue={user?.phone}
                    >
                        <Input className="w-full px-4 py-2 rounded-md text-gray-700" />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        initialValue={user?.address}
                    >
                        <Input.TextArea
                            rows={4}
                            className="w-full px-4 py-2 rounded-md text-gray-700"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className="w-full py-3 bg-gray-600 text-white rounded-lg font-semibold transition duration-300 hover:bg-gray-700"
                        >
                            Update Profile
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
        </div>
    );
};

export default Profile;