import React, { useEffect } from 'react';
import { useDeleteUserMutation, useGetAllProfileQuery, useUpdateUserProfileMutation } from '../../../redux/feature/Enpoints/Enpoints';
import { Button, Card, Descriptions, Form, Input, message, Modal, notification } from 'antd';
import Swal from 'sweetalert2';


const UserManagement = () => {

    const { data, refetch } = useGetAllProfileQuery(null);
    const [deleteUser] = useDeleteUserMutation()
    const [updateUserRole, { isSuccess, isError, error }] = useUpdateUserProfileMutation()
    // console.log(updateUserRole)

    const handleUpdateRole = async (userId: string) => {
        console.log(userId)
        try {
            const role = await updateUserRole({ userId, role: 'admin' }).unwrap();
            console.log(role)
        } catch (err) {
            console.error('Error updating user role:', err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('User role updated successfully.');
            refetch();  // Refetch the user data after updating the role
        }
        if (isError) {
            // message.error(`Error updating user role: ${error?.data?.message || error.message}`);
            console.log(isError)
        }
    }, [isSuccess, isError, error, refetch]);


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
                            {one.role === 'admin' ? (
                                <Button className='pb-4 h-12' type="default">Admin</Button>
                            ) : (
                                <Button onClick={() => handleUpdateRole(one._id)} className='pb-4 h-12' type="default">Make Admin</Button>
                            )}
                        </div>
                    </Card>
                </div>)
            }
        </div>
    );
};

export default UserManagement;