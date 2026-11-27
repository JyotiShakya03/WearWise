
import React from "react";
import "./FAQs.css";

const faqs = [
  {
    question: "What is WearWise?",
    answer:
      "WearWise is an online fashion shopping platform where you can explore and shop for stylish outfits."
  },
  {
    question: "How can I place an order?",
    answer:
      "Browse our products, add your favourite items to the cart and proceed to checkout."
  },
  {
    question: "Can I try outfits virtually?",
    answer:
      "Yes! WearWise offers an AI-powered Virtual Try-On feature that lets you preview outfits."
  },
  {
    question: "How can I track my order?",
    answer:
      "You can check your order details and status through your account."
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Please refer to our Returns and Refunds policy for information about return and exchange eligibility."
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Visit our Contact Us page and submit the contact form. Our team will assist you."
  }
];

const FAQs = () => {
  return (
    <div className="faqs-page">
      <section className="faqs-header">
        <p>WEARWISE SUPPORT</p>
        <h1>Frequently Asked Questions</h1>
        <span>Find answers to common questions about shopping with us.</span>
      </section>

      <section className="faqs-container">
        {faqs.map((faq, index) => (
          <details className="faq-item" key={index}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
    </div>
  );
};

export default FAQs;
