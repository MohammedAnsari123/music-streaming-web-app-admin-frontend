import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldAlert, CheckCircle } from 'lucide-react'
import Particles from '../components/Particles'

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        secretKey: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/admin/register', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration Successful! Please Login.");
                navigate('/admin/login');
            } else {
                alert(data.error || 'Registration Failed');
            }
        } catch (error) {
            console.error("Register Error:", error);
            alert("Connection Failed");
        }
        setLoading(false);
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

            <div className="relative z-10 w-full max-w-lg p-6">
                <form onSubmit={handleSubmit} className="bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-500">

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 mb-4">
                            <ShieldAlert className="w-6 h-6 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Create Admin Account</h1>
                        <p className="text-gray-400 text-sm mt-2">Enter your invitation credential to proceed.</p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
                            <input name="full_name" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg h-12 px-4 focus:border-green-500 focus:outline-none transition-colors" placeholder="John Doe" required />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                            <input name="email" type="email" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg h-12 px-4 focus:border-green-500 focus:outline-none transition-colors" placeholder="admin@company.com" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                                <input name="password" type="password" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg h-12 px-4 focus:border-green-500 focus:outline-none transition-colors" placeholder="••••••••" required />
                            </div>
                            <div>
                                <label className="block text-green-400 text-xs font-bold uppercase tracking-wider mb-2">Secret Key</label>
                                <input name="secretKey" type="password" onChange={handleChange} className="w-full bg-green-500/10 border border-green-500/30 rounded-lg h-12 px-4 text-green-400 placeholder-green-700/50 focus:border-green-400 focus:outline-none transition-colors" placeholder="Invite Code" required />
                            </div>
                        </div>
                    </div>

                    <button disabled={loading} className="w-full mt-8 h-12 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-green-900/20">
                        {loading ? 'Verifying...' : 'Register Access'}
                    </button>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have access? <Link to="/admin/login" className="text-white hover:underline">Log in here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminRegister
