import React, { useEffect } from 'react';
import Link from 'next/link';

const NotFound = () => {
    // Set the document title for the Not Found page
    useEffect(() => {
        document.title = "Page Not Found - Shortly";
    })
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 text-white">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link href="/" className="px-6 py-3 bg-blue-600 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Go Home</Link>
        </div>
    );
};

export default NotFound; 