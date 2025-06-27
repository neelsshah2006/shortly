import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Register = ({ register }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword || !username || !firstName || !lastName) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        setLoading(true);
        register({ email, password, username, firstName, lastName }).then((userData) => {
            if (userData && userData.user) {
                toast.success("Registration successful!");
                router.push("/dashboard");
            }
        }).catch((error) => {
            toast.error(error?.message || "Failed to Register. Please retry");
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="flex justify-center items-center w-full px-4">
            <form
                onSubmit={(e) => {
                    submitHandler(e);
                }}
                className="flex flex-col gap-6 w-full p-8 bg-gray-800 rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-white">Register Account</h2>

                <div className="grid grid-cols-2 gap-2 w-full">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="firstName" className="text-sm text-gray-300">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Jhon"
                            className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="lastName" className="text-sm text-gray-300">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="username" className="text-sm text-gray-300">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="email" className="text-sm text-gray-300">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <PasswordInput name={"Password"} id={"password"} placeholder={"Enter your Password"} password={password} setPassword={setPassword} />

                <PasswordInput name={"Confirm Password"} id={"confirmPassword"} placeholder={"Confirm your Password"} password={confirmPassword} setPassword={setConfirmPassword} />

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                >
                    {loading ? (<span className="tracking-widest">...</span>) : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;
