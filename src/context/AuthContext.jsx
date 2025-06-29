import { createContext, useContext, useEffect, useState } from "react"
import { checkAuth, loginUser, logoutUser, registerUser } from "../services/auth.service"
import { toast } from "react-toastify"

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await checkAuth()
                if (userData) {
                    setUser(userData)
                } else {
                    setUser(null)
                }
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
        if (userData) {
            setUser(userData)
            return { user: userData }
        } else {
            toast.error("Login failed - no user data received")
        }
    }

    const register = async (info) => {
        const userData = await registerUser(info);
        if (userData) {
            setUser(userData);
            return { user: userData };
        } else {
            toast.error("Registration failed - no user data received")
        }
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