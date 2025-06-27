import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/loaders/LoadingSpinner";
import { changePassword, getUserUrls, updateProfile } from "../services/user.service";
import { getAccountAge } from "../utils/getAccountAge.util"
import { Calendar, Eye, LinkIcon } from "lucide-react";
import Password from "../components/static/Password";

const Profile = () => {
    const { user, setUser } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [saving, setSaving] = useState(false)
    const [pwSaving, setPwSaving] = useState(false)
    const [mutable, setMutable] = useState(user?.authProvider === "local")
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [totalClicks, setTotalClicks] = useState(0);
    const [totalUrls, setTotalUrls] = useState(0);
    const [accountAge, setAccountAge] = useState('0 days')
    const [pwForm, setPwForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [profile, setProfile] = useState({
        firstName: user?.fullName?.firstName || user?.firstName || '',
        lastName: user?.fullName?.lastName || user?.lastName || '',
        username: user?.username || ''
    });

    const tabs = [
        { id: 'profile', name: 'Profile', icon: '👤' },
        { id: 'security', name: 'Security', icon: '🔒' },
        { id: 'stats', name: 'Statistics', icon: '📊' }
    ];



    const totalClicksCount = (links) => {
        const clicks = links.reduce((sum, url) => sum + url.visitCount, 0);
        setTotalClicks(clicks)
    }

    const fetchUrls = () => {
        getUserUrls().then((links) => {
            setTotalUrls(links.length)
            totalClicksCount(links)
        })
    }

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }

    const handlePwChange = (e) => {
        setPwForm({ ...pwForm, [e.target.name]: e.target.value });
    }

    const handleProfileSave = (e) => {
        e.preventDefault();
        if (!profile.firstName || !profile.lastName || !profile.username) {
            toast.error("Please fill in all fields.");
            return;
        }
        setSaving(true);
        updateProfile(profile)
            .then((updatedProfile) => {
                toast.success("Profile Updated Successfully")
                setUser(updatedProfile)
            })
            .catch((error) => {
                toast.error(error?.message || "Failed to Update Profile. Please retry")
            })
            .finally(() => {
                setSaving(false)
            })
    }

    const handlePwSave = (e) => {
        e.preventDefault()
        if (!pwForm.oldPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
            toast.error('Please fill in all password fields');
            return;
        }
        if (pwForm.newPassword.length < 8) {
            toast.error('New password must be at least 6 characters long');
            return;
        }
        if (pwForm.newPassword !== pwForm.confirmPassword) {
            toast.error('New password and Confirm Password do not match');
            return;
        }
        setPwSaving(true);
        changePassword({ oldPassword: pwForm.oldPassword, newPassword: pwForm.newPassword })
            .then((a) => {
                console.log(a);
                toast.success("Password Changed Successfully")
            })
            .catch((error) => {
                console.log(error);
                toast.error(error?.message || "Failed to Change Password. Please retry")
            })
            .finally(() => {
                setPwSaving(false)
            })
    }

    useEffect(() => {
        if (user) {
            fetchUrls()
            document.title = `Profile - ${user.fullName.firstName}`;
            const { days, years } = getAccountAge(user?.createdAt)
            if (years > 0) {
                setAccountAge(`${years} years ${days % 365} days`)
            } else {
                setAccountAge(`${days} days`)
            }
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Account Settings
                    </h1>
                    <p className="text-gray-300">
                        Manage your account settings and preferences
                    </p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-800 rounded-xl shadow-sm p-6 mb-8"
                >
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user?.fullName?.firstName?.charAt(0) || user?.firstName?.charAt(0)}{user?.fullName?.lastName?.charAt(0) || user?.lastName?.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                {user?.fullName?.firstName || user?.firstName} {user?.fullName?.lastName || user?.lastName}
                            </h2>
                            <p className="text-gray-300">@{user?.username}</p>
                            <p className="text-sm text-gray-400">{user?.email}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                >
                    <div className="border-b border-gray-700">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-400'
                                        : 'border-transparent text-gray-400 hover:text-gray-300'
                                        }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'profile' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-lg font-semibold text-white mb-6">
                                    Profile Information
                                </h3>
                                <form
                                    onSubmit={handleProfileSave}
                                    className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={profile.firstName}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white transition-all duration-200"
                                                disabled={saving}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={profile.lastName}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white transition-all duration-200"
                                                disabled={saving}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={profile.username}
                                            onChange={handleProfileChange}
                                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white transition-all duration-200"
                                            disabled={saving}
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={saving}
                                        >
                                            {saving ? (
                                                <div className="flex items-center">
                                                    <LoadingSpinner size="sm" className="mr-2" />
                                                    Saving...
                                                </div>
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'security' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-lg font-semibold text-white mb-6">
                                    Security Settings
                                </h3>
                                <form
                                    onSubmit={handlePwSave}
                                    className="space-y-6">
                                    <Password showPassword={showOldPassword} setShowPassword={setShowOldPassword} value={pwForm.oldPassword} handlePwChange={handlePwChange} mutable={mutable} pwSaving={pwSaving} label={"Current Password"} name={'oldPassword'} placeholder={"Enter your current Password"} />

                                    <Password showPassword={showPassword} setShowPassword={setShowPassword} value={pwForm.newPassword} handlePwChange={handlePwChange} mutable={mutable} pwSaving={pwSaving} label={"New Password"} name={'newPassword'} placeholder={"Enter New Password"} />

                                    <Password showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} value={pwForm.confirmPassword} handlePwChange={handlePwChange} mutable={mutable} pwSaving={pwSaving} label={"Confirm Password"} name={'confirmPassword'} placeholder={"Confirm New Password"} />

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={pwSaving}
                                        >
                                            {pwSaving ? (
                                                <div className="flex items-center">
                                                    <LoadingSpinner size="sm" className="mr-2" />
                                                    Changing...
                                                </div>
                                            ) : (
                                                'Change Password'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'stats' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-lg font-semibold text-white mb-6">
                                    Account Statistics
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-blue-900/20 rounded-lg p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 bg-blue-900 text-blue-400 rounded-lg">
                                                <LinkIcon />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-300">Total URLs</p>
                                                <p className="text-2xl font-bold text-white">{totalUrls}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-900/20 rounded-lg p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 text-green-400 bg-green-900 rounded-lg">
                                                <Eye />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-300">Total Clicks</p>
                                                <p className="text-2xl font-bold text-white">{totalClicks}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-900/20 rounded-lg p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 text-purple-400 bg-purple-900 rounded-lg">
                                                <Calendar />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-300">Account Age</p>
                                                <p className="text-2xl font-bold text-white">{accountAge}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 bg-gray-700/50 rounded-lg p-6">
                                    <h4 className="font-medium text-white mb-4">Account Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-400">Member since:</span>
                                            <span className="ml-2 text-white">
                                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Email:</span>
                                            <span className="ml-2 text-white">{user?.email}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Account status:</span>
                                            <span className="ml-2 text-green-400 font-medium">Active</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Plan:</span>
                                            <span className="ml-2 text-white">Free</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Profile