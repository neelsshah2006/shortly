import "../styles/globals.css";
import NavBar from "../components/static/NavBar";
import Footer from "../components/static/Footer";
import { AuthProvider } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavBar />
      <div className="min-h-[80vh] w-full flex flex-col">
        <Component {...pageProps} />
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#1f2937",
          color: "#f9fafb",
          border: "1px solid #374151",
        }}
      />
    </AuthProvider>
  );
}

export default MyApp;
