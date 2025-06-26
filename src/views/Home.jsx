import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { checkAuth } from "../services/auth.service";

const Home = () => {
    const { user, setUser } = useAuth();
    const [url, setUrl] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (user) {
            checkAuth()
                .then(() => {
                    router.push("/dashboard")
                })
                .catch(() => {
                    setUser(null)
                })
        }
    }, [user, router, setUser])

    const handleShorten = (e) => {
        e.preventDefault();
        alert("Please login to shorten URLs")
        router.push("/auth")
    }

    return (
        <div className="flex justify-center items-center w-full h-[80vh] bg-gray-800 text-white">
            <div className="max-w-7xl w-[80vw] md:w-[60vw] flex justify-center items-center flex-col gap-2">
                <h1 className="text-4xl font-extrabold">Shorten Your URLS</h1>
                <h1 className="text-5xl font-bold text-amber-300 uppercase font-mono">Instantly</h1>
                <p className="md:text-xl text-base text-center">Transform long, complex URLs into short, shareable links with powerful analytics and custom branding options.</p>
                <div className="mt-6 px-3 py-4 flex flex-col md:flex-row justify-center items-center w-full gap-3">
                    <input value={url} onChange={(e) => setUrl(e.target.value)} className="outline-0 grow w-full md:w-fit bg-gray-700 px-2 py-3 rounded-xl" placeholder="Enter your Long URL Here" type="text" />
                    <button onClick={(e) => handleShorten(e)} className="bg-blue-700 py-3 w-full md:w-fit px-5 rounded-xl">Shorten Now</button>
                </div>
            </div>
        </div>
    )
}

export default Home;