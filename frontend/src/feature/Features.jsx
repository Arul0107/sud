import React from "react";
import { Row, Col } from "antd";
import "./features.css";
import Shipping from '../assets/img/feture/ship.png'
import care from '../assets/img/feture/care.png'
import secure from '../assets/img/feture/sec.png'
const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <img
          src={Shipping} // Replace with the correct icon URL or SVG
          alt="Free Shipping"
          className="feature-icon-image"
        />
      ),
      title: "Free Shipping & Return",
      description: "Free shipping for all orders over $130",
    },
    {
      icon: (
        <img
          src={care} // Replace with the correct icon URL or SVG
          alt="Customer Support"
          className="feature-icon-image"
        />
      ),
      title: "Customer Support 24/7",
      description: "Instant access to perfect support everyday",
    },
    {
      icon: (
        <img
          src={secure} // Replace with the correct icon URL or SVG
          alt="Secure Payment"
          className="feature-icon-image"
        />
      ),
      title: "100% Secure Payment",
      description: "We ensure secure payment for customers",
    },
  ];

  return (
    <div className="features-section">
      <Row gutter={[32, 32]} justify="center" align="middle">
        {features.map((feature, index) => (
          <Col key={index} xs={24} sm={8} className="feature-item">
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-title">
                <p>{feature.title}</p>
                <p className="feature-description">{feature.description}</p>
            </div>
          </Col>
        ))}
      </Row>
      <hr />

    </div>
  );
};

export default FeaturesSection;
