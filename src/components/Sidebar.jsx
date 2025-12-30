import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, Upload, Library, Users, LogOut, Music, Menu, X } from 'lucide-react'

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login')
    }

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-black/50 p-2 rounded-full text-white backdrop-blur-sm border border-white/10"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 z-30 bg-black/80 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`
                bg-black h-[100vh] p-6 fixed top-0 left-0 text-gray-300 border-r border-[#282828] flex flex-col justify-between z-40 transition-transform duration-300
                w-72 md:w-[15%]
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div>
                    <div className="flex items-center gap-2 mb-8 px-2 text-white">
                        <span className="text-2xl font-bold text-green-500">StreamLite</span>
                        <span className="text-xs border border-white px-1 rounded">ADMIN</span>
                    </div>

                    <nav>
                        <ul className='space-y-4'>
                            <li>
                                <Link to="/admin/dashboard" className='flex items-center gap-3 px-2 hover:text-white transition-colors cursor-pointer'>
                                    <LayoutDashboard size={24} />
                                    <span className="font-semibold">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/upload" className='flex items-center gap-3 px-2 hover:text-white transition-colors cursor-pointer'>
                                    <Music size={24} />
                                    <span className="font-semibold">Upload Tracks</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/upload-podcast" className='flex items-center gap-3 px-2 hover:text-white transition-colors cursor-pointer'>
                                    <div className="relative">
                                        <Upload size={24} />
                                        <span className="absolute -bottom-1 -right-1 text-[10px] bg-purple-500 px-1 rounded">POD</span>
                                    </div>
                                    <span className="font-semibold">Create Podcast</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/upload-episode" className='flex items-center gap-3 px-2 hover:text-white transition-colors cursor-pointer ml-3 border-l border-gray-700 pl-3'>
                                    <span className="font-medium text-sm text-gray-400 hover:text-white">Add Episode</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/library" className='flex items-center gap-3 px-2 hover:text-white transition-colors cursor-pointer'>
                                    <Library size={24} />
                                    <span className="font-semibold">Library</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/users" className='flex items-center gap-3 px-2 hover:text-white transition-colors cursor-pointer'>
                                    <Users size={24} />
                                    <span className="font-semibold">Users</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                        <LogOut size={24} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar
