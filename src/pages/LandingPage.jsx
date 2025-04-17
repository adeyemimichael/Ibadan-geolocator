import { useState } from "react";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import VideoSrc from '../assets/Tour Nigeria.mp4';

import useAuth from "../hooks/useAuth";

const LandingPage = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        createdAt: new Date(),
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { username, email, password } = formData;

    try {
      if (!username || !email || !password) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      // For now, just simulate login
      const simulatedUser = {
        name: username,
        email: email,
        photoURL: null,
        uid: Date.now().toString(),
      };

      setUser(simulatedUser);

      await setDoc(doc(db, "users", simulatedUser.uid), {
        ...simulatedUser,
        createdAt: new Date(),
        method: "form",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Form login error:", err);
      setError("Form login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={VideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
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
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Sign in to continue</h2>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 w-full"
          >
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Form Sign-In */}
          <form onSubmit={handleFormLogin} className="space-y-5">
            <div>
              <label className="block text-left text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 w-full"
            >
              {loading ? "Signing in..." : "Sign in with Form"}
            </button>
            {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
