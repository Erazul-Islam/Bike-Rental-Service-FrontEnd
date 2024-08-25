import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashBoard = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <header className="bg-blue-600 text-white p-4">
                    <h1 className="text-2xl">Admin Dashboard</h1>
                </header>
                <nav className="my-4">
                    <ul>
                        <li><Link to="/admin/dashboard/admin-profile" className="text-blue-500 hover:underline">Profile</Link></li>
                        <li><Link to="/admin/dashboard/user-management" className="text-blue-500 hover:underline">Manage Users</Link></li>
                        <li><Link to="/admin/dashboard/coupon-management" className="text-blue-500 hover:underline">Coupon Management</Link></li>
                        <li><Link to="/admin/dashboard/bike-management" className="text-blue-500 hover:underline">Bike Management</Link></li>
                        <li><Link to="/" className="text-blue-500 hover:underline">Home</Link></li>
                    </ul>
                </nav>
                <main className="p-4">
                    <h2 className="text-xl font-bold mb-4">Welcome, Admin!</h2>
                    <p>Here you can manage users, view reports, and perform other administrative tasks.</p>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashBoard;