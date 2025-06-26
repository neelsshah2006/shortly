import { motion } from "framer-motion";

const ChartCard = ({
    delay = 0.2,
    icon,
    title,
    gradientClasses,
    borderClasses,
    children,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={`group relative bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border ${borderClasses} overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]`}
        >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 ${gradientClasses}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${gradientClasses} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-gray-100 transition-colors duration-300">{title}</h4>
                </div>

                {/* Chart container with enhanced styling */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-lg pointer-events-none"></div>
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default ChartCard;
