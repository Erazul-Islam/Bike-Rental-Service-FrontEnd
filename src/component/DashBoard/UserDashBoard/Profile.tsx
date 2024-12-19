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
            <div className="flex   p-4 transition-colors duration-300">
                <div className="">
                    <h2 className="text-2xl ml-4 font-semibold text-white mb-4">My Profile</h2>
                    <div className=" bg-black text-white flex items-center justify-center p-4">
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
                    <button
                        className="mt-2 w-[200px] h-12 ml-4 font-medium rounded-sm bg-red-600 border-none bg-gradient-to-r  text-white "
                        onClick={() => setIsModalVisible(true)}
                    >
                        Update Profile
                    </button>
                </div>

                <Modal
                    title={<h3 className="text-2xl text-white">Update Profile</h3>}
                    open={isModalVisible}
                    footer={null}
                    onCancel={() => setIsModalVisible(false)}
                    destroyOnClose
                    className="transition-colors duration-300"
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
                        {/* <Form.Item
                            name="image"
                            label={<span className="">Image</span>}
                        >
                            <Input type='file' className="w-full px-4 py-2 rounded-md " />
                        </Form.Item> */}
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
                                className="w-full  h-12 font-medium rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600 transition duration-200"
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