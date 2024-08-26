import React, { useState } from 'react';
import { useCreateBikesMutation, useGetAllBikesQuery } from '../../../redux/feature/Enpoints/Enpoints';
import { RiMotorbikeFill } from "react-icons/ri";
import { MdOutlinePriceCheck } from "react-icons/md";
import { FaCcDinersClub } from "react-icons/fa";
import { GiCalendarHalfYear } from "react-icons/gi";
import { MdOutlineModelTraining } from "react-icons/md";
import { TbBrandAdobe } from "react-icons/tb";
import { Button } from '@nextui-org/button';
import { Form, Input, Modal } from 'antd';
import Swal from 'sweetalert2';

const CreateBikeForm = ({ form, onFinish }: {
    form: any,
    onFinish: (values: any) => void
}) => {
    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="cc" label="CC" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="pricePerHour" label="pricePerHour" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="year" label="year" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="model" label="Model" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    );
};

const BikeManagement = () => {

    const { data, error, isLoading, refetch } = useGetAllBikesQuery(null)
    const [createBikes] = useCreateBikesMutation()
    const [createVisible, setCreateVisible] = useState(false)
    const [createForm] = Form.useForm();



    const handleCreateCancel = () => {
        setCreateVisible(false);
        createForm.resetFields();
    };

    const handleCreateFinish = async (values: any) => {
        try {
            await createBikes(values).unwrap();
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Created!',
                text: 'Product created successfully',
            });
            handleCreateCancel();
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to create product',
            });
        }
    };



    return (
        <div>
            <Button className="lg:ml-96 lg:mt-14 mb-12" onClick={() => setCreateVisible(true)}>Create Product</Button>
            <div className='w- h-[550px] bg-black'>
                <div>
                    <h1 className='pt-3 pl-4 text-left'>Name:</h1>
                    <img className='pl-12 w-64 h-64' src="https://i.ibb.co/M7RMNpM/privew-images-158955436873178.png" alt="" />
                    <div className='flex justify-between pl-8 pr-8 pt-4'>
                        <div>
                            <div className='flex gap-2'>
                                <h1 className='text-red-600 text-2xl'><RiMotorbikeFill /> </h1>
                                <h2 className="text-white">Name</h2>
                            </div>
                            <div className='flex mt-4 gap-2'>
                                <h1 className='text-red-600 text-2xl'><FaCcDinersClub /> </h1>
                                <h2 className="text-white">CC</h2>
                            </div>
                            <div className='flex mt-4 gap-2'>
                                <h1 className='text-red-600 text-2xl'><GiCalendarHalfYear /> </h1>
                                <h2 className="text-white">Year</h2>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-2'>
                                <h1 className='text-red-600 text-2xl'><MdOutlinePriceCheck /> </h1>
                                <h2 className="text-white">Price</h2>
                            </div>
                            <div className='flex mt-4 gap-2'>
                                <h1 className='text-red-600 text-2xl'><MdOutlineModelTraining /> </h1>
                                <h2 className="text-white">Model</h2>
                            </div>
                            <div className='flex mt-4 gap-2'>
                                <h1 className='text-red-600 text-2xl'><TbBrandAdobe /> </h1>
                                <h2 className="text-white">Brand</h2>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between pr-8'>
                        <Button className='bg-orange-500 mt-4 ml-8'>Delete</Button>
                        <Button className='bg-orange-500 mt-4 ml-8'>Update</Button>
                    </div>
                </div>
            </div>
            <Modal
                title="Create Bike"
                open={createVisible}
                onCancel={handleCreateCancel}
                footer={[
                    <Button key="back" onClick={handleCreateCancel}>
                        Cancel
                    </Button>,
                    <Button className="rounded-tr-[25px] w-24 rounded-bl-[25px] text-white h-10 mt-4 " key="submit" onClick={() => createForm.submit()}>
                        Create
                    </Button>
                ]}
            >
                <CreateBikeForm form={createForm} onFinish={handleCreateFinish} />
            </Modal>
        </div>
    );
};

export default BikeManagement;