import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Server, Users, BarChart3, Lock } from 'lucide-react'
import Particles from '../components/Particles'

const AdminLanding = () => {
    return (
        <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
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

            {/* Navbar Placeholder */}
            <nav className="relative z-10 flex justify-between items-center px-8 py-6 backdrop-blur-sm border-b border-white/5">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="text-green-500 w-8 h-8" />
                    <span className="text-xl font-bold tracking-widest">StreamLite <span className="text-xs border border-green-500 text-green-500 px-1.5 py-0.5 rounded ml-1">ADMIN</span></span>
                </div>
                <div className="flex gap-4">
                    <Link to="/admin/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                    <Link to="/admin/register" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all border border-white/10">Request Access</Link>
                </div>
            </nav>

            <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4">

                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
                        <Lock size={14} /> Secure Gateway
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                        Platform <br />
                        <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                            Control Center
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Manage your music catalog, analyze user engagement, and oversee deployment status from a single, centralized dashboard.
                    </p>

                    <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/admin/login" className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all hover:scale-105">
                            Access Dashboard
                        </Link>
                        <Link to="/admin/register" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all hover:scale-105 backdrop-blur-md">
                            Register New Admin
                        </Link>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full px-4">
                    {[
                        { icon: Server, title: "Content Management", desc: "Upload and manage high-fidelity audio assets." },
                        { icon: Users, title: "User Oversight", desc: "Monitor active sessions and user growth." },
                        { icon: BarChart3, title: "Real-time Analytics", desc: "Live performance metrics and reporting." }
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors backdrop-blur-md text-left">
                            <feature.icon className="w-10 h-10 text-green-500 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>

            </main>

            <footer className="relative z-10 py-8 text-center text-gray-600 text-sm border-t border-white/5 bg-black/40 backdrop-blur-xl">
                &copy; 2024 StreamLite Systems. Restricted Access System.
            </footer>
        </div>
    )
}

export default AdminLanding
