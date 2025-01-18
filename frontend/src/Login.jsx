import React, { useEffect } from "react";
import { auth, provider } from "./firebaseConfig"; // Firebase configuration
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import google from './assets/gg.png'
const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User already logged in:", user);
        navigate("/"); // Redirect to homepage if authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      localStorage.setItem("user", JSON.stringify(result.user)); // Store user info locally
      navigate("/"); // Redirect to homepage after successful login
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Notify Find</h1>
      <p style={styles.subtitle}>Sign in to access your account</p>
      <button onClick={handleGoogleLogin} style={styles.googleButton}>
        <img
          src={google}
          alt="Google Icon"
          style={styles.googleIcon}
        />
        Continue with Google
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f8fc",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#555",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4285F4",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  googleIcon: {
    height: "20px",
    marginRight: "10px",
  },
};

export default Login;
