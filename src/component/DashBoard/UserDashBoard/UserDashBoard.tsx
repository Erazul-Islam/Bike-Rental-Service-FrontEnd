import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { RootState } from '../../../redux/store';

const UserDashBoard = () => {

    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-green-600 text-white p-4">
                    <h1 className="text-2xl">User Dashboard</h1>
                </header>
                <div className='flex'>
                    <nav className="my-4 bg-red-700 w-56 h-screen">
                        <ul className='pl-12 pt-8 text-2xl '>
                            <li><Link to="/user/dashboard/profile" className="text-white hover:underline">Profile</Link></li>
                            <li><Link to="/user/dashboard/my-rental" className="text-white hover:underline">My Rental</Link></li>
                            <li><Link to="/user/dashboard/booking" className="text-white hover:underline">My Booking</Link></li>
                            <li><Link to="/user/dashboard/bike-list" className="text-white hover:underline">All Bike</Link></li>
                            <li><Link to="/" className="text-white hover:underline">Home</Link></li>
                        </ul>
                    </nav>
                    <main className="p-4">
                        <h2 className="text-xl font-bold mb-4">Welcome,  {user?.name}</h2>
                        {/* <p>Here you can view your profile, check your orders, and perform other user-related tasks.</p> */}
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserDashBoard;