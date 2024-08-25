import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const Profile = () => {

    const user = useSelector((state: RootState) => state.auth.user)
    console.log(user)

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

export default Profile;