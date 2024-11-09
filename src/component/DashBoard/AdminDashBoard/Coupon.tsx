
import React, { useState } from 'react';
import { Table, Input, Form, Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCreateCouponMutation, useDeleteCouponMutation, useGetAllCouponQuery, useUpdateCoupomnMutation } from '../../../redux/feature/Enpoints/Enpoints';
import Swal from 'sweetalert2';

const Coupon = () => {


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { data: allCoupon, refetch } = useGetAllCouponQuery(null)
    const [deleteCoupon] = useDeleteCouponMutation()
    const [createCoupon] = useCreateCouponMutation()




    const handleAddCoupon = async (values: any) => {
        try {
            createCoupon(values).unwrap()
            message.success('Coupon added successfully!');
            form.resetFields();
            setIsModalVisible(false);
            refetch()
        } catch (error) {
            message.error('Failed to add coupon.');
        }
    };


    const handleDeleteCoupon = async (id: string) => {
        console.log()
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteCoupon(id)
                    Swal.fire({
                        title: "Deleted!",
                        text: "You successfully delete the product",
                        icon: "success"
                    });
                    refetch()
                } catch (err) {
                    console.log(err)
                }
            }
        });
    };
    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <button  className='h-12 text-white bg-purple-700 rounded-sm border-none'
                    onClick={() => handleDeleteCoupon(record._id)}
                >
                    Delete
                </button>
            ),
        },
    ];

    return (
        <div>
            <div className=''>
                <button className='h-12 text-white bg-red-700' onClick={() => setIsModalVisible(true)}>
                    Add Coupon
                </button>
                <Table
                    columns={columns}
                    dataSource={allCoupon?.data}
                    style={{ backgroundColor: '' }}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                    className='shadow-md'
                />

                <Modal
                    title="Add Coupon"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleAddCoupon}>
                        <Form.Item
                            name="code"
                            label="Coupon Code"
                            rules={[{ required: true, message: 'Please enter the coupon code' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="discount"
                            label="Discount"
                            rules={[{ required: true, message: 'Please enter the discount amount' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Coupon;