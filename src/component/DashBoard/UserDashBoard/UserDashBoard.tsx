import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const UserDashBoard = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <header className="bg-green-600 text-white p-4">
                    <h1 className="text-2xl">User Dashboard</h1>
                </header>
                <nav className="my-4">
                    <ul>
                        <li><Link to="/user/dashboard" className="text-green-500 hover:underline">Dashboard</Link></li>
                        <li><Link to="/user/dashboard/profile" className="text-green-500 hover:underline">Profile</Link></li>
                        <li><Link to="/user/orders" className="text-green-500 hover:underline">Orders</Link></li>
                        {/* Add more user links here */}
                    </ul>
                </nav>
                <main className="p-4">
                    <h2 className="text-xl font-bold mb-4">Welcome, User!</h2>
                    <p>Here you can view your profile, check your orders, and perform other user-related tasks.</p>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserDashBoard;