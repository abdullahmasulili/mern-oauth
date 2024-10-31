import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { auth } from "./FirebaseConfig";

async function handleLoginWithEmailAndPassword(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const firebaseToken = await userCredential.user.getIdToken();
  const response = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firebaseToken }),
  });

  if (!response.ok) {
    throw new Error({ message: "Failed to authenticate user" });
  }

  const resData = await response.json();

  try {
    return Promise.resolve({
      type: "AUTHORIZED",
      message: "Login Succeed",
      data: resData,
    });
  } catch (err) {
    return Promise.reject({
      type: "UNAUTHORIZED",
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
    const response = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebaseToken, firstName, lastName }),
    });

    if (!response.ok) {
      throw new Error({ message: "Failed to register user" });
    }

    const resData = await response.json();

    return Promise.resolve({
      type: "AUTHORIZED",
      message: "Register Succeed",
      data: resData,
    });
  } catch (err) {
    return Promise.reject({
      type: "UNAUTHORIZED",
      message: err.message,
    });
  }
}

async function handleGoogleSignUp() {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseToken = await userCredential.user.getIdToken();
    const response = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebaseToken }),
    });

    if (!response.ok) {
      throw new Error({
        message: "Failed to register user using google account",
      });
    }

    const resData = await response.json();

    return Promise.resolve({
      type: "AUTHORIZED",
      message: "Register with google succeed",
      data: resData,
    });
  } catch (err) {
    return Promise.reject({
      type: "UNAUTHORIZED",
      message: err.message,
    });
  }
}

async function handleFacebookSignUp() {
  const provider = new FacebookAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseToken = await userCredential.user.getIdToken();
    const response = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebaseToken }),
    });

    if (!response.ok) {
      throw new Error({
        message: "Failed to register user with facebook account",
      });
    }

    const resData = await response.json();

    return Promise.resolve({
      type: "AUTHORIZED",
      message: "Register with facebook succeed",
      data: resData,
    });
  } catch (err) {
    return Promise.reject({
      type: "UNAUTHORIZED",
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
