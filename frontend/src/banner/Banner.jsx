import React from "react";
import { Carousel, Button } from "antd";
import BannerImage from "../assets/img/banner1.png"; // Ensure the image path is correct
import "./banner.css";

const Banner = () => {
  const carouselRef = React.createRef();

  const nextSlide = () => {
    carouselRef.current.next();
  };

  const prevSlide = () => {
    carouselRef.current.prev();
  };

  const carouselSettings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", color:"black" }}>
        {dots}
      </div>
    ),
    dotsClass: "custom-dots", // Custom dots class for styling
  };

  return (
    <div className="banner-container">
      <Carousel {...carouselSettings} ref={carouselRef}>
        {/* Slide 1 */}
        <div className="banner-slide">
          <img src={BannerImage} alt="Banner 1" className="banner-image" />
          <div className="banner-content">
            <h1 className="banner-title">Discover New Arrivals</h1>
            <h3 className="banner-subtitle">Summer Collection 2023</h3>
            <p className="banner-description">
              Explore the latest trends and timeless styles. Shop our exclusive summer collection tailored just for you.
            </p>
            <div className="banner-buttons">
              <Button type="primary" className="banner-button-primary">
                Shop Women
              </Button>
              <Button type="default" className="banner-button-secondary">
                Shop Men
              </Button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="banner-slide">
          <img src={BannerImage} alt="Banner 2" className="banner-image" />
          <div className="banner-content">
            <h1 className="banner-title">Elevate Your Style</h1>
            <h3 className="banner-subtitle">Winter Collection 2023</h3>
            <p className="banner-description">
              Discover the perfect blend of comfort and elegance with our new winter arrivals.
            </p>
            <div className="banner-buttons">
              <Button type="primary" className="banner-button-primary">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </Carousel>

      {/* Custom Navigation Buttons */}
      <Button className="carousel-nav carousel-prev" onClick={prevSlide}>
        &#10094;
      </Button>
      <Button className="carousel-nav carousel-next" onClick={nextSlide}>
        &#10095;
      </Button>
    </div>
  );
};

export default Banner;
