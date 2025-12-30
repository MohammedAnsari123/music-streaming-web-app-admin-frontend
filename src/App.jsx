import React, { Suspense } from 'react'
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './context/PrivateRoutes'

import ErrorBoundary from './components/ErrorBoundary'

// Admin Pages (Lazy Loaded)
const AdminLanding = React.lazy(() => import('./pages/AdminLanding'));
const AdminRegister = React.lazy(() => import('./pages/AdminRegister'));
const AdminLogin = React.lazy(() => import('./pages/adminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/adminDashboard'));
const UploadTrack = React.lazy(() => import('./pages/UploadTrack'));
const UploadPodcast = React.lazy(() => import('./pages/UploadPodcast'));
const UploadEpisode = React.lazy(() => import('./pages/UploadEpisode'));
const AdminLibrary = React.lazy(() => import('./pages/AdminLibrary'));
const AdminUsers = React.lazy(() => import('./pages/AdminUsers'));

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-black text-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="min-h-screen bg-black text-white">
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<AdminLanding />} />
              <Route path='/admin/register' element={<AdminRegister />} />
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
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  )
}

export default App
