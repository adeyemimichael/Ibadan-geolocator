
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

// 1. Create context
const AuthContext = createContext();

// 2. Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);        
    });
    return unsubscribe;
  }, []);

  const signOut = async () => {
    const auth = getAuth();
    await firebaseSignOut(auth);
    
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {user === undefined ? <div>Loading auth…</div> : children}
    </AuthContext.Provider>
  );
};

// 3. Hook to consume
export const useAuth = () => useContext(AuthContext);
