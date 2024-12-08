import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoginEmail, setUserLoginEmail] = useState(null);

  // Create User function
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Register new user by using google auth
  const registerWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Log In User
  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update Profile
  const updateUserProfile = (name, image) => {
    // setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  // Reset password
  const resetPassword = (email) => {
    // setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // State User or Observ current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // console.log("User State Changed: ", currentUser);
    });
    return () => {
      unSubscribe(); // unsubscribe when component unmounts to avoid memory leak
    };
  }, [user, setUser]);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    logInUser,
    logOut,
    registerWithGoogle,
    updateUserProfile,
    resetPassword,
    userLoginEmail,
    setUserLoginEmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
