import React from 'react';
import { useDeleteUserMutation, useGetAllProfileQuery, } from '../../../redux/feature/Enpoints/Enpoints';
import { Button, Card, Descriptions, } from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios';


const UserManagement = () => {

    const { data, refetch } = useGetAllProfileQuery(null);
    const [deleteUser] = useDeleteUserMutation()

    const handleAdmin = user => {
        axios.patch(`https://rental-bike-service.vercel.app/api/users/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.success === true) {
                    refetch()
                    Swal.fire({
                        title: "Good job!",
                        text: `You made ${res.data.data.name} as admin!`,
                        icon: "success"
                    });
                }
            })
    }

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
                    deleteUser(_id)
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "You successfully delete the user",
                        icon: "success"
                    });
                } catch (err) {
                    console.log(err)
                }
            }
        });
    }



    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:ml-28'>
            {data?.data?.map((one) => (
                <div key={one._id}>
                    <Card
                        title="User Profile"
                        style={{ maxWidth: 600, margin: '0 auto' }}
                        className="shadow-md bg-highlight"
                    >
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Name">{one?.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{one?.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{one?.phone}</Descriptions.Item>
                            <Descriptions.Item label="Address">{one?.address}</Descriptions.Item>
                        </Descriptions>
                        <div className='flex justify-between mt-4'>
                            <button
                                className='bg-red-500 border-none text-white hover:bg-red-600 h-12'
                                onClick={() => handleDelete(one._id)}
                            >
                                Delete
                            </button>
                            {one.role === 'admin' ? (
                                <button className="bg-green-400 border-none text-white h-12 cursor-default" disabled>
                                    Admin
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleAdmin(one)}
                                    className="bg-green-500 border-none text-white hover:bg-green-600 h-12"
                                >
                                    Make Admin
                                </button>
                            )}
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default UserManagement;