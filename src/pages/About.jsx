
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <p className="about-subtitle">OUR STORY</p>
        <h1>About WearWise</h1>
        <p>
          Fashion is more than what you wear. It's how you express
          who you are. At WearWise, we believe everyone deserves
          to feel confident, comfortable and stylish.
        </p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <p className="about-subtitle">WHO WE ARE</p>
          <h2>Style That Speaks For You</h2>
          <p>
            WearWise is an online fashion destination created to
            make shopping simple, enjoyable and inspiring.
            We bring together style, quality and convenience
            to help you discover outfits that match your personality.
          </p>
        </div>

        <div className="about-highlight">
          <h2>Our Mission</h2>
          <p>
            To make fashion accessible and help every customer
            find their own style with confidence.
          </p>
        </div>
      </section>

      <section className="about-values">
        <h2>What We Believe In</h2>
        <div className="about-value-grid">
          <div>
            <h3>Quality</h3>
            <p>Fashion choices that value quality and comfort.</p>
          </div>
          <div>
            <h3>Confidence</h3>
            <p>Helping you express your unique personality.</p>
          </div>
          <div>
            <h3>Convenience</h3>
            <p>A smooth and enjoyable online shopping experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
