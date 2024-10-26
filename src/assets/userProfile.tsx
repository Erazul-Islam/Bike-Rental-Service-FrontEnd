import React from 'react';

const UserProfile = () => {
    const user = {
        profilePicture: 'https://via.placeholder.com/150', // Placeholder image URL
        username: 'john_doe',
        fullName: 'John Doe',
        email: 'john@example.com',
        location: 'New York, USA',
        bio: 'Passionate about pet care and technology.',
        socialLinks: {
            twitter: 'https://twitter.com/john_doe',
            linkedin: 'https://linkedin.com/in/johndoe',
            instagram: 'https://instagram.com/john_doe',
        },
        activity: [
            { id: 1, action: 'Liked a post', date: '2024-10-01' },
            { id: 2, action: 'Commented on a post', date: '2024-10-03' },
            { id: 3, action: 'Followed Jane Smith', date: '2024-10-05' },
        ],
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6 text-center">
                    <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200 mb-4"
                    />
                    <h2 className="text-2xl font-semibold">{user.fullName}</h2>
                    <p className="text-gray-600">@{user.username}</p>
                </div>
                <nav className="mt-4">
                    <ul className="space-y-2">
                        <li className="hover:bg-gray-200 p-3 rounded">
                            <a href="#info" className="block text-gray-700">Profile Info</a>
                        </li>
                        <li className="hover:bg-gray-200 p-3 rounded">
                            <a href="#activity" className="block text-gray-700">Activity Feed</a>
                        </li>
                        <li className="hover:bg-gray-200 p-3 rounded">
                            <a href="#social" className="block text-gray-700">Social Links</a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6">User Profile</h1>

                {/* Profile Info Section */}
                <div id="info" className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                    <p className="text-gray-700"><strong>Location:</strong> {user.location}</p>
                    <p className="text-gray-700"><strong>Bio:</strong> {user.bio}</p>
                </div>

                {/* Activity Feed Section */}
                <div id="activity" className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
                    <ul className="list-disc list-inside">
                        {user.activity.map((item) => (
                            <li key={item.id} className="text-gray-600">
                                {item.action} - <span className="text-gray-400">{item.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Links Section */}
                <div id="social" className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                    <div className="flex space-x-4">
                        {user.socialLinks.twitter && (
                            <a
                                href={user.socialLinks.twitter}
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Twitter
                            </a>
                        )}
                        {user.socialLinks.linkedin && (
                            <a
                                href={user.socialLinks.linkedin}
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        )}
                        {user.socialLinks.instagram && (
                            <a
                                href={user.socialLinks.instagram}
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram
                            </a>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
export default UserProfile;
