import React from 'react';
import { useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store';

const AdminProfile = () => {

    const user = useAppSelector((state: RootState) => state.auth.user)

    return (
        <div>
            <div>
                <h1 className='text-xl font-bold text-black'>Name: {user?.name}</h1>
                <h1 className='text-xl font-bold text-black'>Email: {user?.email}</h1>
                <h1 className='text-xl font-bold text-black'>Address: {user?.address}</h1>
                <h1 className='text-xl font-bold text-black'>Phone: {user?.phone}</h1>
            </div>
        </div>
    );
};

export default AdminProfile;