// src/hooks/useAuth.js
import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../firebaseConfig";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInWithGoogle = async (setUser, navigate) => {
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
    } catch (err) {
      console.error("Google Sign-in error:", err);
      setError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithForm = async ({ email, password }, setUser, navigate) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      setUser({
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        uid: user.uid,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Form Sign-in error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    signInWithGoogle,
    signInWithForm,
    setError, // expose for resetting errors in component
  };
};

export default useAuth;
