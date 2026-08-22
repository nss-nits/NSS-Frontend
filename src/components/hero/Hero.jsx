import React from "react";
import "./hero.css";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const Hero = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="slider">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        
        <Carousel.Item>
          <img
            className="d-block w=100"
            src="https://res.cloudinary.com/dgq4nmdgz/image/upload/v1742197090/moqjthevaz9ow7ofhn6h.jpg"
            alt="fourth"
          />
          <Carousel.Caption>
            <h2>Republic Day</h2>
            <p>
              NSS NIT Silchar's Republic Day Parade.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w=100"
            src="https://res.cloudinary.com/dgq4nmdgz/image/upload/v1742196979/scocdpjbye7eonrxxpdu.jpg"
            alt="third"
          />
          <Carousel.Caption>
            <h2>Diwali Donation Drive</h2>
            <p>
              NSS NIT Silchar's donation drive enriching young minds with the
              gift of learning.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dgq4nmdgz/image/upload/v1742196763/yilppszyqagdgcpe54oa.jpg"
            alt="second"
          />
          <Carousel.Caption>
            <h2>Speaker Session</h2>
            <p>
              NSS NIT Silchar step for awareness about Voluntary Blood Donation.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/dgq4nmdgz/image/upload/v1742197331/ufmuws8qlqreibmkq7md.jpg"
          alt="fifth"
        />
        <Carousel.Caption>
          <h2>Village Survey</h2>
          <p>
            NSS NIT Silchar conducts' a village survey
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </div>
  );
};

export default Hero;
