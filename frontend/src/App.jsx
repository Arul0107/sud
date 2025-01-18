import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Banner from "./banner/Banner";
import Categories from "./catego/Categories";
import Features from "./feature/Features";
import Cart from "./catego/Cart";
import CartComponent from "./catego/CartComponent ";
import Login from "./Login";
import { auth } from "./firebaseConfig"; // Import Firebase auth

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true); // State for loading

  useEffect(() => {
    // Check user authentication status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User authenticated:", user); // Debugging log
        setIsAuthenticated(true);
      } else {
        console.log("User not authenticated"); // Debugging log
        setIsAuthenticated(false);
      }
      setLoading(false); // Stop loading after auth check
    });

    return () => unsubscribe();
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>; // Show loading state
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Features />
                <Categories />
              </>
            }
          />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcart"
            element={
              <ProtectedRoute>
                <CartComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
