
import { useState } from "react";
import "./Contact.css";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send message."
        );
      }

      setSuccessMessage(data.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error("Contact Form Error:", error);
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">

      <div className="contact-heading">
        <p className="section-eyebrow">WE'RE HERE FOR YOU</p>
        <h1>Get in Touch</h1>
        <p>
          Have a question or need assistance?
          We'd love to hear from you.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <p className="contact-label">
            CONTACT INFORMATION
          </p>

          <h2>
            Let's make your shopping experience better.
          </h2>

          <p className="contact-description">
            Whether you need help with an order, our products
            or virtual try-on, our team is here to help.
          </p>

          <div className="contact-detail">
            <Mail />
            <div>
              <h4>Email</h4>
              <p>support@wearwise.com</p>
            </div>
          </div>

          <div className="contact-detail">
            <Phone />
            <div>
              <h4>Phone</h4>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>

          <div className="contact-detail">
            <MapPin />
            <div>
              <h4>Location</h4>
              <p>India</p>
            </div>
          </div>

          <div className="contact-detail">
            <Clock />
            <div>
              <h4>Working Hours</h4>
              <p>Monday – Saturday, 10 AM – 6 PM</p>
            </div>
          </div>

          <div className="contact-social">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
                </svg>
            </a>

            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4z" />
                </svg>
            </a>
            </div>

        </div>

        <div className="contact-form-panel">

          <h2>Send Us a Message</h2>
          <p>
            Fill in the details below and we'll get back to you.
          </p>

          <form onSubmit={handleSubmit}>

            <label htmlFor="contact-name">Your Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-email">Email Address</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              placeholder="How can we help?"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact-message">Your Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message here..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message →"}
            </button>

            {successMessage && (
              <p className="contact-success">
                {successMessage}
              </p>
            )}

            {errorMessage && (
              <p className="contact-error">
                {errorMessage}
              </p>
            )}

          </form>

        </div>

      </div>

    </main>
  );
}

export default Contact;
