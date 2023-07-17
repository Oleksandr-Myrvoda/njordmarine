import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { app } from './firebaseConfig';
import { GoogleAuthProvider } from 'firebase/auth';

const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    const googleAuthProvider = new GoogleAuthProvider();
    const unsub = auth.onAuthStateChanged(isUser => {
      if (isUser != null) {
        return setUser(isUser);
      }
      signInWithPopup(auth, googleAuthProvider)
        .then(credentials => setUser(credentials.user))
        .catch(e => console.error(e));
    });
    return unsub;
  }, [auth]);

  return user != null ? <div>{user.displayName}</div> : <div>Loading</div>;
};

export default AuthProvider;
