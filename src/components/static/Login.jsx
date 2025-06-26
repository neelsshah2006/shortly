import { useState } from "react";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import PasswordInput from "./PasswordInput";

const Login = ({ login, longUrl }) => {
    const [emailOrUsername, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const submitHandler = (e) => {
        e.preventDefault();
        if (!emailOrUsername || !password) {
            toast.error("Please fill in all fields.");
            return;
        }
        setLoading(true);
        login({ emailOrUsername, password }).then((userData) => {
            if (userData && userData.user) {
                toast.success("Login successful!");
                router.push("/dashboard");
            }
        }).catch((error) => {
            toast.error(error?.message || "Failed to Login. Please retry")
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="flex justify-center items-center w-full px-4">
            <form
                onSubmit={(e) => {
                    submitHandler(e)
                }}
                className="flex flex-col gap-6 w-full p-8 bg-gray-800 rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-white">Login to Your Account</h2>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="emailOrUsername" className="text-sm text-gray-300">Email or Username</label>
                    <input
                        id="emailOrUsername"
                        type="text"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        placeholder="Enter your email or username"
                        className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <PasswordInput name={"Password"} id={"password"} placeholder={"Enter your Password"} password={password} setPassword={setPassword} />

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                >
                    {loading ? (<span className="tracking-widest">...</span>) : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
