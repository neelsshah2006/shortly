import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from "../../context/AuthContext";
import { LogOut } from 'lucide-react';

const NavBar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/auth');
    };

    return (
        <div className='bg-gray-900'>
            <nav className="max-w-7xl w-full mx-auto shadow px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex justify-center items-center gap-5 text-xl font-bold text-white">
                        <img width={40} src="/favicon.png" alt="logo" />
                        Shortly
                    </Link>
                    {user && (
                        <>
                            <Link href="/dashboard" className="ml-4 text-gray-200 hover:underline">Dashboard</Link>
                            <Link href="/profile" className="ml-2 text-gray-200 hover:underline">Profile</Link>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {user ? (
                        <button onClick={handleLogout} className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex justify-center items-center gap-2">
                            <LogOut />
                            <span className="hidden md:inline-block">Logout</span>
                        </button>
                    ) : (
                        <>
                            <button onClick={() => window.location.href = "/auth"} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Login</button>
                            <button onClick={() => window.location.href = "/auth"} className="ml-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition">Register</button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavBar; 