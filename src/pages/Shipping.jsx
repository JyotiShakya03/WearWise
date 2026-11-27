
import React from "react";
import "./Shipping.css";

const Shipping = () => {
  return (
    <div className="shipping-page">
      <section className="shipping-header">
        <p>WEARWISE CUSTOMER CARE</p>
        <h1>Shipping Information</h1>
        <span>Everything you need to know about our delivery process.</span>
      </section>

      <section className="shipping-content">
        <div className="shipping-card">
          <h2>Order Processing</h2>
          <p>
            Once your order is placed successfully, it will be processed
            and prepared for dispatch. Processing time may vary depending
            on product availability.
          </p>
        </div>

        <div className="shipping-card">
          <h2>Delivery Time</h2>
          <p>
            Estimated delivery time depends on your location and the
            shipping partner. You can check your order status through
            your account.
          </p>
        </div>

        <div className="shipping-card">
          <h2>Shipping Charges</h2>
          <p>
            Applicable shipping charges, if any, will be displayed
            during checkout before you confirm your order.
          </p>
        </div>

        <div className="shipping-card">
          <h2>Order Tracking</h2>
          <p>
            Once tracking information is available, you can use your
            account to check the latest status of your order.
          </p>
        </div>

        <div className="shipping-card">
          <h2>Delivery Issues</h2>
          <p>
            If your order is delayed or you face any delivery-related
            issue, please contact our support team through the Contact Us page.
          </p>
        </div>
      </section>

      <div className="shipping-help">
        <h2>Need Help With Your Order?</h2>
        <p>Our team is here to help you with your shopping experience.</p>
        <a href="/contact">Contact Us</a>
      </div>
    </div>
  );
};

export default Shipping;
