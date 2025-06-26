import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/auth');
        }
    }, [user, loading, router]);

    if (loading || (!user && typeof window !== 'undefined')) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    return user ? children : null;
};

export default ProtectedRoute;
