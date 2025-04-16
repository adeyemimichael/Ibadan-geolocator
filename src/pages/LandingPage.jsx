import { useState } from "react";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import VideoSrc from '../assets/Tour Nigeria.mp4'
const LandingPage = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Set the user in the parent component's state
      setUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      // Store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        createdAt: new Date(),
      });

      // Redirect after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  const AnimatedText = ({ text }) => (
    <div className="text-white text-4xl md:text-5xl font-bold flex flex-wrap justify-center text-center">
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={textVariant}
          className="mx-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left: Hero Section */}
      <div className="lg:w-1/2 w-full bg-gradient-to-tr from-green-800 via-emerald-600 to-lime-500 text-white flex items-center justify-center p-8 relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={VideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Floating Effect */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>

        {/* Text Content */}
        <div className="z-10 text-center max-w-xl">
          <AnimatedText text="Welcome to Ibadan Locator" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-gray-100 mt-6 text-lg"
          >
            Discover exciting locations, fun spots, and cultural treasures across Ibadan.
          </motion.p>
        </div>
      </div>

      {/* Right: Login Section */}
      <div className="lg:w-1/2 w-full bg-white flex flex-col items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="w-full max-w-md text-center"
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6">Sign in to continue</h2>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 w-full"
          >
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
