function CartModal({
  isOpen,
  onClose,
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  checkout,
}) {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  return (
    <div className="modal-overlay">
      <div className="cart-modal">
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
                <div className="cart-item" key={item.id}>
                  <img src={item.image_url} alt={item.name} />

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

            <div className="checkout-box">
              <p className="section-kicker">Checkout</p>
              <h3>Order details</h3>

              <div className="checkout-row">
                <span>Items</span>
                <strong>{cartItems.length}</strong>
              </div>

              <div className="checkout-row">
                <span>Total</span>
                <strong>{total} ₽</strong>
              </div>
            </div>

            <div className="cart-footer">
              <div>
                <p>Total</p>
                <h3>{total} ₽</h3>
              </div>

              <div className="cart-footer-actions">
                <button className="clear-cart-button" onClick={clearCart}>
                  Clear
                </button>
                <button className="checkout-button" onClick={checkout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;