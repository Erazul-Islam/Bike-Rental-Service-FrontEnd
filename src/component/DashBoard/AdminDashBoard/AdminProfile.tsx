import React, { useState } from 'react';
import {  useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store';
import { Button, Card, Descriptions, Form, Input, Modal, notification } from 'antd';
import { useUpdateUserProfileMutation } from '../../../redux/feature/Enpoints/Enpoints';

const AdminProfile = () => {

    const user = useAppSelector((state: RootState) => state.auth.user)
    console.log(user)


    const [form] = Form.useForm();
    const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
    const [errorMsg, setErrorMsg] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    const handleSubmit = async (values) => {
        try {
            await updateUserProfile(values).unwrap();
            // disPatch(setUser(updateUserProfile))
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
            <Card title="Admin Profile" style={{ maxWidth: 600, margin: '0 auto' }}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{user?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Address">{user?.address}</Descriptions.Item>
                </Descriptions>
                <Button className='pb-4 h-12' onClick={() => setIsModalVisible(true)} type="primary">
                    Update
                </Button>
            </Card>
            <Modal
                title="Update Profile"
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                // destroyOnClose={true}
            >
                <Form
                    form={form}
                    layout="vertical"
                    // initialValues={user}s
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
                        <Button className='pb-4 h-12' onClick={handleCancel} >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminProfile;