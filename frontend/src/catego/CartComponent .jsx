import React, { useState } from "react";
import { Row, Col, Typography, Button, Input, Radio, Divider, notification } from "antd";

const { Title, Text } = Typography;

const CartComponent = ({ productDetails }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    notification.success({
      message: "Success",
      description: `${product.type} added to your cart.`,
      placement: "topRight",
    });
  };

  const handleQuantityChange = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(10);
    } else {
      setDiscount(0);
      notification.error({ message: "Invalid Coupon Code" });
    }
  };

  const handleShippingChange = (e) => setShipping(parseInt(e.target.value, 10));

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal - discount + shipping;

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Shopping Cart</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          {cartItems.length === 0 ? (
            <Text>Your cart is empty.</Text>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                      {item.quantity}
                      <Button onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                    </td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Divider />
          <Button danger onClick={() => setCartItems([])}>
            Empty Cart
          </Button>
        </Col>

        <Col xs={24} md={8}>
          <div style={{ padding: "20px", border: "1px solid #ddd" }}>
            <Title level={4}>Cart Summary</Title>
            <Text>Subtotal: ${subtotal}</Text>
            <Radio.Group onChange={handleShippingChange}>
              <Radio value={0}>Free Shipping</Radio>
              <Radio value={5}>Local Pickup ($5)</Radio>
              <Radio value={10}>Flat Rate ($10)</Radio>
            </Radio.Group>
            <Divider />
            <Input
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <Button onClick={handleApplyCoupon}>Apply Coupon</Button>
            <Divider />
            <Title level={4}>Total: ${total}</Title>
            <Button type="primary" block>
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartComponent;
