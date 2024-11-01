import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { auth } from "./FirebaseConfig";
import { AUTH_STATUS } from "./Constants";
import { handleAuth } from "./Http";

async function handleLoginWithEmailAndPassword(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const firebaseToken = await userCredential.user.getIdToken();
  const userData = await handleAuth({ firebaseToken });

  userData.accessToken = firebaseToken;

  try {
    return Promise.resolve({
      type: AUTH_STATUS.AUTHORIZED,
      message: "Login Succeed",
      data: userData,
    });
  } catch (err) {
    return Promise.reject({
      type: AUTH_STATUS.UNAUTHORIZED,
      message: err.message,
    });
  }
}

async function handleRegisterWithEmailAndPassword(
  email,
  password,
  firstName,
  lastName
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseToken = await userCredential.user.getIdToken();

    const userData = await handleAuth({
      firebaseToken,
      firstName,
      lastName,
      provider: "email",
    });

    userData.accessToken = firebaseToken;

    return Promise.resolve({
      type: AUTH_STATUS.AUTHORIZED,
      message: "Register Succeed",
      data: userData,
    });
  } catch (err) {
    return Promise.reject({
      type: AUTH_STATUS.UNAUTHORIZED,
      message: err.message,
    });
  }
}

async function handleGoogleSignUp() {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseToken = await userCredential.user.getIdToken();
    const userData = await handleAuth({ firebaseToken, provider: "google" });

    userData.accessToken = firebaseToken;

    return Promise.resolve({
      type: AUTH_STATUS.AUTHORIZED,
      message: "Register with google succeed",
      data: userData,
    });
  } catch (err) {
    return Promise.reject({
      type: AUTH_STATUS.UNAUTHORIZED,
      message: err.message,
    });
  }
}

async function handleFacebookSignUp() {
  const provider = new FacebookAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseToken = await userCredential.user.getIdToken();
    const userData = await handleAuth({ firebaseToken, provider: "facebook" });

    userData.accessToken = firebaseToken;

    return Promise.resolve({
      type: AUTH_STATUS.AUTHORIZED,
      message: "Register with facebook succeed",
      data: userData,
    });
  } catch (err) {
    return Promise.reject({
      type: AUTH_STATUS.UNAUTHORIZED,
      message: err.message,
    });
  }
}

async function handleLogout() {
  return await signOut(auth);
}

export {
  handleLoginWithEmailAndPassword,
  handleRegisterWithEmailAndPassword,
  handleGoogleSignUp,
  handleFacebookSignUp,
  handleLogout,
};
