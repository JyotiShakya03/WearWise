
import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-page">
      <section className="privacy-header">
        <p>WEARWISE INFORMATION</p>
        <h1>Privacy Policy</h1>
        <span>
          Your privacy matters to us. Learn how we handle your information.
        </span>
      </section>

      <section className="privacy-content">
        <p className="privacy-updated">Last Updated: November 2026</p>

        <div className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to WearWise. This Privacy Policy explains how our
            website collects, uses and protects information when you
            browse or use our online fashion shopping platform.
          </p>
        </div>

        <div className="privacy-section">
          <h2>2. Information We Collect</h2>
          <p>
            We may collect information such as your name, email address,
            contact number, delivery details, account information and
            order-related information when you use our services.
          </p>
        </div>

        <div className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <p>
            Information may be used to manage customer accounts, process
            orders, provide customer support, improve website
            functionality and communicate important service updates.
          </p>
        </div>

        <div className="privacy-section">
          <h2>4. Data Protection</h2>
          <p>
            We aim to use reasonable security measures to protect
            information from unauthorized access, alteration or
            disclosure.
          </p>
        </div>

        <div className="privacy-section">
          <h2>5. Sharing of Information</h2>
          <p>
            Information may be shared with relevant service providers
            when necessary to support website operations, order
            processing or customer services, subject to applicable
            requirements.
          </p>
        </div>

        <div className="privacy-section">
          <h2>6. Cookies</h2>
          <p>
            Our website may use cookies or similar technologies to
            support essential website functions and improve the browsing
            experience.
          </p>
        </div>

        <div className="privacy-section">
          <h2>7. Third-Party Services</h2>
          <p>
            Our website may contain links or integrations with
            third-party services. Their privacy practices are governed
            by their respective policies.
          </p>
        </div>

        <div className="privacy-section">
          <h2>8. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your
            information, please contact us through our Contact Us page.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
