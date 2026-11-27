import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminCustomers from "./pages/AdminCustomers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";


import {
  Shirt,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Camera,
  ArrowRight,
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  Star
} from 'lucide-react';


function Navbar({
  wishlistCount,
  onWishlistClick,
  isWishlistOpen,
  cartCount,
  onCartClick,
  loggedInUser,
  onLogout,
  onOrdersClick,
  searchQuery,
  onSearchChange
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <nav className="navbar">

      <a href="/" className="logo">
        Wear<span>Wise.</span>
      </a>

      <div className="nav-links">
        <a href="/" className="active">Home</a>
        <a href="#shop">Shop</a>

        <a href="#categories" className="category-link">
          Categories
          <ChevronDown size={13} />
        </a>

        <a href="#tryon">Virtual Try-On</a>
      </div>

      <div className="nav-actions">

       {isSearchOpen && (
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                document.getElementById("shop")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              }
            }}
            autoFocus
          />
        )}

        <button
          className="nav-icon"
          aria-label="Search products"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search size={18} />
        </button>

        <button
        className={`nav-icon ${isWishlistOpen ? 'active' : ''}`}
        aria-label="Open wishlist"
        onClick={onWishlistClick}
        >
        <Heart size={18} />
        {wishlistCount > 0 && (
          <span className="wishlist-count">{wishlistCount}</span>
        )}
      </button>

    <button
      className="nav-icon"
      aria-label="Shopping cart"
      onClick={onCartClick}
    >
    <ShoppingCart size={18} />
      {cartCount > 0 && (
    <span className="cart-count">{cartCount}</span>
  )}
  </button>
  {loggedInUser ? (
  <>
    <span>Hi, {loggedInUser.name}</span>
    <button className="login-btn" onClick={onOrdersClick}>
  My Orders
</button>
    <button className="login-btn" onClick={onLogout}>
      Logout
    </button>
  </>
  
) : (
  <>
    <Link to="/login" className="login-btn">Login</Link>
    <Link to="/signup" className="signup-btn">Sign Up</Link>
  </>
)}
      </div>

    </nav>
  );
}


function Feature({ icon: Icon, title, description }) {
  return (
    <div className="feature">
      <Icon size={21} strokeWidth={1.7} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">FASHION MEETS TECHNOLOGY</p>

        <h1>
          Find Your Style.
          <br />
          <span>Try Before You Buy.</span>
        </h1>

        <p className="hero-description">
          Discover fashion that matches your personality.
          Experience a smarter way to shop with AI-powered
          virtual try-on.
        </p>

        <div className="hero-buttons">
          <a href="#shop" className="primary-btn">
            <ShoppingBag size={15} />
            Explore Collection
            <ArrowRight size={15} />
          </a>

          <a href="#tryon" className="secondary-btn">
            <Camera size={16} />
            Try It On
          </a>
        </div>

        <div className="features">
          <Feature
            icon={Shirt}
            title="Wide Collection"
            description="Ethnic & Western Wear"
          />

          <Feature
            icon={ShieldCheck}
            title="Try Before You Buy"
            description="AI Virtual Try-On"
          />

          <Feature
            icon={Truck}
            title="Easy Returns"
            description="Hassle-free Shopping"
          />
        </div>
      </div>

      <div className="hero-image">
        <img
          src="/wearwise-hero.png"
          alt="Models showcasing ethnic and western fashion"
        />
      </div>
    </section>
  );
}



const categories = [
  {
    name: "Ethnic Wear",
    description: "Traditional styles, timeless elegance",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&auto=format&fit=crop",
  },
  
{
  name: "Kurtis & Suits",
  description: "Everyday comfort with beautiful designs",
  image:
    "https://images.unsplash.com/photo-1741847639057-b51a25d42892?auto=format&fit=crop&w=700&q=80",
},

  {
    name: "Western Wear",
    description: "Modern looks for every occasion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&auto=format&fit=crop",
  },
  {
    name: "Dresses",
    description: "Find your perfect statement outfit",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop",
  },
];


function CategoryCard({ category, onCategoryClick }) {
  return (
    <div className="category-card">
      <img src={category.image} alt={category.name} />

      <div className="category-overlay">
        <h3>{category.name}</h3>
        <p>{category.description}</p>

        <a
          href="#shop"
          onClick={(e) => {
            e.preventDefault();
            onCategoryClick(category.name);
          }}
        >
          Explore Collection <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}


function CategorySection({ onCategoryClick }) {
  return (
    <section className="category-section" id="categories">

      <div className="section-heading">
        <p className="section-eyebrow">EXPLORE OUR COLLECTION</p>
        <h2>Shop by Category</h2>
        <p>
          Discover styles that make you feel confident and beautiful.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </div>

    </section>
  );
}

function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart, onProductClick, onTryOn }){
  return (
    <div
  className="product-card"
  onClick={() => onProductClick(product)}
  style={{ cursor: "pointer" }}
>

      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <button
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
          onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product.id);
        }}
        >
          <Heart
            size={19}
            fill={isWishlisted ? 'currentColor' : 'none'}
          />
        </button>

        <span className="product-tag">Trending</span>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <h3>{product.name}</h3>

        <div className="product-rating">
          <Star size={14} fill="#d4a64e" color="#d4a64e" />
          <span>{product.rating}</span>
        </div>

        <div className="product-bottom">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>

          <button
            className="try-product-btn"
            onClick={(e) => {
              e.stopPropagation();
              onTryOn(product);
            }}
          >
            <Camera size={15} />
            Try It On
          </button>
          <button
          className="add-to-cart-btn"
          onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
      }}
         >
       <ShoppingCart size={16} />
       Add to Cart
       </button>
        </div>
      </div>

    </div>
  );
}

function TrendingProducts({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onProductClick,
  onTryOn,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange
}) {
  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  const matchesCategory =
    selectedCategory === "All Products" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

const sortedProducts = [...filteredProducts].sort((a, b) => {
  switch (sortOption) {
    case "price-low":
      return a.price - b.price;

    case "price-high":
      return b.price - a.price;

    case "rating":
      return b.rating - a.rating;

    default:
      return 0;
  }
});

  return (
    <section className="trending-section" id="shop">

      <div className="section-heading">
        <p className="section-eyebrow">HANDPICKED FOR YOU</p>
        <h2>Trending Products</h2>
        <p>Discover the styles everyone is loving right now.</p>
      </div>

      <div className="product-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search your favourite styles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      
      <div className="category-filters">
        {[
          "All Products",
          "Ethnic Wear",
          "Kurtis & Suits",
          "Western Wear",
          "Dresses"
        ].map((category) => (
          <button
            key={category}
            className={`category-filter-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

<div className="product-sort">
  <label htmlFor="sort-products">Sort By:</label>

  <select
    id="sort-products"
    value={sortOption}
    onChange={(e) => onSortChange(e.target.value)}
  >
    <option value="featured">Featured</option>
    <option value="price-low">Price: Low to High</option>
    <option value="price-high">Price: High to Low</option>
    <option value="rating">Highest Rated</option>
  </select>
</div>
      
          <div className="product-grid">
      { sortedProducts.length > 0 ? (
        sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onProductClick={onProductClick}
            onTryOn={onTryOn}
          />
        ))
      ) : (
        <div className="no-products">
          <Search size={35} />
          <h3>No products found</h3>
          <p>Try searching with a different product name.</p>
        </div>
      )}
    </div>

    </section>
  );
}

function WishlistSection({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onProductClick,
  onTryOn
}) {
  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <section className="trending-section wishlist-section">

      <div className="section-heading">
        <p className="section-eyebrow">YOUR FAVOURITES</p>
        <h2>My Wishlist ❤️</h2>
        <p>Your saved styles, all in one place.</p>
      </div>

      {savedProducts.length === 0 ? (

        <div className="empty-wishlist">
          <Heart size={45} strokeWidth={1.3} />
          <h3>Your wishlist is empty</h3>
          <p>Explore our collection and save the styles you love.</p>

          <button
            className="primary-btn"
            onClick={() => onToggleWishlist()}
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </button>
        </div>

      ) : (

        <div className="product-grid">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
              onTryOn={onTryOn}
            />
          ))}
        </div>

      )}

      {savedProducts.length > 0 && (
        <p className="wishlist-summary">
          {savedProducts.length} saved product(s)
        </p>
      )}

    </section>
  );
}


function CartSection({ cart, onUpdateQuantity, onRemove, onContinueShopping, onCheckout }) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="trending-section cart-section">
      <div className="section-heading">
        <p className="section-eyebrow">YOUR SHOPPING BAG</p>
        <h2>My Cart</h2>
        <p>Review your selected styles before checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-wishlist">
          <ShoppingCart size={45} strokeWidth={1.3} />
          <h3>Your cart is empty</h3>
          <p>Add your favourite products to get started.</p>
          <button className="primary-btn" onClick={onContinueShopping}>
            <ShoppingBag size={16} />
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-container">
          {cart.map((item) => (
            <div
              className="cart-item"
              key={`${item.productId ?? item.id}-${item.size || "default"}`}
            >
              <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
  <h3>{item.name}</h3>
  <p>₹{item.price.toLocaleString("en-IN")}</p>

  {item.size && (
    <p className="cart-item-size">
      Size: {item.size}
    </p>
  )}

  <div className="cart-quantity">
  <button onClick={() => onUpdateQuantity(item.productId ?? item.id, item.size, -1)}>
  −
</button>
  <span>{item.quantity}</span>
<button onClick={() => onUpdateQuantity(item.productId ?? item.id, item.size, 1)}>
  +
</button>
</div>

<button onClick={() => onRemove(item.productId ?? item.id, item.size)}>
  Remove
</button>    

</div>

              <strong>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </strong>
            </div>
          ))}

          <div className="cart-total">
            <h3>Subtotal</h3>
            <h3>₹{subtotal.toLocaleString("en-IN")}</h3>
          </div>

          <button className="primary-btn checkout-btn" onClick={onCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </section>
  );
}


function CheckoutSection({ cart, onBack, onOrderPlaced }) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = subtotal >= 1999 ? 0 : 99;

  const totalAmount = subtotal + deliveryCharge;
  
const handlePlaceOrder = async () => {
  try {
    const token = sessionStorage.getItem("wearwise-token");

    if (!token) {
      alert("Please login before placing your order.");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        productId: item.productId ?? item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: item.size || "M",
        quantity: item.quantity,
      })),
      shippingAddress: address,
      subtotal,
      deliveryCharge,
      totalAmount,
    };

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Order placement failed.");
    }

console.log("Saved Order:", data.order);

// Clear the cart from MongoDB
try {
  const clearResponse = await fetch(
    "http://localhost:5000/api/cart/clear",
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!clearResponse.ok) {
    throw new Error("Unable to clear database cart.");
  }

// Clear the frontend cart
onOrderPlaced();
sessionStorage.removeItem("wearwise-cart");

} catch (clearError) {
  console.error("Cart Clearing Error:", clearError);
}

alert("Order placed successfully!");
  } catch (error) {
    console.error("Order Error:", error);
    alert(error.message || "Something went wrong.");
  }
};

  const [address, setAddress] = useState({
  fullName: "",
  mobile: "",
  email: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
});
  return (
    <section className="checkout-section">
      <div className="section-heading">
        <p className="section-eyebrow">ALMOST THERE</p>
        <h2>Checkout</h2>
        <p>Complete your details to place your order.</p>
      </div>

      <button className="back-btn" onClick={onBack}>
        ← Back to Cart
      </button>

      <div className="checkout-container">

        <div className="checkout-address">
          <h3>Delivery Address</h3>

  <form
  id="checkout-form"
  className="address-form"
  onSubmit={(event) => {
  event.preventDefault();
  handlePlaceOrder();
}}
>
            <label>Full Name</label>
           <input
  type="text"
  placeholder="Enter your full name"
  value={address.fullName}
  onChange={(e) =>
    setAddress({ ...address, fullName: e.target.value })
  }
  required
/>

            <label>Mobile Number</label>
            <input
  type="tel"
  placeholder="Enter your mobile number"
  value={address.mobile}
  onChange={(e) =>
    setAddress({ ...address, mobile: e.target.value })
  }
  pattern="[6-9][0-9]{9}"
  maxLength="10"
  title="Enter a valid 10-digit Indian mobile number"
  required
/>

            <label>Email Address</label>
            <input
  type="email"
  placeholder="Enter your email address"
  value={address.email}
  onChange={(e) =>
    setAddress({ ...address, email: e.target.value })
  }
  required
/>

            <label>House No. / Street Address</label>
            <input
  type="text"
  placeholder="House No., Building, Street"
  value={address.street}
  onChange={(e) =>
    setAddress({ ...address, street: e.target.value })
  }
  required
/>

            <label>City</label>
            <input
  type="text"
  placeholder="Enter your city"
  value={address.city}
  onChange={(e) =>
    setAddress({ ...address, city: e.target.value })
  }
  required
/>

            <label>State</label>
            <input
  type="text"
  placeholder="Enter your state"
  value={address.state}
  onChange={(e) =>
    setAddress({ ...address, state: e.target.value })
  }
  required
/>

            <label>PIN Code</label>
           <input
  type="text"
  placeholder="Enter 6-digit PIN code"
  value={address.pincode}
  onChange={(e) =>
    setAddress({ ...address, pincode: e.target.value })
  }
  pattern="[1-9][0-9]{5}"
  maxLength="6"
  title="Enter a valid 6-digit PIN code"
  required
/>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          <p>
            {cart.reduce((total, item) => total + item.quantity, 0)}
            {" "}item(s) in your order
          </p>

          {cart.map((item) => (
            <div
              className="checkout-item"
              key={`${item.productId ?? item.id}-${item.size || "default"}`}
            >
              <div>
                <h4>{item.name}</h4>
                <p>Size: {item.size || "M"} | Qty: {item.quantity}</p>
              </div>

              <strong>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </strong>
            </div>
          ))}

          <div className="checkout-total">
  <p>
    Subtotal
    <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
  </p>

  <p>
    Delivery Charges
    <strong>
      {deliveryCharge === 0
        ? "FREE"
        : `₹${deliveryCharge.toLocaleString("en-IN")}`}
    </strong>
  </p>

  <div className="final-total">
    <h3>Total Amount</h3>
    <h3>₹{totalAmount.toLocaleString("en-IN")}</h3>
  </div>
<button
  type="submit"
  form="checkout-form"
  className="primary-btn checkout-btn"
>
  Place Order
</button>
</div>
        </div>

      </div>
    </section>
  );
}

const orderTrackingSteps = [
  "Placed",
  "Processing",
  "Shipped",
  "Delivered",
];

function getOrderStep(status) {
  return orderTrackingSteps.indexOf(status);
}

function MyOrdersSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleCancelOrder = async (orderId) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmCancel) return;
  try {
  const token = sessionStorage.getItem("wearwise-token");

  const response = await fetch(
    `http://localhost:5000/api/orders/${orderId}/cancel`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to cancel order.");
  }
  console.log("Cancellation API Response:", data);
console.log("Cancelled Order:", data.order);
setOrders((previousOrders) =>
  previousOrders.map((order) =>
    order._id === orderId
      ? { ...order, orderStatus: "Cancelled" }
      : order
  )
);
  alert("Your order has been cancelled successfully!");
  
} catch (err) {
  console.error("Cancel Order Error:", err);
  alert(err.message);
}
};

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("wearwise-token");

      const response = await fetch(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch orders.");
      }

      setOrders(data.orders);
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

return (
  <section className="my-orders-section">
    <div className="section-heading">
      <p className="section-eyebrow">YOUR ACCOUNT</p>
      <h2>My Orders</h2>
      <p>Track and manage your recent purchases.</p>
    </div>

    {loading ? (
      <p>Loading your orders...</p>
    ) : error ? (
      <p>{error}</p>
    ) : orders.length === 0 ? (
      <p>You haven't placed any orders yet.</p>
    ) : (
<div className="orders-list">
  {orders.map((order) => (
    <div className="order-card" key={order._id}>
      <h3>Order #{order._id.slice(-6)}</h3>
      <p>
        Order Date:{" "}
        {new Date(order.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p className="order-status">
        Status: <span>{order.orderStatus}</span>
      </p>
      {["Placed", "Processing"].includes(order.orderStatus) && (
  <button
    className="cancel-order-btn"
    onClick={() => handleCancelOrder(order._id)}
  >
    Cancel Order
  </button>
)}
{order.orderStatus === "Cancelled" ? (
  <div className="cancelled-message">
    <span>✕</span>
    <p>This order has been cancelled.</p>
  </div>
) : (
  <div className="order-tracking">
    {orderTrackingSteps.map((step, index) => (
      <div
        className={`tracking-step ${
          index <= getOrderStep(order.orderStatus) ? "completed" : ""
        }`}
        key={step}
      >
        <div className="tracking-dot"></div>
        <p>{step}</p>
      </div>
    ))}
  </div>
)}      <div className="estimated-delivery">
        <p>Estimated Delivery</p>
        <h4>
          {new Date(
            new Date(order.createdAt).setDate(
              new Date(order.createdAt).getDate() + 6
            )
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </h4>
      </div>           
      <p>Total Amount: ₹{order.totalAmount.toLocaleString("en-IN")}</p>
      <div className="order-products">
        {order.items.map((item, index) => (
          <p key={index}>
            {item.name} | Size: {item.size} | Qty: {item.quantity}
          </p>
        ))}
      </div>
      <div className="order-delivery">
        <h4>Delivery Address</h4>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.street}</p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
          {order.shippingAddress.pincode}
        </p>
        <p>Mobile: {order.shippingAddress.mobile}</p>
      </div>      
    </div>
  ))}
</div>
    )}
  </section>
);
}

function ProductDetails({ product, onBack, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <section className="product-details">
      <button className="back-btn" onClick={onBack}>
        ← Back to Collection
      </button>

      <div className="product-details-container">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>

          <div className="product-rating">
            <Star size={15} fill="#d4a64e" color="#d4a64e" />
            {product.rating} / 5
          </div>

          <h2>₹{product.price.toLocaleString("en-IN")}</h2>

          <p>
            Discover timeless style with this beautiful addition
            to your wardrobe. Designed to bring comfort and elegance
            to your everyday fashion.
          </p>

          <h4>Select Size</h4>

          <div className="size-options">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className={selectedSize === size ? "selected" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <h4>Quantity</h4>

          <div className="cart-quantity">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>

          <button
            className="add-to-cart-btn details-add-btn"
            onClick={() => {
              onAddToCart({
                ...product,
                size: selectedSize
              }, quantity);
            }}
          >
            <ShoppingCart size={17} />
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}



function TryOnSection({ products, selectedTryOnProduct, setSelectedTryOnProduct}) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [category, setCategory] = useState("tops");
  useEffect(() => {
  if (!selectedTryOnProduct) return;

  const product = products.find(
    (item) => String(item.id) === selectedTryOnProduct
  );

  if (!product) return;

  const productText =
    `${product.name} ${product.category}`.toLowerCase();

  if (
    /jeans|trouser|pants|leggings|skirt|shorts|bottoms/.test(productText)
  ) {
    setCategory("bottoms");
  } else if (
    /top|shirt|t-shirt|tee|blouse|sweater|jacket/.test(productText)
  ) {
    setCategory("tops");
  } else {
    setCategory("one-pieces");
  }
}, [selectedTryOnProduct, products]);

  const [tryOnMessage, setTryOnMessage] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

function handleImageUpload(event) {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (!allowedTypes.includes(file.type)) {
    setTryOnMessage("Please upload a JPG, PNG or WEBP image.");
    event.target.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    setTryOnMessage("Image size must be less than 10 MB.");
    event.target.value = "";
    return;
  }

  setUploadedFile(file);
  setUploadedImage(URL.createObjectURL(file));
  event.target.value = "";
  setResultImage(null);
  setTryOnMessage("");
}

function handleReset() {
  setUploadedFile(null);
  setUploadedImage(null);
  setResultImage(null);
  setSelectedTryOnProduct("");
  setTryOnMessage("");
  setCategory("tops");
}


  async function handleStartTryOn() {
    if (!uploadedFile) {
      setTryOnMessage("Please upload your photo first.");
      return;
    }

    if (!selectedTryOnProduct) {
      setTryOnMessage("Please select an outfit first.");
      return;
    }

    const selectedProduct = products.find(
      (product) => String(product.id) === selectedTryOnProduct
    );

    if (!selectedProduct || !selectedProduct.image) {
      setTryOnMessage("Product image not found.");
      return;
    }

    try {
      setLoading(true);
      setResultImage(null);
      setTryOnMessage("Generating your virtual try-on... Please wait.");

      console.log("Selected Product:", selectedProduct);
      console.log("Product Image URL:", selectedProduct.image);
    // Get the selected product image
      const garmentResponse = await fetch(selectedProduct.image);

      if (!garmentResponse.ok) {
        throw new Error("Unable to load product image.");
      }

      const garmentBlob = await garmentResponse.blob();

      // Prepare both images for the AI API
      const formData = new FormData();

      formData.append("person_image", uploadedFile);
      formData.append(
        "garment_image",
        garmentBlob,
        "garment.jpg"
      );
      formData.append("category", category);

      // Send request to WearWise backend
      const response = await fetch(
        "http://localhost:5000/api/ai/tryon",
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Virtual try-on failed."
        );
      }

      // Receive generated image
      const resultBlob = await response.blob();
      const resultURL = URL.createObjectURL(resultBlob);

      setResultImage(resultURL);
      setTryOnMessage("Your virtual try-on is ready!");

    } catch (error) {
      console.error("Try-On Error:", error);
      setTryOnMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="tryon-section" id="tryon">
      <div className="section-heading">
        <p className="section-eyebrow">EXPERIENCE THE FUTURE</p>
        <h2>Virtual Try-On</h2>
        <p>Upload your photo and get ready to explore your style.</p>
      </div>

      <div className="tryon-container">
        <div className="tryon-upload">
          <h3>Upload Your Photo</h3>
          <p>Choose a clear, full-length photo to get started.</p>

          <label htmlFor="tryon-upload" className="upload-btn">
            <Camera size={20} />
            Upload Photo
          </label>

          <input
            type="file"
            id="tryon-upload"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            hidden
          />

          <div className="tryon-product-select">
            <label htmlFor="tryon-product">
              Select an Outfit
            </label>

            <select
              id="tryon-product"
              value={selectedTryOnProduct}
              onChange={(e) => setSelectedTryOnProduct(e.target.value)}
            >
              <option value="">Choose an outfit</option>

              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ₹{product.price}
                </option>
              ))}
            </select>

            <label htmlFor="tryon-category">
              Outfit Type
            </label>

            <select
              id="tryon-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="one-pieces">One Pieces / Dresses</option>
            </select>

            <div className="tryon-actions">
                      <button
                        className="start-tryon-btn"
                        onClick={handleStartTryOn}
                        disabled={loading}
                      >
                        {loading ? "Generating..." : "Start Try-On"}
                      </button>

                      <button
                        className="reset-tryon-btn"
                        onClick={handleReset}
                        type="button"
                      >
                        Reset
                      </button>
                    </div>


            {tryOnMessage && (
              <p className="tryon-message">
                {tryOnMessage}
              </p>
            )}
          </div>
        </div>

       <div className="tryon-preview">

          <div className="preview-image">
            <h3>Original Photo</h3>

            {uploadedImage ? (
              <img src={uploadedImage} alt="Original uploaded photo" />
            ) : (
              <div className="upload-placeholder">
                <Camera size={40} />
                <p>Your photo will appear here</p>
              </div>
            )}
          </div>

          <div className="preview-image">
            <h3>AI Try-On Result</h3>

            {resultImage ? (
              <img src={resultImage} alt="AI generated try-on result" />
            ) : (
              <div className="upload-placeholder">
                <Camera size={40} />
                <p>Your AI result will appear here</p>
              </div>
            )}
          </div>

            {resultImage && (
              <div className="tryon-download">
                <a
                  href={resultImage}
                  download="WearWise-TryOn-Result.png"
                  className="download-tryon-btn"
                >
                  Download Try-On Result
                </a>
              </div>
            )}     
        </div>

      </div>

    </section>
  );
}



function BackendTest() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Backend error:", error);
        setMessage("Backend connection failed!");
      });
  }, []);

  return <p>{message}</p>;
}


function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>Wear<span>Wise.</span></h2>
          <h3>Style that speaks. Confidence that shines.</h3>
          <p>
            Discover fashion that celebrates your individuality.
            Find your perfect look with WearWise.
          </p>
        </div>

        {/* Shop Links */}
        <div className="footer-column">
          <h4>SHOP</h4>
          <a href="#shop">All Products</a>
          <a href="#shop">Ethnic Wear</a>
          <a href="#shop">Kurtis & Suits</a>
          <a href="#shop">Western Wear</a>
          <a href="#shop">Dresses</a>
        </div>

        {/* Customer Care */}
        <div className="footer-column">
          <h4>CUSTOMER CARE</h4>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/shipping">Shipping Information</Link>
          <Link to="/returns">Returns & Refunds</Link>
        </div>

        {/* Information */}
        <div className="footer-column">
          <h4>INFORMATION</h4>
          <Link to="/about">About Us</Link>
          <a href="#tryon">Virtual Try-On</a>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

      </div>

      {/* Newsletter */}
      <div className="footer-newsletter">
        <h3>Join the WearWise Community</h3>
        <p>
          Get updates on new collections, exclusive offers and latest styles.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Social Media */}
      <div className="footer-social">
  <a href="#">Instagram</a>
  <a href="#">Facebook</a>
  <a href="#">Pinterest</a>
</div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 WearWise. All rights reserved.</p>
        <p>Made with love for every woman.</p>
      </div>

    </footer>
  );
}

function ContactPage() {
  return (
    <div className="app">
      <Navbar
        wishlistCount={0}
        onWishlistClick={() => {}}
        isWishlistOpen={false}
        cartCount={0}
        onCartClick={() => {}}
        loggedInUser={null}
        onLogout={() => {}}
        onOrdersClick={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
      />

      <Contact />

      <Footer />
    </div>
  );
}

function AboutPage() {
  return (
    <div className="app">
      <Navbar
        wishlistCount={0}
        onWishlistClick={() => {}}
        isWishlistOpen={false}
        cartCount={0}
        onCartClick={() => {}}
        loggedInUser={null}
        onLogout={() => {}}
        onOrdersClick={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
      />

      <About />

      <Footer />
    </div>
  );
}

function FAQsPage() {
  return (
    <div className="app">
      <Navbar
        wishlistCount={0}
        onWishlistClick={() => {}}
        isWishlistOpen={false}
        cartCount={0}
        onCartClick={() => {}}
        loggedInUser={null}
        onLogout={() => {}}
        onOrdersClick={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
      />
      <FAQs />
      <Footer />
    </div>
  );
}

function ShippingPage() {
  return (
    <div className="app">
      <Navbar
        wishlistCount={0}
        onWishlistClick={() => {}}
        isWishlistOpen={false}
        cartCount={0}
        onCartClick={() => {}}
        loggedInUser={null}
        onLogout={() => {}}
        onOrdersClick={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
      />
      <Shipping />
      <Footer />
    </div>
  );
}

function ReturnsPage() {
  return (
    <div className="app">
      <Navbar
        wishlistCount={0}
        onWishlistClick={() => {}}
        isWishlistOpen={false}
        cartCount={0}
        onCartClick={() => {}}
        loggedInUser={null}
        onLogout={() => {}}
        onOrdersClick={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
      />
      <Returns />
      <Footer />
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="app">
      <Navbar
        wishlistCount={0}
        onWishlistClick={() => {}}
        isWishlistOpen={false}
        cartCount={0}
        onCartClick={() => {}}
        loggedInUser={null}
        onLogout={() => {}}
        onOrdersClick={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
      />
      <Privacy />
      <Footer />
    </div>
  );
}

function TermsPage() {
  return (
    <div className="app">
      <Navbar
        wishlistCount={0}
        onWishlistClick={() => {}}
        isWishlistOpen={false}
        cartCount={0}
        onCartClick={() => {}}
        loggedInUser={null}
        onLogout={() => {}}
        onOrdersClick={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
      />
      <Terms />
      <Footer />
    </div>
  );
}


function HomePage() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(() => {
  const savedUser = sessionStorage.getItem("wearwise-user");

  try {
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
});

const handleLogout = () => {
  sessionStorage.removeItem("wearwise-token");
  sessionStorage.removeItem("wearwise-user");

  setLoggedInUser(null);
  setWishlist([]);
  setCart([]);
  sessionStorage.removeItem("wearwise-cart");
  setShowWishlist(false);
  setShowCart(false);
  setShowCheckout(false);
  setShowOrders(false);
};

const [wishlist, setWishlist] = useState(() => {
  const savedWishlist = localStorage.getItem('wearwise-wishlist');

  try {
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
});

const [wishlistLoading, setWishlistLoading] = useState(false);

const [showWishlist, setShowWishlist] = useState(false);

const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('wearwise-cart');

  try {
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
});

const [cartLoading, setCartLoading] = useState(false);


  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOption, setSortOption] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTryOnProduct, setSelectedTryOnProduct] = useState("");

 const handleProductTryOn = (product) => {
  setSelectedTryOnProduct(String(product.id));
  setShowWishlist(false);
};

useEffect(() => {
  if (!showWishlist && selectedTryOnProduct) {
    document.getElementById("tryon")?.scrollIntoView({
      behavior: "smooth"
    });
  }
}, [showWishlist, selectedTryOnProduct]);

// Save wishlist only for guest users
useEffect(() => {
  if (!loggedInUser) {
    localStorage.setItem(
      'wearwise-wishlist',
      JSON.stringify(wishlist)
    );
  }
}, [wishlist, loggedInUser]);

// Save cart only for guest users
useEffect(() => {
  if (!loggedInUser) {
    localStorage.setItem(
      'wearwise-cart',
      JSON.stringify(cart)
    );
  }
}, [cart, loggedInUser]);


useEffect(() => {
  fetch("http://localhost:5000/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then((data) => {
      setProducts(data);
      console.log("Products received:", data);
    })
    .catch((error) => {
      console.error("Product API Error:", error);
    })
    .finally(() => {
      setProductsLoading(false);
    });
}, []);

// Fetch wishlist from MongoDB when user is logged in
useEffect(() => {
  async function fetchWishlist() {
    if (!loggedInUser) {
      return;
    }

    try {
      setWishlistLoading(true);

      const token = sessionStorage.getItem("wearwise-token");

      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch wishlist");
      }

      setWishlist(data);

    } catch (error) {
      console.error("Fetch Wishlist Error:", error);
    } finally {
      setWishlistLoading(false);
    }
  }

  fetchWishlist();
}, [loggedInUser]);


// Fetch cart from MongoDB when user is logged in
useEffect(() => {
  async function fetchCart() {
    if (!loggedInUser) {
      return;
    }

    try {
      setCartLoading(true);

      const token = sessionStorage.getItem("wearwise-token");

      const response = await fetch(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      setCart(data);

    } catch (error) {
      console.error("Fetch Cart Error:", error);
    } finally {
      setCartLoading(false);
    }
  }

  fetchCart();
}, [loggedInUser]);

async function toggleWishlist(productId) {

  // Empty wishlist's Continue Shopping button
  if (productId === undefined) {
    setShowWishlist(false);
    return;
  }

  // If user is logged in, update MongoDB
  if (loggedInUser) {
    try {
      const token = sessionStorage.getItem("wearwise-token");

      const response = await fetch(
        "http://localhost:5000/api/wishlist/toggle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ productId })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Wishlist update failed");
      }

      setWishlist(data.products);

    } catch (error) {
      console.error("Wishlist Error:", error);
      alert(error.message);
    }

    return;
  }

  // If user is a guest, use localStorage
  setWishlist((currentWishlist) => {
    if (currentWishlist.includes(productId)) {
      return currentWishlist.filter(id => id !== productId);
    }

    return [...currentWishlist, productId];
  });
}


async function addToCart(product, quantity = 1) {

  // Logged-in user: save cart item in MongoDB
  if (loggedInUser) {
    try {
      const token = sessionStorage.getItem("wearwise-token");

      const response = await fetch(
        "http://localhost:5000/api/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: product.id,
            size: product.size || "M",
            quantity
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      setCart(data.items);

    } catch (error) {
      console.error("Add to Cart Error:", error);
      alert(error.message);
    }

    return;
  }

  // Guest user: use local cart
  setCart((currentCart) => {
    const existingProduct = currentCart.find(
      (item) =>
        item.id === product.id &&
        item.size === (product.size || "M")
    );

    if (existingProduct) {
      return currentCart.map((item) =>
        item.id === product.id &&
        item.size === (product.size || "M")
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

    return [
      ...currentCart,
      { ...product, size: product.size || "M", quantity }
    ];
  });
}



async function updateQuantity(productId, size, change) {

  // Logged-in user: update quantity in MongoDB
  if (loggedInUser) {
    try {
      const token = sessionStorage.getItem("wearwise-token");

      const currentItem = cart.find(
        (item) =>
          (item.productId ?? item.id) === productId &&
          item.size === size
      );

      if (!currentItem) return;

      const newQuantity = currentItem.quantity + change;

      // Remove item if quantity becomes zero
      if (newQuantity <= 0) {
        await removeFromCart(productId, size);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/cart/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId,
            size,
            quantity: newQuantity
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update quantity");
      }

      setCart(data.items);

    } catch (error) {
      console.error("Update Cart Error:", error);
      alert(error.message);
    }

    return;
  }

  // Guest user: update local cart
  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}



async function removeFromCart(productId, size) {

  // Logged-in user: remove item from MongoDB
  if (loggedInUser) {
    try {
      const token = sessionStorage.getItem("wearwise-token");

      const response = await fetch(
        "http://localhost:5000/api/cart/remove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId,
            size
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove item");
      }

      setCart(data.items);

    } catch (error) {
      console.error("Remove Cart Error:", error);
      alert(error.message);
    }

    return;
  }

  // Guest user: remove item from local cart
  setCart((currentCart) =>
    currentCart.filter(
      (item) => item.id !== productId || item.size !== size
    )
  );
}

const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

  return (
    <div className="app">

      <Navbar
      wishlistCount={wishlist.length}
      onWishlistClick={() => {
      setShowWishlist(!showWishlist);
      setShowCart(false);
  }}
  isWishlistOpen={showWishlist}
  cartCount={cartCount}
  onCartClick={() => {
    setShowCart(true);
    setShowWishlist(false);
  }}
  loggedInUser={loggedInUser}
  onOrdersClick={() => {
  setShowOrders(true);
  setShowWishlist(false);
  setShowCart(false);
  setShowCheckout(false);
  setSelectedProduct(null);
}}
  onLogout={handleLogout}
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
/>

{selectedProduct ? (
  <ProductDetails
    product={selectedProduct}
    onBack={() => setSelectedProduct(null)}
    onAddToCart={addToCart}
  />
) : showWishlist ? (
  <WishlistSection
    products={products}
    wishlist={wishlist}
    onToggleWishlist={toggleWishlist}
    onAddToCart={addToCart}
    onProductClick={setSelectedProduct}
    onTryOn={handleProductTryOn}
  />
) : showCheckout ? (
  <CheckoutSection
    cart={cart}
    onBack={() => {
      setShowCheckout(false);
      setShowCart(true);
    }}
    onOrderPlaced={() => setCart([])}
  />
) : showOrders ? (
  <MyOrdersSection />
) : showCart ? (
  <CartSection
    cart={cart}
    onUpdateQuantity={updateQuantity}
    onRemove={removeFromCart}
    onContinueShopping={() => setShowCart(false)}
    onCheckout={() => {
      setShowCart(false);
      setShowCheckout(true);
    }}
  />
) : (
  <>
    <Hero />
    <CategorySection
      onCategoryClick={(categoryName) => {
        setSelectedCategory(categoryName);

        document.getElementById("shop")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }}
    />
    <TrendingProducts
      products={products}
      wishlist={wishlist}
      onToggleWishlist={toggleWishlist}
      onAddToCart={addToCart}
      onProductClick={setSelectedProduct}
      onTryOn={handleProductTryOn}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      sortOption={sortOption}
      onSortChange={setSortOption}
    />
        <TryOnSection
      products={products}
      selectedTryOnProduct={selectedTryOnProduct}
      setSelectedTryOnProduct={setSelectedTryOnProduct}
    />

    <Footer />
  </>
)}

    </div>
  );
}

function AdminRoute() {
  const user = JSON.parse(
    sessionStorage.getItem("wearwise-user") || "null"
  );

  return user?.role === "admin" ? (
    <AdminLayout />
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />



        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}


export default App;
