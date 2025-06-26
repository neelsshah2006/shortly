import QRCodeLib from "qrcode";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../utils/copyToClipboard.util";
import { CrossIcon, QrCodeIcon } from "lucide-react";

const QRCode = ({ setQr, qr, url }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (qr && canvasRef.current) {
            QRCodeLib.toCanvas(canvasRef.current, qr, { width: 256 }, function (error) {
                if (error) console.error(error);
            });
        }
    }, [qr]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return alert("QR Code not ready yet.");

        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "qrcode.png";
            a.click();
            URL.revokeObjectURL(url);
        });
    };

    const handleCopy = async (text, type = "URL") => {
        const success = await copyToClipboard(text);
        if (success) toast.success(`${type} copied to Clipboard`);
        else toast.error(`Failed to Copy to Clipboard`);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            onClick={() => setQr(null)}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 p-8 flex flex-col items-center gap-6 relative max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={() => setQr(null)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-all duration-200 hover:bg-gray-700/50 rounded-full rotate-45"
                    aria-label="Close QR Modal"
                >
                    <CrossIcon />
                </button>

                {/* Header */}
                <div className="text-center">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 inline-block">
                        <QrCodeIcon />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        QR Code
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Scan to access your shortened link
                    </p>
                </div>

                {/* QR Code */}
                <canvas ref={canvasRef} className="rounded bg-white p-2" />
                <button
                    onClick={handleDownload}
                    className="bg-green-500 text-black rounded-xl px-10 py-3 w-full font-mono hover:bg-green-600 transition-all"
                >
                    Download QRCode
                </button>

                {/* Footer */}
                <div className="text-center space-y-3">
                    <p className="text-gray-400 text-sm">
                        Share this QR code to give others instant access to your link
                    </p>
                </div>
            </motion.div>
        </motion.div>

    );
};

export default QRCode;
