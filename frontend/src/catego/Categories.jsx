import React from "react";
import { Card, Button, Row, Col, Typography, Carousel } from "antd";
import { useNavigate } from "react-router-dom";
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

import { EyeOutlined, HeartOutlined } from "@ant-design/icons";
import "./categorie.css"; // Use your existing CSS file

const { Meta } = Card;
const { Title, Text } = Typography;

export default function Categories() {
  const navigate = useNavigate();

  const sarees = [
    {
      id: 1,
      type: "Silk Saree",
      description: "Elegant and luxurious silk saree",
      price: "Rs. 120",
      images: [silk, silk1, silk2, silk3],
    },
    {
      id: 2,
      type: "Cotton Saree",
      description: "Comfortable and breathable cotton saree",
      price: "Rs. 80",
      images: [cotton, cotton1, cotton2],
    },
    {
      id: 3,
      type: "Designer Saree",
      description: "Exclusive designer saree for special occasions",
      price: "Rs. 200",
      images: [designer, designer1, designer2],
    },
  ];

  return (
    <div className="categories-container" style={{ padding: "20px" }}>
      <div className="categories-header" style={{ marginBottom: "30px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "10px" }}>
          Explore Saree Collections
        </Title>
        <Text type="secondary" style={{ textAlign: "center", display: "block" }}>
          Discover our exclusive range of sarees for every occasion!
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {sarees.map((saree) => (
          <Col key={saree.id} xs={24} sm={12} md={8}>
            <Card
              className="saree-card"
              hoverable
              style={{ borderRadius: "8px", overflow: "hidden" }}
              cover={
                <Carousel autoplay>
                  {saree.images.map((image, i) => (
                    <img
                      key={i}
                      alt={saree.type}
                      src={image}
                      className="saree-image"
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderBottom: "1px solid #ddd",
                      }}
                      onClick={() => navigate(`/cart?productId=${saree.id}`)}
                    />
                  ))}
                </Carousel>
              }
            >
              <Meta
                title={
                  <Text
                    className="saree-title"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      display: "block",
                    }}
                  >
                    {saree.type}
                  </Text>
                }
                description={
                  <>
                    <Text
                      className="saree-description"
                      style={{ fontSize: "14px", color: "#777", display: "block" }}
                    >
                      {saree.description}
                    </Text>
                    <Text
                      className="saree-price"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#1890ff",
                        display: "block",
                        marginTop: "10px",
                      }}
                    >
                      {saree.price}
                    </Text>
                  </>
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card's click event
                    navigate(`/cart?productId=${saree.id}`);
                  }}
                >
                  View Product
                </Button>
                <div>
                  <HeartOutlined style={{ fontSize: "18px", marginRight: "10px", color: "#ff4d4f" }} />
                  <EyeOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
