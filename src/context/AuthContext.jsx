import { createContext, useContext, useEffect, useState } from "react"
import { checkAuth, loginUser, logoutUser, registerUser } from "../services/auth.service"

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await checkAuth()
                setUser(userData)
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const login = async (credentials) => {
        const userData = await loginUser(credentials)
        setUser(userData)
        return { user: userData }
    }
    const register = async (info) => {
        const userData = await registerUser(info);
        setUser(userData);
        return { user: userData };
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)