import { useContext, createContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithRedirect } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

import { useRouter } from "next/navigation";

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const githubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider);

  }

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const xLogin = () => {
    const provider = new TwitterAuthProvider();
    //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider);
  };

  const emailAndPasswordRegister = async (firstName, lastName, email, password) => {
    //createUserWithEmailAndPassword(auth, email, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`
        });
        setUser({ ...userCredential.user, displayName: `${firstName} ${lastName}` });

        sendEmailVerification(userCredential.user).then(() => {
          console.log('Email verification sent');
        });
        signOut(auth); //sign out user after email verification sent
    }
    catch (error) {
      console.log(error.message);
    }
  };

  const logOut = () => {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });

      return () => unsubscribe();
    }, []);

  return (
    <AuthContext.Provider value={ { user, emailAndPasswordRegister, githubLogin, googleLogin, logOut, xLogin} }>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}