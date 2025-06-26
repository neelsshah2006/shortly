import { motion } from "framer-motion";

const LoadingSpinner = ({
    size = 'md',
    color = 'blue',
    text = '',
    fullScreen = false,
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const colorClasses = {
        blue: 'border-blue-600',
        purple: 'border-purple-600',
        green: 'border-green-600',
        red: 'border-red-600',
        gray: 'border-gray-600'
    };

    const spinner = (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className={`${sizeClasses[size]} border-2 border-gray-700 ${colorClasses[color]} border-t-transparent rounded-full`}
            />
            {text && (
                <p className="mt-3 text-sm text-gray-300">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
};

// Skeleton loader component
export const SkeletonLoader = ({
    lines = 3,
    height = 'h-4',
    className = '',
    animated = true
}) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
                <div
                    key={index}
                    className={`${height} bg-gray-700 rounded ${animated ? 'animate-pulse' : ''
                        } ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
                />
            ))}
        </div>
    );
};

// Card skeleton
export const CardSkeleton = ({ className = '' }) => {
    return (
        <div className={`bg-gray-800 rounded-lg shadow p-6 ${className}`}>
            <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                </div>
                <div className="mt-4 flex space-x-2">
                    <div className="h-8 bg-gray-700 rounded w-20"></div>
                    <div className="h-8 bg-gray-700 rounded w-16"></div>
                </div>
            </div>
        </div>
    );
};

// Table skeleton
export const TableSkeleton = ({ rows = 5, columns = 4, className = '' }) => {
    return (
        <div className={`bg-gray-800 rounded-lg shadow overflow-hidden ${className}`}>
            <div className="animate-pulse">
                {/* Header */}
                <div className="bg-gray-700 px-6 py-3">
                    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                        {Array.from({ length: columns }).map((_, index) => (
                            <div key={index} className="h-4 bg-gray-600 rounded"></div>
                        ))}
                    </div>
                </div>

                {/* Rows */}
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="px-6 py-4 border-b border-gray-700">
                        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`h-4 bg-gray-700 rounded ${colIndex === columns - 1 ? 'w-3/4' : 'w-full'
                                        }`}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSpinner;
