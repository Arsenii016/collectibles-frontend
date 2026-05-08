const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80";

function ProductCard({
  product,
  addToCart,
  toggleFavorite,
  isFavorite,
  openProduct,
  currentUser,
  isAdmin,
  deleteProduct,
}) {
  const imageSrc = product.image_url || FALLBACK_IMAGE;

  return (
    <div className="card">
      <div className="card-image-wrap" onClick={() => openProduct(product)}>
        <button
          className={
            isFavorite(product.id)
              ? "favorite-card-button active"
              : "favorite-card-button"
          }
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(product);
          }}
        >
          ♥
        </button>

        <img
          src={imageSrc}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      <div className="card-content">
        <div className="card-top">
          <p className="item-label">{product.category || "New"}</p>
        </div>

        <h3>{product.name}</h3>

        <p className="description">{product.description}</p>

        <p className="price">{product.price} ₽</p>

        <p className="seller">Продавец: {product.seller || "Магазин"}</p>

        <div className="card-buttons">
          <button
            className="details-button"
            onClick={() => openProduct(product)}
          >
            View details
          </button>

          <button
            className="add-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>

        {currentUser && isAdmin && (
          <button
            className="delete-product-button"
            onClick={() => deleteProduct(product.id)}
          >
            Delete product
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;