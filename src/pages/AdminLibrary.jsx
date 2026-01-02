import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import Sidebar from '../components/Sidebar';
import { Music, Mic, Trash2 } from 'lucide-react';

const AdminLibrary = () => {
    const [activeTab, setActiveTab] = useState('songs');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'songs' ? '/songs/all' : '/podcasts';
            const res = await axiosClient.get(endpoint);

            if (Array.isArray(res.data)) {
                setItems(res.data);
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const type = activeTab === 'songs' ? 'song' : 'podcast';
        if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

        try {
            const endpoint = activeTab === 'songs'
                ? `/songs/delete/${id}`
                : `/admin/podcasts/${id}`;

            await axiosClient.delete(endpoint);

            setItems(items.filter(item => item.id !== id));

        } catch (error) {
            alert(`Failed to delete ${type}`);
            console.error(error);
        }
    };

    return (
        <div className="flex h-screen bg-black text-white font-sans">
            <Sidebar />

            <div className="ml-0 md:ml-[15%] w-full p-4 md:p-8 overflow-y-auto pt-16 md:pt-8">
                <h1 className="text-3xl font-bold mb-8">Library Management</h1>

                <div className="flex gap-6 mb-8 border-b border-[#333]">
                    <button
                        onClick={() => setActiveTab('songs')}
                        className={`pb-4 px-2 font-semibold flex items-center gap-2 transition-colors ${activeTab === 'songs'
                            ? 'text-green-500 border-b-2 border-green-500'
                            : 'text-gray-400 hover:text-white'}`}
                    >
                        <Music size={20} />
                        Songs
                    </button>
                    <button
                        onClick={() => setActiveTab('podcasts')}
                        className={`pb-4 px-2 font-semibold flex items-center gap-2 transition-colors ${activeTab === 'podcasts'
                            ? 'text-green-500 border-b-2 border-green-500'
                            : 'text-gray-400 hover:text-white'}`}
                    >
                        <Mic size={20} />
                        Podcasts
                    </button>
                </div>

                <div className="bg-[#181818] rounded-xl overflow-hidden border border-[#282828]">
                    {loading ? (
                        <div className="p-10 text-center text-gray-500">Loading...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-[#202020] text-gray-400">
                                <tr>
                                    <th className="p-4 pl-6">Title</th>
                                    <th className="p-4">{activeTab === 'songs' ? 'Artist' : 'Publisher'}</th>
                                    <th className="p-4">Date Added</th>
                                    <th className="p-4 text-right pr-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-gray-500">No items found.</td>
                                    </tr>
                                ) : (
                                    items.map(item => (
                                        <tr key={item.id} className="border-b border-[#282828] hover:bg-[#282828] transition-colors">
                                            <td className="p-4 pl-6 flex items-center gap-4">
                                                <img
                                                    src={item.image_url || '/default-cover.png'}
                                                    alt="art"
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                                <span className="font-medium">{item.title}</span>
                                            </td>
                                            <td className="p-4 text-gray-400">
                                                {activeTab === 'songs' ? item.artist : item.publisher}
                                            </td>
                                            <td className="p-4 text-gray-500 text-sm">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right pr-6">
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 hover:bg-red-500/20 rounded-full text-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
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

export default AdminLibrary;
