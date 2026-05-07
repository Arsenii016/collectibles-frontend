import { useEffect, useState } from "react";
import "./App.css";

import AuthModal from "./components/AuthModal";
import ProductFormModal from "./components/ProductFormModal";
import CartModal from "./components/CartModal";
import ProductDetailsModal from "./components/ProductDetailsModal";

import StorePage from "./pages/StorePage";
import CollectionsPage from "./pages/CollectionsPage";
import AboutPage from "./pages/AboutPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";

const API_URL = "https://collectibles-backend-hcey.onrender.com";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductOpen, setIsProductOpen] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [activePage, setActivePage] = useState("store");
  const [activeCategory, setActiveCategory] = useState("All items");

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Sneakers",
    seller_id: "1",
    image_file: null,
  });

  const isAdmin = currentUser && currentUser.id === 1;

  useEffect(() => {
    loadProducts();

    const savedUser = localStorage.getItem("currentUser");
    const savedCart = localStorage.getItem("cartItems");
    const savedFavorites = localStorage.getItem("favoriteItems");

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedFavorites) setFavoriteItems(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  function loadProducts() {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }

  function openPage(pageName) {
    setActivePage(pageName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCategory(categoryName) {
    setActiveCategory(categoryName);
    setActivePage("store");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setIsProductOpen(true);
  }

  function closeProduct() {
    setSelectedProduct(null);
    setIsProductOpen(false);
  }

  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  }

  function toggleFavorite(product) {
    setFavoriteItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);

      if (exists) {
        return prevItems.filter((item) => item.id !== product.id);
      }

      return [...prevItems, product];
    });
  }

  function isFavorite(productId) {
    return favoriteItems.some((item) => item.id === productId);
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }

  function increaseQuantity(productId) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function createOrder(orderData) {
    const total = cartItems.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);

    const payload = {
      ...orderData,
      total,
      items: cartItems,
    };

    fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.order_id) {
          alert(`Заказ №${data.order_id} оформлен 🚀`);
          setCartItems([]);
          setIsCartOpen(false);
        } else {
          alert(data.error || "Ошибка оформления заказа");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка соединения с сервером");
      });
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favoriteCount = favoriteItems.length;

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  }

  function handleRegisterChange(event) {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  }

  function handleProductChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleFileChange(event) {
    setFormData({
      ...formData,
      image_file: event.target.files[0],
    });
  }

  function handleLogin(event) {
    event.preventDefault();

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
          localStorage.setItem("currentUser", JSON.stringify(data.user));

          setIsAuthOpen(false);
          setLoginData({ email: "", password: "" });
        } else {
          alert(data.error || "Ошибка входа");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(event) {
    event.preventDefault();

    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert("Пользователь создан. Теперь войдите.");
          setAuthMode("login");
          setRegisterData({ username: "", email: "", password: "" });
        } else {
          alert(data.error || "Ошибка регистрации");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleProductSubmit(event) {
    event.preventDefault();

    const form = new FormData();

    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("seller_id", formData.seller_id);

    if (formData.image_file) {
      form.append("image", formData.image_file);
    }

    fetch(`${API_URL}/products`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "Sneakers",
          seller_id: "1",
          image_file: null,
        });

        setIsProductFormOpen(false);
        loadProducts();
      })
      .catch((err) => console.log(err));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  function renderPage() {
    if (activePage === "collections") {
      return <CollectionsPage openCategory={openCategory} />;
    }

    if (activePage === "new") {
      return (
        <NewArrivalsPage
          products={products}
          addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          openProduct={openProduct}
        />
      );
    }

    if (activePage === "favorites") {
      return (
        <StorePage
          products={favoriteItems}
          activeCategory="All items"
          openCategory={openCategory}
          addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          openProduct={openProduct}
        />
      );
    }

    if (activePage === "about") {
      return <AboutPage />;
    }

    return (
      <>
        <section
          className="promo-banner"
          onClick={() => openCategory("Back to 2008")}
        >
          <div className="promo-content">
            <p className="promo-label">Special collection</p>
            <h1>Back to 2008</h1>
            <p>
              Редкие вещи, лимитированная одежда, обувь и аксессуары в стиле
              старой школы.
            </p>

            <button
              className="promo-button"
              onClick={(event) => {
                event.stopPropagation();
                openCategory("Back to 2008");
              }}
            >
              Explore collection
            </button>
          </div>
        </section>

        <StorePage
          products={products}
          activeCategory={activeCategory}
          openCategory={openCategory}
          addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          openProduct={openProduct}
        />
      </>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo" onClick={() => openPage("store")}>
          Collectibles
        </div>

        <nav className="main-nav">
          <button className="nav-link" onClick={() => openPage("store")}>
            Store
          </button>

          <button className="nav-link" onClick={() => openPage("collections")}>
            Collections
          </button>

          <button className="nav-link" onClick={() => openPage("new")}>
            New Arrivals
          </button>

          <button className="nav-link" onClick={() => openPage("about")}>
            About
          </button>
        </nav>

        <div className="nav-actions">
          <button
            className="favorite-button"
            type="button"
            onClick={() => openPage("favorites")}
          >
            Favorites
            {favoriteCount > 0 && (
              <span className="cart-count">{favoriteCount}</span>
            )}
          </button>

          <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {currentUser ? (
            <>
              <span className="user-chip">{currentUser.username}</span>

              {isAdmin && (
                <button
                  className="nav-button"
                  onClick={() => setIsProductFormOpen(true)}
                >
                  Admin
                </button>
              )}

              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button className="nav-button" onClick={() => setIsAuthOpen(true)}>
              Login
            </button>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        authMode={authMode}
        setAuthMode={setAuthMode}
        loginData={loginData}
        registerData={registerData}
        handleLoginChange={handleLoginChange}
        handleRegisterChange={handleRegisterChange}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />

      <ProductFormModal
        isOpen={isProductFormOpen && isAdmin}
        onClose={() => setIsProductFormOpen(false)}
        formData={formData}
        handleProductChange={handleProductChange}
        handleFileChange={handleFileChange}
        handleProductSubmit={handleProductSubmit}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        createOrder={createOrder}
      />

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isProductOpen}
        onClose={closeProduct}
        addToCart={addToCart}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />

      {renderPage()}
    </div>
  );
}

export default App;