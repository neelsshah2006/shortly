const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <a href="/" className="flex items-center gap-2 mb-4">
                            <img src="/favicon.png" alt="Shortly Logo" className="w-8 h-8" />
                            <span className="text-xl font-bold">Shortly</span>
                        </a>
                        <p className="text-gray-300 mb-4 max-w-md">
                            The most powerful URL shortener with advanced analytics, custom branding, and enterprise-grade security.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.github.com/neelsshah2006/" className="text-gray-400 hover:text-white transition-colors">
                                <img className="invert" width={30} src="/github.svg" alt="Github" />
                            </a>
                            <a href="https://www.linkedin.com/in/neelsshah2006/" className="text-gray-400 hover:text-white transition-colors">
                                <img className="invert" width={30} src="/linkedin.svg" alt="LinkedIn" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <p className="text-gray-400 text-sm">
                                © {currentYear} Shortly.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <a
                                href="https://www.flaticon.com/free-icons/url"
                                title="url icons"
                                className="text-gray-500 text-xs hover:text-gray-400 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Logo by Karacis - Flaticon
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer