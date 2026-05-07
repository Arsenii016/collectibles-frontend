import { useState } from "react";

function CartModal({
  isOpen,
  onClose,
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  createOrder,
}) {
  const [orderData, setOrderData] = useState({
    customer_name: "",
    phone: "",
    address: "",
    payment_method: "Card",
    comment: "",
  });

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  function handleChange(event) {
    const { name, value } = event.target;

    setOrderData({
      ...orderData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert("Корзина пустая");
      return;
    }

    createOrder(orderData);

    setOrderData({
      customer_name: "",
      phone: "",
      address: "",
      payment_method: "Card",
      comment: "",
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="cart-modal fixed-cart-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="form-header">
          <div>
            <p className="form-label">Shopping cart</p>
            <h2>Your cart</h2>
          </div>

          <button className="close-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-text">Корзина пока пустая.</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item fixed-cart-item" key={item.id}>
                  <img
                    className="cart-item-image"
                    src={item.image_url}
                    alt={item.name}
                  />

                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <strong>{item.price} ₽</strong>
                  </div>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button
                    className="remove-cart-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
              <p className="section-kicker">Checkout</p>
              <h3>Order details</h3>

              <input
                type="text"
                name="customer_name"
                placeholder="Ваше имя"
                value={orderData.customer_name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Телефон или Telegram"
                value={orderData.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="address"
                placeholder="Адрес доставки"
                value={orderData.address}
                onChange={handleChange}
                required
              />

              <select
                name="payment_method"
                value={orderData.payment_method}
                onChange={handleChange}
              >
                <option value="Card">Card — fake payment</option>
                <option value="Crypto">Crypto — fake payment</option>
                <option value="Cash on delivery">Cash on delivery</option>
              </select>

              <textarea
                name="comment"
                placeholder="Комментарий к заказу"
                value={orderData.comment}
                onChange={handleChange}
              />

              <div className="checkout-row">
                <span>Items</span>
                <strong>{cartItems.length}</strong>
              </div>

              <div className="checkout-row">
                <span>Total</span>
                <strong>{total} ₽</strong>
              </div>

              <div className="cart-footer-actions">
                <button
                  className="clear-cart-button"
                  type="button"
                  onClick={clearCart}
                >
                  Clear
                </button>

                <button className="checkout-button" type="submit">
                  Place order
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;