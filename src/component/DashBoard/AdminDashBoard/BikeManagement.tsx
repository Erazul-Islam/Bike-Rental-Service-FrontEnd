import React, { useEffect, useState } from 'react';
import { useCreateBikesMutation, useDeleteBikeMutation, useGetAllBikesQuery, useUpdateBikeMutation } from '../../../redux/feature/Enpoints/Enpoints';
import { RiMotorbikeFill } from "react-icons/ri";
import { MdOutlinePriceCheck } from "react-icons/md";
import { FaCcDinersClub } from "react-icons/fa";
import { GiCalendarHalfYear } from "react-icons/gi";
import { MdOutlineModelTraining } from "react-icons/md";
import { TbBrandAdobe } from "react-icons/tb";
import { Button } from '@nextui-org/button';
import { Form, Input, Modal } from 'antd';
import Swal from 'sweetalert2';
import { TBike } from '../../../utils/global';


const UpdateForm = ({ _id, refetch, form, initialValues, onCancel }: {
    _id: string,
    refetch: () => void,
    form: any,
    initialValues: any,
    onCancel: () => void
}) => {
    const [updateBike] = useUpdateBikeMutation();

    const onFinish = async (values: any) => {
        try {

            const updatedValues = {
                ...initialValues,
                ...values
            }
            await updateBike({ id: _id, ...updatedValues }).unwrap();
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Product updated successfully',
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update product',
            });
        }
    };

    return (
        <Form form={form} className='' onFinish={onFinish}>
            <div className=''>
                <div>
                    <Form.Item name="name" label="Name" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="cc" label="CC" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="pricePerHour" label="pricePerHour" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="year" label="year">
                        <Input />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item name="brand" label="Brand" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="model" label="Model" >
                        <Input />
                    </Form.Item>
                    <Form.Item name="image" label="Image URL">
                        <Input />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}

const CreateBikeForm = ({ form, onFinish }: {
    form: any,
    onFinish: (values: any) => void
}) => {
    return (
        <Form form={form} className='' onFinish={onFinish}>
            <div className=''>
                <div>
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
                </div>
                <div>
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
                </div>
            </div>
        </Form>
    );
};

const BikeManagement = () => {

    const { data, refetch } = useGetAllBikesQuery(null)
    const [createBikes] = useCreateBikesMutation()
    const [createVisible, setCreateVisible] = useState(false)
    const [createForm] = Form.useForm();
    const [deleteBike] = useDeleteBikeMutation()
    const [visible, setVisible] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({})


    const handleUpdate = (_id: string) => {
        setCurrentProductId(_id);
        setVisible(true);
    };


    const handleCreateCancel = () => {
        setCreateVisible(false);
        createForm.resetFields();
    };

    const handleCancel = () => {
        setVisible(false);
        setCurrentProductId(null);
    };

    useEffect(() => {
        if (visible && currentProductId) {
            const product = data?.data?.find((p: TBike) => p._id === currentProductId);
            setInitialValues(product as TBike);
            form.setFieldsValue(product);
        }
    }, [visible, currentProductId, data?.data, form]);

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

    const handleDelete = (_id: string) => {
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
                    deleteBike(_id)
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
    }


    return (
        <div>
            <Button className="lg:ml-96 lg:mt-14 mb-12" onClick={() => setCreateVisible(true)}>Create Product</Button>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 lg:ml-20'>
                {
                    data?.data?.map(one => (<div key={one._id} className='h-[550px] md:w-96 '>
                        <h1 className='pt-3 pl-4 text-left'>Name: {one.name}</h1>
                        <img className='md:pl-14 pl-8 h-64' src={one.image} alt="" />
                        <div className='flex justify-between pl-8 pr-8 pt-4'>
                            <div>
                                <div className='flex gap-2'>
                                    <h1 className='text-red-600 text-2xl'><RiMotorbikeFill /> </h1>
                                    <h2 className="text-yellow-500 text-xl">{one.name}</h2>
                                </div>
                                <div className='flex mt-4 gap-2'>
                                    <h1 className='text-red-600 text-2xl'><FaCcDinersClub /> </h1>
                                    <h2 className="text-yellow-500 text-xl">{one.cc}</h2>
                                </div>
                                <div className='flex mt-4 gap-2'>
                                    <h1 className='text-red-600 text-2xl'><GiCalendarHalfYear /> </h1>
                                    <h2 className="text-yellow-500 text-xl">{one.year}</h2>
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-2'>
                                    <h1 className='text-red-600 text-2xl'><MdOutlinePriceCheck /> </h1>
                                    <h2 className="text-yellow-500 text-xl">{one.pricePerHour}</h2>
                                </div>
                                <div className='flex mt-4 gap-2'>
                                    <h1 className='text-red-600 text-2xl'><MdOutlineModelTraining /> </h1>
                                    <h2 className="text-yellow-500 text-xl">{one.model}</h2>
                                </div>
                                <div className='flex mt-4 gap-2'>
                                    <h1 className='text-red-600 text-2xl'><TbBrandAdobe /> </h1>
                                    <h2 className="text-yellow-500 text-xl">{one.brand}</h2>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between pr-8'>
                            <Button onClick={() => handleDelete(one._id)} className='bg-orange-500 mt-4 ml-8'>Delete</Button>
                            <Button onClick={() => handleUpdate(one._id)} className='bg-orange-500 mt-4 ml-8'>Update</Button>
                        </div>
                    </div>))
                }
            </div>
            <Modal
                title="Update Product"
                open={visible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button className="rounded-tr-[25px] w-24 rounded-bl-[25px] text-white h-10 mt-4 bg-custom-button" key="submit" onClick={() => form.submit()}>
                        Update
                    </Button>
                ]}
            >
                {currentProductId && (
                    <UpdateForm
                        _id={currentProductId}  // Pass the product ID as a string
                        initialValues={initialValues}
                        form={form}
                        refetch={refetch}
                        onCancel={handleCancel}
                    />
                )}
            </Modal>
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