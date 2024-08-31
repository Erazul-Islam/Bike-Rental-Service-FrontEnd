import React from 'react';
import { useDeleteUserMutation, useGetAllProfileQuery, useUpdateUserProfileMutation } from '../../../redux/feature/Enpoints/Enpoints';
import { Button, Card, Descriptions, Form, Input, message, Modal, notification } from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios';


const UserManagement = () => {

    const { data, refetch } = useGetAllProfileQuery(null);
    const [deleteUser] = useDeleteUserMutation()

    const handleAdmin = user => {
        axios.patch(`http://localhost:5000/api/users/${user._id}`)
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
                    <Card className='' key={one._id} title="User Profile" style={{ maxWidth: 600, margin: '0 auto', backgroundColor: 'Highlight' }}>
                        <Descriptions className='card-description' bordered column={1}>
                            <Descriptions.Item className='card-description' label="Name">{one?.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{one?.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{one?.phone}</Descriptions.Item>
                            <Descriptions.Item label="Address">{one?.address}</Descriptions.Item>
                        </Descriptions>
                        <div className='flex justify-between'>
                            <Button className='pb-4 h-12' onClick={() => handleDelete(one._id)}>Delete</Button>
                            {one.role === 'admin' ? <Button className="bg-green-400 h-12" type="default">Admin</Button> : <Button onClick={() => handleAdmin(one)} className="bg-green-400 h-12" type="default">Make Admin</Button>}
                        </div>
                    </Card>
                </div>)
            }
        </div>
    );
};

export default UserManagement;