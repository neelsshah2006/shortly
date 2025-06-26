import { useEffect, useState } from 'react'
import Login from '../components/static/Login'
import Register from '../components/static/Register'
import { useAuth } from "../context/AuthContext"
import { useRouter } from 'next/router'

const Auth = () => {
    const { user, login, register } = useAuth()
    const [auth, setAuth] = useState("login")
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.push("/dashboard")
        }
    }, [user, router])

    useEffect(() => {
        let login = document.querySelector(".login")
        let register = document.querySelector(".register")
        if (auth === "login") {
            document.title = "Login to Shortly - URL Shortener"
            login.classList.add("bg-blue-600")
            register.classList.remove("bg-blue-600")
        } else {
            document.title = "Register to Shortly - URL Shortener"
            register.classList.add("bg-blue-600")
            login.classList.remove("bg-blue-600")
        }
    }, [auth])

    return (
        <div>
            <div className="flex justify-center items-center w-full min-h-[80vh] py-20 bg-gray-800 text-white">
                <div className="max-w-7xl w-[80vw] md:w-[50vw] flex justify-center items-center flex-col gap-2">
                    <h1 className="text-4xl font-extrabold w-full text-center">Login or Register</h1>
                    <p className="md:text-xl text-base text-center">Please login or register to access the URL shortening features.</p>
                    <div className="mt-6 px-3 py-4 flex flex-col justify-center items-center w-full border gap-2 rounded-2xl bg-gray-900">
                        <div className='w-full flex flex-row justify-center items-center gap-1'>
                            <button onClick={() => setAuth("login")} className='grow py-2 rounded-xl login'>Login</button>
                            <button onClick={() => setAuth("register")} className='grow py-2 rounded-xl register'>Register</button>
                        </div>
                        <div className='w-full flex justify-center items-center mt-4'>
                            {auth === "login" ? <Login login={login} /> : <Register register={register} />}
                        </div>
                        <div className='w-full flex justify-center items-center gap-10 px-5 py-3'>
                            <a
                                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth/google`}
                                className="w-full text-xl flex items-center justify-center py-2 px-4 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-600 transition"
                            >
                                <img
                                    src="/g-logo.png"
                                    alt="Google"
                                    className="w-7 h-7 mr-2 bg-transparent"
                                />
                                Continue with Google
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth