import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Password = ({
    showPassword,
    setShowPassword,
    value,
    handlePwChange,
    mutable,
    pwSaving,
    label,
    name,
    placeholder
}) => {
    const handleContainerClick = (e) => {
        const input = e.currentTarget.querySelector("input");
        if (input?.disabled && !mutable) {
            toast.error("You can't change password for Google Authenticated Accounts");
        } else if (input?.disabled) {
            toast.warn("Password can't be changed while updation in progress...");
        }
    };

    return (
        <div className="relative" onClick={handleContainerClick}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <input
                type={showPassword ? "text" : "password"}
                name={name}
                value={value}
                onChange={handlePwChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white transition-all duration-200 disabled:bg-gray-500"
                disabled={!mutable || pwSaving}
                placeholder={placeholder}
            />
            <div className="flex justify-center items-center absolute top-4/7 right-3 transform">
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-400 hover:text-white focus:outline-none"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
};

export default Password;
