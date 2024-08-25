import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store';



const AdminDashBoard = () => {

    const user = useAppSelector((state: RootState) => state.auth.user)


    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <header className="bg-blue-600 text-white p-4">
                    <h1 className="text-2xl">Admin Dashboard</h1>
                </header>
                <div className='flex'>
                    <nav className="my-4 h-screen w-64 pl-12 pt-12 bg-red-600">
                        <ul className='text-xl'>
                            <li><Link to="/admin/dashboard/admin-profile" className="text-white hover:underline">Profile</Link></li>
                            <li><Link to="/admin/dashboard/user-management" className="text-white hover:underline">Manage Users</Link></li>
                            <li><Link to="/admin/dashboard/coupon-management" className="text-white hover:underline">Coupon Management</Link></li>
                            <li><Link to="/admin/dashboard/bike-management" className="text-white hover:underline">Bike Management</Link></li>
                            <li><Link to="/" className="text-white hover:underline">Home</Link></li>
                        </ul>
                    </nav>
                    <main className="p-4">
                        <h2 className="text-xl font-bold mb-4">Welcome, Admin! {user?.name}</h2>
                        {/* <p>Here you can manage users, view reports, and perform other administrative tasks.</p> */}
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;