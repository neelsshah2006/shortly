import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { getUrlStats } from "../services/url.service";
import { getRelativeTime } from "../utils/getRelativeTime.util";
import { copyToClipboard } from "../utils/copyToClipboard.util";
import { formatNumber } from "../utils/formatNumber.util";
import { getQRUrl } from "../utils/getQRUrl.util";
import ChartCard from "../components/static/ChartCard";
import { LineChart, BarChart, DonutChart } from "../components/static/Chart";
import LoadingSpinner from "../components/loaders/LoadingSpinner";
import { getAnalytics } from "../utils/getAnalytics.util";
import { getMilliseconds } from "../utils/getMilliseconds.util";
import QRCode from "../components/static/QRCode";
import { checkAuth } from "../services/auth.service";
import { AlertTriangle, BarChart3Icon, Building2, Copy, Earth, EarthIcon, Eye, Globe, Landmark, Laptop2, LinkIcon, MapPin, QrCodeIcon, Smartphone } from "lucide-react";

const Stats = ({ shortCode }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clicks, setClicks] = useState([]);
    const [filteredClicks, setFilteredClicks] = useState([]);
    const [filterTime, setFilterTime] = useState("7d");
    const [qr, setQr] = useState(null);

    const [url, setUrl] = useState(null);
    const [totalClicks, settotalClicks] = useState(0);
    const [clicksByTime, setClicksByTime] = useState({});
    const [clicksByContinent, setClicksByContinent] = useState({});
    const [clicksByCountry, setClicksByCountry] = useState({});
    const [clicksByState, setClicksByState] = useState({});
    const [clicksByCity, setClicksByCity] = useState({});
    const [clicksByOS, setClicksByOS] = useState({});
    const [clicksByDevice, setClicksByDevice] = useState({});
    const [clicksByBrowser, setClicksByBrowser] = useState({});

    const router = useRouter();

    const fetchStats = async (id) => {
        getUrlStats(shortCode)
            .then((data) => {
                data.shortUrl.user === id
                    ? setError(null)
                    : setError("You do not have access to this URL's stats");
                setUrl(data.shortUrl);
                setClicks(data.clicks);
            })
            .catch((error) => {
                toast.error(error?.message || "Failed to fetch URL stats");
                // router.push("/dashboard");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleQR = (shortCode) => {
        getQRUrl(shortCode).then((url) => setQr(url));
    };

    const handleCopy = async (text, type = "URL") => {
        const success = await copyToClipboard(text);
        if (success) toast.success(`${type} copied to Clipboard`);
        else toast.error(`Failed to Copy to Clipboard`);
    };

    useEffect(() => {
        checkAuth()
            .then((user) => {
                fetchStats(user._id);
            })
            .catch((err) => {
                router.push("/auth");
            });
    }, []);

    useEffect(() => {
        setFilteredClicks(
            clicks.filter((i) => new Date() - new Date(i.createdAt) < getMilliseconds(filterTime))
        );
    }, [clicks, filterTime]);

    useEffect(() => {
        if (filteredClicks.length > 0) {
            const analytics = getAnalytics(filteredClicks);
            settotalClicks(analytics.totalClicks);
            setClicksByTime(analytics.clicksByTime);
            setClicksByContinent(analytics.clicksByContinent);
            setClicksByCountry(analytics.clicksByCountry);
            setClicksByState(analytics.clicksByState);
            setClicksByCity(analytics.clicksByCity);
            setClicksByOS(analytics.clicksByOs);
            setClicksByDevice(analytics.clicksByDevice);
            setClicksByBrowser(analytics.clicksByBrowser);
        }
    }, [filteredClicks]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="max-w-7xl mx-auto px-4 py-10">
                    {/* Loading Header Skeleton */}
                    <div className="mb-12 text-center">
                        <div className="h-16 bg-gray-700/50 rounded-2xl mb-4 animate-pulse"></div>
                        <div className="h-6 bg-gray-700/30 rounded-lg mx-auto max-w-md animate-pulse"></div>
                    </div>

                    {/* Loading Metrics Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-800/60 rounded-2xl p-6 animate-pulse">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 bg-gray-700/50 rounded-xl"></div>
                                    <div className="w-6 h-6 bg-gray-700/30 rounded"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-8 bg-gray-700/50 rounded w-20"></div>
                                    <div className="h-4 bg-gray-700/30 rounded w-24"></div>
                                    <div className="h-3 bg-gray-700/20 rounded w-20"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Loading Charts Skeleton */}
                    <div className="space-y-8">
                        <div className="text-center mb-8">
                            <div className="h-8 bg-gray-700/50 rounded-lg mx-auto max-w-xs mb-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-700/30 rounded-lg mx-auto max-w-md animate-pulse"></div>
                        </div>

                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {[...Array(2)].map((_, j) => (
                                    <div key={j} className="bg-gray-800/60 rounded-2xl p-6 animate-pulse">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-gray-700/50 rounded-xl"></div>
                                            <div className="h-5 bg-gray-700/50 rounded w-32"></div>
                                        </div>
                                        <div className="h-64 bg-gray-700/30 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Loading Spinner */}
                    <div className="flex justify-center items-center mt-12">
                        <LoadingSpinner size="xl" color="blue" text="Loading analytics..." />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !url) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto text-center p-8"
                >
                    {/* Error Icon */}
                    <div className="mb-6">
                        <div className="p-4 bg-red-500/20 rounded-full inline-block mb-4">
                            <AlertTriangle className="w-12 h-12 text-red-400" />
                        </div>
                    </div>

                    {/* Error Content */}
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Oops! Something went wrong
                    </h2>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        {error || "We couldn't load the analytics data for this link. Please check if the link exists and you have permission to view its stats."}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Prepare chart data
    const timeData = Object.entries(clicksByTime || {}).map(([label, value]) => ({
        label,
        value,
    }));
    const countryData = Object.entries(clicksByCountry || {}).map(([label, value]) => ({
        label,
        value,
    }));
    const continentData = Object.entries(clicksByContinent || {}).map(([label, value]) => ({
        label,
        value,
    }));
    const stateData = Object.entries(clicksByState || {}).map(([label, value]) => ({
        label,
        value,
    }));
    const cityData = Object.entries(clicksByCity || {}).map(([label, value]) => ({
        label,
        value,
    }));
    const deviceData = Object.entries(clicksByDevice || {}).map(([label, value]) => ({
        label,
        value,
    }));
    const browserData = Object.entries(clicksByBrowser || {}).map(([label, value]) => ({
        label,
        value,
    }));
    const osData = Object.entries(clicksByOS || {}).map(([label, value]) => ({
        label,
        value,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Enhanced Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12 text-center relative"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>

                    <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700/50">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-6"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                                Analytics Dashboard
                            </h1>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2">
                                <span className="text-lg sm:text-xl text-gray-300">for</span>
                                <code className="text-lg sm:text-xl lg:text-2xl font-mono bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg break-all">
                                    {url?.shortCode || shortCode}
                                </code>
                            </div>
                            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                                Comprehensive insights into your link's performance, audience demographics, and engagement patterns.
                            </p>
                        </motion.div>

                        {/* Time Filter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-2 px-2"
                        >
                            {[
                                { value: "1h", label: "Last Hour", shortLabel: "1H", icon: "⏳" },
                                { value: "1d", label: "24 Hours", shortLabel: "24H", icon: "🕐" },
                                { value: "7d", label: "7 Days", shortLabel: "7D", icon: "📅" },
                                { value: "30d", label: "30 Days", shortLabel: "30D", icon: "📊" },
                                { value: "90d", label: "90 Days", shortLabel: "90D", icon: "📈" },
                                { value: "1y", label: "1 Year", shortLabel: "1Y", icon: "🗓️" }
                            ].map((filter) => (
                                <button
                                    key={filter.value}
                                    onClick={() => setFilterTime(filter.value)}
                                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${filterTime === filter.value
                                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                                        : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                                        }`}
                                >
                                    <span className="mr-1 sm:mr-2">{filter.icon}</span>
                                    <span className="hidden sm:inline">{filter.label}</span>
                                    <span className="sm:hidden">{filter.shortLabel}</span>
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Enhanced Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                    {/* Total Clicks Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="group relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 group-hover:bg-blue-500/30 transition-colors duration-300">
                                    <Eye />
                                </div>
                                <div className="text-blue-400/60 text-sm font-medium">👁️</div>
                            </div>
                            <div className="space-y-1">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                                    className="text-3xl font-bold text-white"
                                >
                                    {formatNumber(totalClicks)}
                                </motion.div>
                                <div className="text-blue-300/80 text-sm font-medium">Total Clicks</div>
                                <div className="text-blue-400/60 text-xs">All time engagement</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Countries Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="group relative overflow-hidden bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-500/20 text-green-400 rounded-xl group-hover:bg-green-500/30 transition-colors duration-300">
                                    <Earth />
                                </div>
                                <div className="text-green-400/60 text-sm font-medium">🌍</div>
                            </div>
                            <div className="space-y-1">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                                    className="text-3xl font-bold text-white"
                                >
                                    {Object.keys(countryData).length}
                                </motion.div>
                                <div className="text-green-300/80 text-sm font-medium">Countries</div>
                                <div className="text-green-400/60 text-xs">Global reach</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Device Types Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="group relative overflow-hidden bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl group-hover:bg-purple-500/30 transition-colors duration-300">
                                    <Smartphone />
                                </div>
                                <div className="text-purple-400/60 text-sm font-medium">📱</div>
                            </div>
                            <div className="space-y-1">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                                    className="text-3xl font-bold text-white"
                                >
                                    {Object.keys(deviceData).length}
                                </motion.div>
                                <div className="text-purple-300/80 text-sm font-medium">Device Types</div>
                                <div className="text-purple-400/60 text-xs">Platform diversity</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Browsers Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="group relative overflow-hidden bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-orange-500/20 text-orange-400 rounded-xl group-hover:bg-orange-500/30 transition-colors duration-300">
                                    <Globe />
                                </div>
                                <div className="text-orange-400/60 text-sm font-medium">🌐</div>
                            </div>
                            <div className="space-y-1">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                                    className="text-3xl font-bold text-white"
                                >
                                    {Object.keys(browserData).length}
                                </motion.div>
                                <div className="text-orange-300/80 text-sm font-medium">Browsers</div>
                                <div className="text-orange-400/60 text-xs">Browser variety</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* URL Information Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-12 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                            <LinkIcon color="white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">URL Information</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Original URL */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-400">Original URL</label>
                            <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-xl border border-gray-600/50">
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm truncate" title={url?.longUrl}>
                                        {url?.longUrl}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleCopy(url?.longUrl, "Original URL")}
                                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:bg-gray-600/50 rounded-lg"
                                    title="Copy original URL"
                                >
                                    <Copy width={20} />
                                </button>
                            </div>
                        </div>

                        {/* Short URL */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-400">Short URL</label>
                            <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-xl border border-gray-600/50">
                                <div className="flex-1 min-w-0">
                                    <p className="text-blue-400 text-sm font-mono">
                                        {`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url?.shortCode}`}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleCopy(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url?.shortCode}`, "Short URL")}
                                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:bg-gray-600/50 rounded-lg"
                                        title="Copy short URL"
                                    >
                                        <Copy width={20} />
                                    </button>
                                    <button
                                        onClick={() => handleQR(url?.shortCode)}
                                        className="p-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 hover:bg-gray-600/50 rounded-lg"
                                        title="Generate QR Code"
                                    >
                                        <QrCodeIcon width={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700/50">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{formatNumber(totalClicks)}</div>
                            <div className="text-xs text-gray-400">Total Clicks</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{Object.keys(countryData).length}</div>
                            <div className="text-xs text-gray-400">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{Object.keys(deviceData).length}</div>
                            <div className="text-xs text-gray-400">Devices</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{getRelativeTime(url?.createdAt)}</div>
                            <div className="text-xs text-gray-400">Created</div>
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced Charts Section */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                            Detailed Analytics
                        </h2>
                        <p className="text-gray-400">Comprehensive breakdown of your link's performance metrics</p>
                    </motion.div>

                    {/* Row 1: Time & Countries */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartCard
                            delay={1.0}
                            icon={
                                <BarChart3Icon />
                            }
                            title="📈 Clicks Over Time"
                            gradientClasses="bg-gradient-to-r from-blue-500 to-blue-600"
                            borderClasses="border-blue-500/30"
                        >
                            <LineChart data={timeData} height={300} className="!bg-transparent !p-0" />
                        </ChartCard>
                        <ChartCard
                            delay={1.1}
                            icon={
                                <EarthIcon />
                            }
                            title="🌍 Top Countries"
                            gradientClasses="bg-gradient-to-r from-green-500 to-green-600"
                            borderClasses="border-green-500/30"
                        >
                            <BarChart data={countryData} height={300} className="!bg-transparent !p-0" />
                        </ChartCard>
                    </div>
                    {/* Row 2: Continents & States */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartCard
                            delay={1.2}
                            icon={
                                <Landmark />
                            }
                            title="🌎 Top Continents"
                            gradientClasses="bg-gradient-to-r from-yellow-500 to-yellow-600"
                            borderClasses="border-yellow-500/30"
                        >
                            <BarChart data={continentData} height={300} className="!bg-transparent !p-0" />
                        </ChartCard>
                        <ChartCard
                            delay={1.3}
                            icon={
                                <Building2 />
                            }
                            title="🏛️ Top States"
                            gradientClasses="bg-gradient-to-r from-pink-500 to-pink-600"
                            borderClasses="border-pink-500/30"
                        >
                            <BarChart data={stateData} height={300} className="!bg-transparent !p-0" />
                        </ChartCard>
                    </div>
                    {/* Row 3: Cities & Devices */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartCard
                            delay={1.4}
                            icon={
                                <MapPin />
                            }
                            title="🏙️ Top Cities"
                            gradientClasses="bg-gradient-to-r from-purple-500 to-purple-600"
                            borderClasses="border-purple-500/30"
                        >
                            <BarChart data={cityData} height={300} className="!bg-transparent !p-0" />
                        </ChartCard>
                        <ChartCard
                            delay={1.5}
                            icon={
                                <Smartphone />
                            }
                            title="📱 Device Types"
                            gradientClasses="bg-gradient-to-r from-indigo-500 to-indigo-600"
                            borderClasses="border-indigo-500/30"
                        >
                            <DonutChart data={deviceData} size={250} className="!bg-transparent !p-0" />
                        </ChartCard>
                    </div>
                    {/* Row 4: Browsers & OS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartCard
                            delay={1.6}
                            icon={
                                <Globe />
                            }
                            title="🌐 Top Browsers"
                            gradientClasses="bg-gradient-to-r from-cyan-500 to-cyan-600"
                            borderClasses="border-cyan-500/30"
                        >
                            <DonutChart data={browserData} size={250} className="!bg-transparent !p-0" />
                        </ChartCard>
                        <ChartCard
                            delay={1.7}
                            icon={
                                <Laptop2 />
                            }
                            title="💻 Operating Systems"
                            gradientClasses="bg-gradient-to-r from-red-500 to-red-600"
                            borderClasses="border-red-500/30"
                        >
                            <DonutChart data={osData} size={250} className="!bg-transparent !p-0" />
                        </ChartCard>
                    </div>
                </div>

                {/* Enhanced QR Code Modal */}
                {qr && (
                    <QRCode setQr={setQr} qr={qr} />
                )}
            </div>
        </div>
    );
};

export default Stats;