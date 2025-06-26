import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = ({ text = "Loading page..." }) => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center z-50">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <motion.img
                            src="/favicon.png"
                            alt="Shortly Logo"
                            className="w-12 h-12"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Shortly
                        </h1>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border-4 border-gray-700 border-t-blue-600 rounded-full mx-auto"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 border-4 border-gray-600 border-t-purple-600 rounded-full"
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <p className="text-lg text-gray-300 mb-2">
                        {text}
                    </p>
                    <div className="flex justify-center space-x-1">
                        {[0, 1, 2].map((index) => (
                            <motion.div
                                key={index}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: index * 0.2
                                }}
                                className="w-2 h-2 bg-blue-500 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    transition={{ delay: 0.6, duration: 2 }}
                    className="mt-8 mx-auto max-w-xs"
                >
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        />
                    </div>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-6 text-sm text-gray-400"
                >
                    Preparing your experience...
                </motion.p>
            </div>
        </div>
    );
};

export default PageLoader;
