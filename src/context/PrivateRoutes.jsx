import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

const PrivateRoutes = () => {
    const { user, loading } = useAuth();
    const token = localStorage.getItem('token');

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>
        )
    }
    return (
        token ? <Outlet /> : <Navigate to="/admin/login" />
    )
}

export default PrivateRoutes
