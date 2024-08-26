import React, { useEffect, useState } from 'react';
import { useDeleteUserMutation, useGetAllProfileQuery } from '../../../redux/feature/Enpoints/Enpoints';
import axios from 'axios';
import { Button, Card, Descriptions } from 'antd';
import Swal from 'sweetalert2';


const UserManagement = () => {

    const { data, refetch } = useGetAllProfileQuery(null);
    console.log(data)

    const [deleteUser] = useDeleteUserMutation()

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
                    Swal.fire({
                        title: "Deleted!",
                        text: "You successfully delete the user",
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:ml-28'>
            {
                data?.data?.map(one => <div >
                    <Card key={one._id} title="User Profile" style={{ maxWidth: 600, margin: '0 auto' }}>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Name">{one?.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{one?.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{one?.phone}</Descriptions.Item>
                            <Descriptions.Item label="Address">{one?.address}</Descriptions.Item>
                        </Descriptions>
                        <div className='flex justify-between'>
                            <Button className='pb-4 h-12' onClick={() => handleDelete(one._id)}>Delete</Button>
                            <Button className='pb-4 h-12' >{one.role}</Button>
                        </div>
                    </Card>
                </div>)
            }
        </div>
    );
};

export default UserManagement;