import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Particles from '../components/Particles'

const adminLogin = () => {
    const [adminEmail, setAdminEmail] = useState('')
    const [adminPassword, setAdminPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/admin/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: adminEmail,
                    password: adminPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user, data.token)
                navigate('/admin/dashboard')
            } else {
                alert(data.error || 'Admin Login Failed')
            }
        } catch (error) {
            console.error("Login request failed:", error)
            alert('Connection Error. Please try again.')
        }
    }

    return (
        <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Particles
                    particleColors={['#22c55e', '#ffffff']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                    className="h-full w-full"
                />
            </div>

            <div className="relative z-10 w-full max-w-md p-8">
                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="text-center mb-10">
                        <span className="text-xs font-bold tracking-widest text-green-500 uppercase border border-green-500/30 px-3 py-1 rounded-full bg-green-500/10">Admin Access</span>
                        <h1 className='text-4xl font-bold mt-4 text-white'>
                            Control Center
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2 pl-2">Email</label>
                            <input
                                className='w-full h-12 px-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all'
                                onChange={(e) => setAdminEmail(e.target.value)}
                                type="text"
                                placeholder='admin@streamlite.com'
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2 pl-2">Password</label>
                            <div className="relative">
                                <input
                                    className='w-full h-12 px-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all pr-12'
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    placeholder='••••••••'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className='w-full mt-8 h-12 bg-white text-black hover:bg-gray-200 font-bold rounded-xl transition-all hover:scale-[1.02] shadow-lg'>
                        Authenticate
                    </button>

                    <div className="mt-4 text-center">
                        <Link to="/admin/register" className="text-sm text-gray-400 hover:text-green-500 transition-colors">
                            Need an account? Register here
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-600">Restricted Area. Authorized Personnel Only.</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default adminLogin
