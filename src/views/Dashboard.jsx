import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { createShortUrl, deleteUrl, updateUrlToCustom } from "../services/url.service";
import { useAuth } from "../context/AuthContext";
import { getUserUrls } from "../services/user.service";
import { truncateText } from "../utils/truncateText.util";
import { copyToClipboard } from "../utils/copyToClipboard.util";
import { getQRUrl } from "../utils/getQRUrl.util";
import QRCode from "../components/static/QRCode";
import { isValidCustomCode } from "../utils/validateCustomCode.util";
import { formatNumber } from "../utils/formatNumber.util";
import { getRelativeTime } from "../utils/getRelativeTime.util";
import Link from "next/link";
import { BarChart3Icon, CopyIcon, Eye, LinkIcon, QrCodeIcon, Search, Trash2Icon } from "lucide-react";

const Dashboard = () => {
    const { user } = useAuth();
    const [urls, setUrls] = useState([]);
    const [creating, setCreating] = useState(false);
    const [totalUrls, setTotalUrls] = useState(0)
    const [totalClicks, setTotalClicks] = useState(0)
    const [qr, setQr] = useState(null)
    const [deletedUrl, setDeletedUrl] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUrls, setFilteredUrls] = useState([]);
    const [sortBy, setSortBy] = useState('Newest First');
    const [checkAll, setCheckAll] = useState(false)
    const [selectedUrls, setSelectedUrls] = useState([]);

    const [formData, setFormData] = useState({
        longUrl: "",
        customCode: ""
    })



    const totalClicksCount = () => {
        const clicks = urls.reduce((sum, url) => sum + url.visitCount, 0);
        setTotalClicks(clicks);
    };

    const fetchUrls = async () => {
        const links = await getUserUrls();
        setUrls(links)
        setTotalUrls(links.length)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.longUrl) {
            toast.error("Please Enter the long URL")
            return;
        }
        if (formData.customCode !== "") {
            if (!isValidCustomCode(formData.customCode)) {
                toast.error("Custom Code must be 6-20 characters long and can only contain letters, numbers, and underscores.")
                return;
            }
        }
        setCreating(true)
        try {
            const url = formData.longUrl.trim();
            const createURL = new URL(url.startsWith("http") ? url : `https://${url}`);
            const shortUrl = await createShortUrl({ longUrl: createURL });
            if (formData.customCode !== "") {
                await updateUrlToCustom(shortUrl.shortCode, formData.customCode)
            }
            setFormData({
                longUrl: "",
                customCode: ""
            })
            fetchUrls()
        } catch (error) {
            toast.error(error?.message || "Failed to Create Short URL")
        } finally {
            setCreating(false)
        }
    }

    const handleCopy = async (text, type = "URL") => {
        const success = await copyToClipboard(text);
        if (success) toast.success(`${type} copied to Clipboard`)
        else toast.error(`Failed to Copy to Clipboard`)
    }

    const handleShowQR = (shortCode) => {
        getQRUrl(shortCode).then(url => setQr(url))
    }

    const handleDelete = (url) => {
        setDeletedUrl(url)
    }

    const confirmDelete = (shortCode) => {
        deleteUrl(shortCode)
            .then((url) => {
                toast.success(`ShortURL deleted Successfully`)
                setDeletedUrl(null)
                fetchUrls()
                totalClicksCount()
            })
            .catch((err) => {
                toast.error(`Error Occured: ${err.message || err}`)
            })
    }

    useEffect(() => {
        if (user) {
            fetchUrls()
            document.title = `Dashboard - ${user.fullName.firstName}`;
        }
    }, [user]);

    useEffect(() => {
        if (urls.length > 0) totalClicksCount();
    }, [urls]);

    useEffect(() => {
        setFilteredUrls(urls)
    }, [urls])

    useEffect(() => {
        if (searchTerm != "") {
            const filter = urls.filter((url) => { if (url.longUrl.includes(searchTerm)) return url })
            setFilteredUrls(filter)
        } else {
            setFilteredUrls(urls)
        }
    }, [searchTerm, urls])

    useEffect(() => {
        const sortedUrls = [...urls];
        if (sortBy === "Newest First") {
            sortedUrls.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === "Oldest First") {
            sortedUrls.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortBy === "Most Clicks") {
            sortedUrls.sort((a, b) => b.visitCount - a.visitCount);
        } else {
            sortedUrls.sort((a, b) => a.visitCount - b.visitCount);
        }

        setUrls(sortedUrls);
    }, [sortBy]);

    useEffect(() => {
        if (checkAll) {
            setSelectedUrls(filteredUrls)
        } else {
            setSelectedUrls([])
        }
    }, [checkAll])

    useEffect(() => {
        let deletebtn = document.querySelector(".delete")
        if (selectedUrls.length > 0) {
            deletebtn.classList.remove("hidden")
        } else {
            deletebtn.classList.add("hidden")
        }
    }, [selectedUrls])


    return (
        <>
            <div className="min-h-screen w-full bg-gray-900 py-8 text-white flex flex-col gap-5">
                <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="flex flex-col w-full justify-center items-start gap-2 mb-8"
                    >
                        <h1 className="text-white text-3xl font-bold">
                            Welcome, <span className="capitalize font-extrabold font-serif">{user?.fullName?.firstName}</span>! 👋
                        </h1>
                        <p className="text-gray-300">
                            Manage your shortened URLs and track their performance
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-5 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="bg-[#1e2939] grow flex items-center justify-start p-5 rounded-xl gap-5 w-full"
                        >
                            <div className="flex justify-center items-center bg-blue-200 p-3 rounded-lg">
                                <LinkIcon color="blue" />
                            </div>
                            <div className="flex flex-col justify-center items-start gap-0">
                                <p className="text-gray-300 text-sm font-light tracking-widest">Total URLs</p>
                                <p className="text-2xl font-bold">{formatNumber(totalUrls)}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="bg-gray-800 grow flex items-center justify-start p-5 rounded-xl gap-5 w-full"
                        >
                            <div className="flex justify-center items-center bg-green-200 p-3 rounded-lg">
                                <Eye color="green" />
                            </div>
                            <div className="flex flex-col justify-center items-start gap-0">
                                <p className="text-gray-300 text-sm font-light tracking-widest">Total clicks</p>
                                <p className="text-2xl font-bold">{formatNumber(totalClicks)}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            className="bg-[#1e2939] grow flex items-center justify-start p-5 rounded-xl gap-5 w-full"
                        >
                            <div className="flex justify-center items-center bg-purple-200 p-3 rounded-lg">
                                <BarChart3Icon color="purple" />
                            </div>
                            <div className="flex flex-col justify-center items-start gap-0">
                                <p className="text-gray-300 text-sm font-light tracking-widest">Average Clicks</p>
                                <p className="text-2xl font-bold">{totalUrls > 0 ? formatNumber(Math.round(totalClicks / totalUrls)) : 0}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="flex flex-col gap-3 py-5 bg-gray-800 rounded-xl justify-center items-center"
                        onSubmit={handleSubmit}
                    >
                        <div className="w-full px-5">
                            <input
                                name="longUrl"
                                value={formData.longUrl}
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                className="w-full p-3 rounded-xl bg-gray-700 outline-0 border border-gray-600"
                                type="text"
                                placeholder="Paste Your Long URL here for shortening...."
                            />
                        </div>
                        <div className="w-full px-5 justify-center items-center grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5">
                            <input
                                name="customCode"
                                value={formData.customCode}
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                className="md:grow p-3 rounded-xl bg-gray-700 border border-gray-600"
                                type="text"
                                placeholder="Provide a Custom Code (Optional)"
                            />
                            <button
                                type="submit"
                                className="md:grow p-3 rounded-xl bg-blue-700 tracking-wider text-lg hover:scale-102 cursor-pointer transition-all duration-300"
                            >
                                {creating ? "..." : "Create Short URL"}
                            </button>
                        </div>
                    </motion.form>
                </div>
                <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="bg-gray-800 rounded-xl"
                    >
                        <div className="flex flex-col justify-center gap-3 md:flex-row md:justify-between items-center p-5">
                            <div className="text-xl font-bold">
                                Your URLs
                            </div>
                            <div className="flex justify-center items-center gap-3 w-full md:w-fit">
                                <button
                                    onClick={() => {
                                        setDeletedUrl([...selectedUrls])
                                    }}
                                    className="px-5 py-2 bg-red-700 rounded-xl hidden delete"
                                >
                                    Delete Selected URLs
                                </button>
                                <div className="bg-gray-600 md:px-5 flex justify-start items-center gap-3 rounded-lg grow ">
                                    <Search className="white" />
                                    <input
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="outline-0 px-2 py-2 w-full md:w-40"
                                        type="text"
                                        placeholder="Search URLs…"
                                    />
                                </div>
                                <select
                                    className="text-white bg-gray-800"
                                    name="sort"
                                    id="sort"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="Newest First">Newest First</option>
                                    <option value="Oldest First">Oldest First</option>
                                    <option value="Most Clicks">Most Clicks</option>
                                    <option value="Least Clicks">Least Clicks</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        {filteredUrls.length === 0 ?
                            (<div className="py-12 w-full flex flex-col justify-center items-center">
                                <LinkIcon color="gray" className="w-30 h-30 p-5" />
                                <p className="text-2xl font-bold text-gray-300">No URL yet</p>
                            </div>) :
                            (<div className="w-full overflow-x-auto rounded-lg shadow">
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    value={checkAll}
                                                    onChange={() => setCheckAll(checkAll ? false : true)}
                                                    className="text-center rounded hidden md:table-cell border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </th>
                                            <th className="text-left py-3 px-4 text-base font-medium text-white">Original URL</th>
                                            <th className="text-left py-3 px-4 text-base font-medium text-white">Short URL</th>
                                            <th className="text-left py-3 px-4 text-base hidden md:table-cell font-medium text-white">Clicks</th>
                                            <th className="text-left py-3 px-4 text-base hidden md:table-cell font-medium text-white">Created At</th>
                                            <th className="text-left py-3 px-4 text-base font-medium text-white">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUrls.map((url, idx) => {
                                            return (
                                                <motion.tr
                                                    key={idx}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="hover:bg-gray-700 transition-colors"
                                                >
                                                    <td className="md:py-4 md:px-4 text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedUrls.includes(url)}
                                                            onChange={() => {
                                                                if (selectedUrls.includes(url)) {
                                                                    setSelectedUrls(selectedUrls.filter(a => a !== url));
                                                                } else {
                                                                    setSelectedUrls([...selectedUrls, url]);
                                                                }
                                                            }}

                                                            className="rounded hidden md:table-cell border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="max-w-xs">
                                                            <p className="text-sm text-white truncate" title={url.longUrl}>
                                                                {truncateText(url.longUrl, 50)}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-2">
                                                            <code className="text-sm bg-gray-700 px-2 py-1 rounded text-purple-400">
                                                                {url.shortCode}
                                                            </code>
                                                            <button
                                                                onClick={() => handleCopy(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url.shortCode}`)}
                                                                className="text-gray-400 hover:text-gray-300 transition-colors"
                                                                title="Copy URL"
                                                            >
                                                                <CopyIcon width={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="md:py-4 md:px-4 hidden md:table-cell">
                                                        <span className="text-sm font-medium text-white">
                                                            {url.visitCount}
                                                        </span>
                                                    </td>
                                                    <td className="md:py-4 md:px-4 hidden md:table-cell">
                                                        <span className="text-sm text-gray-400">
                                                            {getRelativeTime(url.createdAt)}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 md:px-4">
                                                        <div className="flex items-center justify-start gap-2">
                                                            <button
                                                                onClick={() => handleShowQR(url.shortCode)}
                                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                                                title="Show QR Code"
                                                            >
                                                                <QrCodeIcon />
                                                            </button>
                                                            <Link
                                                                href={`/stats/${url.shortCode}`}
                                                                className="text-green-400 hover:text-green-300 transition-colors"
                                                                title="View Analytics"
                                                            >
                                                                <BarChart3Icon />
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(url)}
                                                                className="text-red-400 hover:text-red-300 transition-colors"
                                                                title="Delete URL"
                                                            >
                                                                <Trash2Icon />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )
                                        })}
                                    </tbody>
                                </table >
                            </div >)}
                    </motion.div >
                </div >
                {qr !== null ? <QRCode setQr={setQr} qr={qr} /> : ""}
                {
                    deletedUrl == null ? null : Array.isArray(deletedUrl) ?
                        (<motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setDeletedUrl(null)}
                            className="fixed top-0 flex h-full w-full justify-center items-center backdrop-blur"
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="border bg-gray-800 p-5 text-white flex flex-col justify-center items-center gap-5 mx-5"
                            >
                                <h3 className="w-full text-left text-red-500 font-bold text-xl text-wrap">You are About to delete the following short URLs</h3>
                                {deletedUrl.map((url, idx) => <p key={idx} className="w-full text-left font-mono">{url.longUrl} : <span>{url.shortCode}</span></p>)}
                                <button
                                    onClick={() => deletedUrl.map((url) => confirmDelete(url.shortCode))}
                                    className="bg-red-600 px-10 py-3 w-full font-bold font-mono"
                                >
                                    Delete ShortUrl
                                </button>
                                <button onClick={() => setDeletedUrl(null)} className="bg-white font-mono w-full px-10 py-3 text-black">Back To DashBoard</button>
                            </motion.div>
                        </motion.div>) :
                        (<motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setDeletedUrl(null)}
                            className="fixed top-0 flex h-full w-full justify-center items-center backdrop-blur"
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="border bg-gray-800 p-5 text-white flex flex-col justify-center items-center gap-5"
                            >
                                <h3 className="w-full text-left text-red-500 font-bold text-xl text-wrap ">You are About to delete the following short URL</h3>
                                <p className="w-full text-left font-mono">Original URL: {deletedUrl.longUrl}</p>
                                <p className="w-full text-left font-mono">Short URL: {process.env.NEXT_PUBLIC_API_BASE_URL}/{deletedUrl.shortCode}</p>
                                <p className="w-full text-left font-mono">Visit Count: {deletedUrl.visitCount}</p>
                                <button onClick={() => confirmDelete(deletedUrl.shortCode)} className="bg-red-600 px-10 py-3 w-full font-bold font-mono">Delete ShortUrl</button>
                                <button onClick={() => setDeletedUrl(null)} className="bg-white font-mono w-full px-10 py-3 text-black">Back To DashBoard</button>
                            </motion.div>
                        </motion.div>)
                }
            </div >
        </>
    )
}

export default Dashboard