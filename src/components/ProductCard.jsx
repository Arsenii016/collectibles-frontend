function ProductCard({
  product,
  addToCart,
  toggleFavorite,
  isFavorite,
  openProduct,
}) {
  return (
    <div className="card">
      <div
        className="card-image-wrap"
        onClick={() => openProduct(product)}
      >
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

        <img src={product.image_url} alt={product.name} />
      </div>

      <div className="card-content">
        <div className="card-top">
          <p className="item-label">{product.category || "New"}</p>
        </div>

        <h3>{product.name}</h3>

        <p className="description">
          {product.description}
        </p>

        <p className="price">{product.price} ₽</p>

        <p className="seller">
          Продавец: {product.seller || "Магазин"}
        </p>

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
      </div>
    </div>
  );
}

export default ProductCard;