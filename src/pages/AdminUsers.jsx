import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import Sidebar from '../components/Sidebar';
import { Users, Mail, Calendar } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axiosClient.get('/admin/users');
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            // No need to alert user explicitly for auth errors, standard error logging
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-black text-white font-sans">
            <Sidebar />

            <div className="ml-0 md:ml-[15%] w-full p-4 md:p-8 overflow-y-auto pt-16 md:pt-8">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Users className="text-green-500" />
                    User Management
                </h1>

                <div className="bg-[#181818] rounded-xl overflow-hidden border border-[#282828]">
                    {loading ? (
                        <div className="p-10 text-center text-gray-500">Loading users...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-[#202020] text-gray-400">
                                <tr>
                                    <th className="p-4 pl-6">User</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Joined</th>
                                    <th className="p-4">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-gray-500">No users found.</td>
                                    </tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user.id} className="border-b border-[#282828] hover:bg-[#202020] transition-colors">
                                            <td className="p-4 pl-6 font-medium">
                                                {/* Fallback for Name if not present in metadata */}
                                                {(user.raw_user_meta_data?.full_name || user.raw_user_meta_data?.name) || 'User'}
                                            </td>
                                            <td className="p-4 text-gray-400 flex items-center gap-2">
                                                <Mail size={14} />
                                                {user.email}
                                            </td>
                                            <td className="p-4 text-gray-500 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-blue-900/40 text-blue-300 px-2 py-1 rounded text-xs font-semibold border border-blue-800">
                                                    USER
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
