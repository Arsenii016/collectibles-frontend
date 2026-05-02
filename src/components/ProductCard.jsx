function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <div className="card-image-wrap">
        <img src={product.image_url} alt={product.name} />
      </div>

      <div className="card-content">
        <div className="card-top">
          <p className="item-label">{product.category || "New"}</p>
        </div>

        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <p className="price">{product.price} ₽</p>
        <p className="seller">Продавец: {product.seller || "Магазин"}</p>

        <button className="add-cart-button" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;