
import React from "react";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="terms-page">
      <section className="terms-header">
        <p>WEARWISE INFORMATION</p>
        <h1>Terms & Conditions</h1>
        <span>
          Please read these terms before using our website.
        </span>
      </section>

      <section className="terms-content">
        <p className="terms-updated">Last Updated: November 2026</p>

        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the WearWise website, you agree to
            follow these Terms and Conditions. If you do not agree,
            please discontinue using the website.
          </p>
        </div>

        <div className="terms-section">
          <h2>2. Website Usage</h2>
          <p>
            You agree to use WearWise only for lawful purposes and
            not engage in activities that may damage, disrupt or
            interfere with the website or its services.
          </p>
        </div>

        <div className="terms-section">
          <h2>3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality
            of your account credentials and for activities performed
            through your account.
          </p>
        </div>

        <div className="terms-section">
          <h2>4. Products and Pricing</h2>
          <p>
            We aim to display accurate product descriptions, images
            and prices. However, occasional errors or changes may
            occur. Product availability and prices may change
            without prior notice.
          </p>
        </div>

        <div className="terms-section">
          <h2>5. Orders and Payments</h2>
          <p>
            Orders are subject to product availability and successful
            order confirmation. Applicable payment and checkout
            conditions will be displayed during the ordering process.
          </p>
        </div>

        <div className="terms-section">
          <h2>6. Shipping and Returns</h2>
          <p>
            Orders are handled according to the applicable shipping,
            returns and refund policies available on the WearWise
            website.
          </p>
        </div>

        <div className="terms-section">
          <h2>7. Intellectual Property</h2>
          <p>
            Website content, branding, designs, text, graphics and
            other materials are protected by applicable intellectual
            property laws and may not be copied or reused without
            appropriate permission.
          </p>
        </div>

        <div className="terms-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            WearWise will make reasonable efforts to maintain website
            availability and accuracy. To the extent permitted by
            applicable law, we are not responsible for indirect
            losses arising from website use.
          </p>
        </div>

        <div className="terms-section">
          <h2>9. Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions when required.
            Updated terms will be published on this page.
          </p>
        </div>

        <div className="terms-section">
          <h2>10. Contact Information</h2>
          <p>
            If you have questions regarding these terms, please
            contact us through the Contact Us page.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Terms;
