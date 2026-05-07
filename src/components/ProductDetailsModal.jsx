function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  addToCart,
  toggleFavorite,
  isFavorite,
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="product-modal-grid">
          <div className="product-modal-image">
            <img src={product.image_url} alt={product.name} />
          </div>

          <div className="product-modal-content">
            <p className="product-modal-category">
              {product.category || "Collection"}
            </p>

            <h2>{product.name}</h2>

            <p className="product-modal-description">
              {product.description}
            </p>

            <div className="product-modal-price">
              {product.price} ₽
            </div>

            <div className="product-modal-actions">
              <button
                className="modal-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>

              <button
                className={
                  isFavorite(product.id)
                    ? "modal-favorite active"
                    : "modal-favorite"
                }
                onClick={() => toggleFavorite(product)}
              >
                ♥
              </button>
            </div>

            <div className="product-modal-info">
              <div>
                <span>Seller</span>
                <strong>{product.seller || "Collectibles"}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>In stock</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;