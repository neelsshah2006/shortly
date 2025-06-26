import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // or use heroicons if preferred

const PasswordInput = ({ id, placeholder, password, setPassword, name }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor={id} className="text-sm text-gray-300">{name}</label>
            <div className="relative">
                <input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 pr-10 rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white focus:outline-none"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
