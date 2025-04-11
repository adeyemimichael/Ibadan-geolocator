import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../../firebaseConfig"; // Ensure db is initialized in firebaseConfig

const Login = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Reset error before attempting login
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Set user data to state
      setUser(user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        createdAt: new Date(), // Optionally, store the creation timestamp
      });
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
