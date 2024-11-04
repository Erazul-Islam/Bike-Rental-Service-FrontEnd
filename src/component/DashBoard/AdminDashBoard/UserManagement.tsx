import React from 'react';
import { useDeleteUserMutation, useGetAllProfileQuery, } from '../../../redux/feature/Enpoints/Enpoints';
import { Table, Tag, Tooltip, } from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios';
import "../../../utils/table.css"


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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (name) => <span style={{ fontWeight: 'bold', color: '' }}>{name}</span>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (email) => (
                <a href={`mailto:${email}`} style={{ color: '' }}>
                    {email}
                </a>
            )
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            responsive: ['sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            responsive: ['md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (address) => (
                <Tooltip title={address}>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px', display: 'inline-block' }}>
                        {address}
                    </span>
                </Tooltip>)
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (role) => (
                <Tag color={role === 'admin' ? 'green' : 'blue'}>
                    {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (_, record) => (
                <div className="flex gap-2">
                    <button
                        className=' bg-red-700 text-white border-none'
                        onClick={() => handleDelete(record._id)}
                    >
                        Delete
                    </button>
                    {record.role === 'admin' ? (
                        <button className=' bg-purple-800 text-white border-none' disabled>
                            Admin
                        </button>
                    ) : (
                        <button
                            className='bg-pink-600 text-white border-none'
                            onClick={() => handleAdmin(record)}
                        >
                            Make Admin
                        </button>
                    )}
                </div>
            ),
        },
    ];


    return (
        <div className="lg:ml-14">
            <Table
                columns={columns}
                style={{ backgroundColor: '#f0f2f5', color:'black' }}
                dataSource={data?.data}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
                 className="custom-table"
                scroll={{ x: true }}
            />
        </div>
    );
};

export default UserManagement;

