import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Typography, Button, Tabs, Divider } from "antd";
import "./cart.css";

// Mock images
import silk from "../assets/img/product/silk/slik.png";
import silk1 from "../assets/img/product/silk/slik1.png";
import silk2 from "../assets/img/product/silk/slik2.png";
import silk3 from "../assets/img/product/silk/slik3.png";

import cotton from "../assets/img/product/cotton/cotton.png";
import cotton1 from "../assets/img/product/cotton/cotton1.png";
import cotton2 from "../assets/img/product/cotton/cotton2.png";

import designer from "../assets/img/product/design/designer.png";
import designer1 from "../assets/img/product/design/designer1.png";
import designer2 from "../assets/img/product/design/designer2.png";

const { Title, Text } = Typography;

const Cart = () => {
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("productId");

  // Mock product data
  const products = [
    {
      id: "1",
      type: "Silk Saree",
      description:
        "Elegant and luxurious silk saree perfect for special occasions. Made with 100% silk for ultimate comfort and style.",
      price: "Rs. 120",
      images: [silk, silk1, silk2, silk3],
      details: {
        information: [
          "Cutaway collar",
          "Front button fastening",
          "Chest patch pocket",
          "Long sleeves",
        ],
        baseFabric: "100% Silk",
        wearing: "Model is 1.8 m wearing size M",
        care: ["Machine wash", "Do not bleach", "Iron at low heat"],
      },
      sizeGuide: [
        { size: "XS", chest: "32-34", waist: "25-27", hip: "32.5-34.5" },
        { size: "S", chest: "34-36", waist: "27-29", hip: "34.5-36.5" },
        { size: "M", chest: "36-38", waist: "29-31", hip: "36.5-38.5" },
        { size: "L", chest: "38-40", waist: "31-33", hip: "38.5-40.5" },
        { size: "XL", chest: "40-42", waist: "33-35", hip: "40.5-42.5" },
        { size: "XXL", chest: "42-44", waist: "35-37", hip: "42.5-44.5" },
      ],
    },
    {
      id: "2",
      type: "Cotton Saree",
      description: "Comfortable and breathable cotton saree.",
      price: "Rs. 80",
      images: [cotton, cotton1, cotton2],
      details: {
        information: [
          "Soft fabric",
          "Lightweight and breathable",
          "Available in various colors",
        ],
        baseFabric: "100% Cotton",
        wearing: "Model is 1.7 m wearing size S",
        care: ["Machine wash", "Do not tumble dry", "Iron at medium heat"],
      },
      sizeGuide: [
        { size: "XS", chest: "32-34", waist: "25-27", hip: "32.5-34.5" },
        { size: "S", chest: "34-36", waist: "27-29", hip: "34.5-36.5" },
        { size: "M", chest: "36-38", waist: "29-31", hip: "36.5-38.5" },
        { size: "L", chest: "38-40", waist: "31-33", hip: "38.5-40.5" },
        { size: "XL", chest: "40-42", waist: "33-35", hip: "40.5-42.5" },
        { size: "XXL", chest: "42-44", waist: "35-37", hip: "42.5-44.5" },
      ],
    },
    {
      id: "3",
      type: "Designer Saree",
      description: "Exclusive designer saree for special occasions.",
      price: "Rs. 200",
      images: [designer, designer1, designer2],
      details: {
        information: [
          "Exclusive design",
          "Handcrafted details",
          "Perfect for weddings",
        ],
        baseFabric: "Mixed Fabric",
        wearing: "Model is 1.8 m wearing size M",
        care: ["Dry clean only", "Avoid direct sunlight"],
      },
      
    },
  ];

  const product = products.find((p) => p.id === productId);
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    notification.success({
      message: "Success",
      description: `${product.type} has been added to your cart.`,
      placement: "topRight",
    });
    navigate("/addcart"); // Navigate to the cart page
  };
  const [activeImage, setActiveImage] = useState(
    product ? product.images[0] : ""
  );
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Title level={4}>Product not found!</Title>
        <Text>
          It seems like the product you are looking for does not exist.
        </Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[24, 24]}>
        {/* Left Column - Thumbnails */}
        <Col
          xs={4}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.type} Thumbnail ${index + 1}`}
              style={{
                width: "60px",
                height: "80px",
                cursor: "pointer",
                borderRadius: "4px",
                border:
                  activeImage === image
                    ? "2px solid #1890ff"
                    : "1px solid #ddd",
                objectFit: "cover",
              }}
              onClick={() => setActiveImage(image)}
            />
          ))}
        </Col>

        {/* Center Column - Main Image */}
        <Col xs={12}>
          <img
            src={activeImage}
            alt={`${product.type} Main`}
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "800px",
              borderRadius: "8px",
              objectFit: "cover",
              border: "1px solid #ddd",
            }}
          />
        </Col>

        {/* Right Column - Product Details */}
        <Col xs={8}>
          <Title level={3}>{product.type}</Title>
          <Text
            style={{ fontSize: "16px", display: "block", marginBottom: "16px" }}
          >
            {product.description}
          </Text>
          <Text
            strong
            style={{
              fontSize: "20px",
              display: "block",
              marginBottom: "16px",
              color: "#1890ff",
            }}
          >
            Price: {product.price}
          </Text>

          {/* Quantity Selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Button className="quantity-btn" onClick={decreaseQuantity}>
              -
            </Button>
            <Text className="quantity-display" style={{ margin: "0 10px" }}>
              {quantity}
            </Text>
            <Button className="quantity-btn" onClick={increaseQuantity}>
              +
            </Button>
          </div>

          {/* Add Buttons */}
          <div style={{ marginBottom: "24px" }}>
            <Button className="btn-add-to-cart" style={{ marginRight: "10px" }} onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button className="btn-buy-now">Buy Now</Button>
          </div>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Tabs
        defaultActiveKey="1"
        className="product-tabs"
        style={{ marginTop: "40px" }}
      >
        <Tabs.TabPane tab="Description" key="1">
          <Text>{product.description}</Text>
          <Row
            gutter={[16, 16]}
            style={{ marginTop: "20px", paddingLeft: "20px" }}
          >
            <Col xs={4}>
              <Title level={5}>Information</Title>
              <ul className="info-list">
                {product.details.information.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </Col>
            <Col xs={4}>
              <Title level={5}>Base Fabric</Title>
              <Text>
                <p className="fabric-list">{product.details.baseFabric}</p>
              </Text>
            </Col>
            <Col xs={4}>
              <Title level={5}>Wearing</Title>
              <Text>
                {" "}
                <p className="wearing-list">{product.details.wearing}</p>
              </Text>
            </Col>
            <Col xs={4}>
              <Title level={5}>Care</Title>
              <ul className="care-list">
                {product.details.care.map((care, index) => (
                  <li key={index}>{care}</li>
                ))}
              </ul>
            </Col>
            <Col
              xs={4}
              style={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.type} Thumbnail ${index + 1}`}
                  style={{
                    width: "60px",
                    height: "80px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    border:
                      activeImage === image
                        ? "2px solid #1890ff"
                        : "1px solid #ddd",
                    objectFit: "cover",
                  }}
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </Col>
          </Row>
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="Size Guide" key="2">
    <div className="size-guide-container">
      <table className="size-guide-table">
        <thead>
          <tr>
            <th>Size</th>
            <th>Chest (IN)</th>
            <th>Waist (IN)</th>
            <th>Hip (IN)</th>
          </tr>
        </thead>
        <tbody>
          {product.sizeGuide.map((row, index) => (
            <tr key={index}>
              <td>{row.size}</td>
              <td>{row.chest}</td>
              <td>{row.waist}</td>
              <td>{row.hip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Tabs.TabPane>


        <Tabs.TabPane tab="Reviews" key="3">
          <Text>No reviews yet.</Text>
        </Tabs.TabPane>
      </Tabs>

      <Divider className="divider-cart" />
    </div>
  );
};

export default Cart;
