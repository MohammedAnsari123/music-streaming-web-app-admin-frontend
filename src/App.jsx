import React from 'react'
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './context/PrivateRoutes'

// Admin Pages
import AdminLogin from './pages/adminLogin'
import AdminDashboard from './pages/adminDashboard'
import UploadTrack from './pages/UploadTrack'
import UploadPodcast from './pages/UploadPodcast'
import UploadEpisode from './pages/UploadEpisode'
import AdminLibrary from './pages/AdminLibrary'
import AdminUsers from './pages/AdminUsers'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path='/' element={<Navigate to="/admin/dashboard" replace />} />

          <Route path='/admin/login' element={<AdminLogin />} />

          <Route element={<PrivateRoutes />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/upload' element={<UploadTrack />} />
            <Route path='/admin/upload-podcast' element={<UploadPodcast />} />
            <Route path='/admin/upload-episode' element={<UploadEpisode />} />
            <Route path='/admin/library' element={<AdminLibrary />} />
            <Route path='/admin/users' element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
