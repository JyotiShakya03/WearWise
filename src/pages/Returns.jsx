
import React from "react";
import "./Returns.css";

const Returns = () => {
  return (
    <div className="returns-page">
      <section className="returns-header">
        <p>WEARWISE CUSTOMER CARE</p>
        <h1>Returns & Refunds</h1>
        <span>
          Your satisfaction matters to us. Find out how returns and refunds work.
        </span>
      </section>

      <section className="returns-content">
        <div className="returns-card">
          <h2>Return Policy</h2>
          <p>
            If you are not satisfied with your purchase, you may request
            a return subject to the applicable return conditions and
            eligibility of the product.
          </p>
        </div>

        <div className="returns-card">
          <h2>How to Request a Return</h2>
          <p>
            Contact our customer support team through the Contact Us page
            with your order details and reason for return. Our team will
            guide you through the process.
          </p>
        </div>

        <div className="returns-card">
          <h2>Refund Process</h2>
          <p>
            Once an eligible returned product is received and inspected,
            the refund request will be processed. The time taken for the
            refund to reflect may depend on your payment provider.
          </p>
        </div>

        <div className="returns-card">
          <h2>Damaged or Incorrect Products</h2>
          <p>
            If you receive a damaged, defective or incorrect product,
            please contact us with your order details and supporting
            photographs so our team can assist you.
          </p>
        </div>

        <div className="returns-card">
          <h2>Non-Returnable Products</h2>
          <p>
            Certain products may not be eligible for return due to
            hygiene, product condition or other applicable restrictions.
            Please check the product details before placing an order.
          </p>
        </div>

        <div className="returns-card">
          <h2>Need Assistance?</h2>
          <p>
            For questions about returns, exchanges or refunds, reach out
            to our customer support team through our Contact Us page.
          </p>
        </div>
      </section>

      <div className="returns-help">
        <h2>We're Here to Help!</h2>
        <p>Have a question about your order or refund?</p>
        <a href="/contact">Contact Us</a>
      </div>
    </div>
  );
};

export default Returns;
