import React, { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Grid, Space, Avatar, Dropdown } from "antd";
import { MenuOutlined, HeartOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import logo from "../assets/img/logo.png";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const Navbar = () => {
  const screens = useBreakpoint(); // Ant Design's responsive hook
  const [drawerVisible, setDrawerVisible] = useState(false); // State for Drawer visibility
  const [user, setUser] = useState(null); // State for authenticated user
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set authenticated user
      } else {
        setUser(null); // Clear user when logged out
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/login"); // Redirect to login page on logout
    });
  };

  const menuItems = [
    { key: "1", label: "New & Featured", path: "/" },
    { key: "2", label: "Silk", path: "/silk" },
    { key: "3", label: "Cotton", path: "/cotton" },
    { key: "4", label: "Kids", path: "/kids" },
    { key: "5", label: "Designer", path: "/designer" },
    { key: "6", label: "Bridal", path: "/bridal" },
  ];

  const dropdownMenu = (
    <Menu style={{ minWidth: "120px", textAlign: "center" }}>
      <Menu.Item key="1" onClick={handleLogout} style={{ fontWeight: "bold" }}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo Section */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginLeft: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo} // Replace with your logo
            alt="Logo"
            style={{ height: "64px", marginTop: "18px" }}
          />
        </div>

        {/* Menu Section (Desktop Only) */}
        {screens.md && (
          <Menu
            mode="horizontal"
            style={{
              borderBottom: "none",
              fontSize: "16px",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        )}

        {/* Icons Section (Desktop Only) */}
        {screens.md && (
          <Space size="large" style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
            <HeartOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
            <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
            {user ? (
              <Dropdown overlay={dropdownMenu} trigger={["click"]}>
                <Avatar
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </Dropdown>
            ) : (
              <UserOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => navigate("/login")} // Redirect to login page
              />
            )}
          </Space>
        )}

        {/* Hamburger Menu for Mobile */}
        {!screens.md && (
          <MenuOutlined
            onClick={() => setDrawerVisible(true)}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
        )}
      </Header>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu mode="vertical">
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </Layout>
  );
};

export default Navbar;
