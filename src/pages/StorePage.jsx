import ProductCard from "../components/ProductCard";

function StorePage({ products, activeCategory, openCategory, addToCart }) {
  const categories = [
    "All items",
    "Sneakers",
    "Clothing",
    "Accessories",
    "Vintage toys",
  ];

  const filteredProducts =
    activeCategory === "All items"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <main className="category-page">
      <section className="category-hero">
        <p className="section-kicker">Store</p>
        <h2>{activeCategory}</h2>
        <p>
          Отобранные коллекционные позиции: лимитированная обувь, одежда,
          аксессуары и редкие архивные вещи.
        </p>

        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active-category" : ""}
              onClick={() => openCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="products-section category-products">
        {filteredProducts.length > 0 ? (
          <div className="grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <p className="empty-text">В этой категории пока нет товаров.</p>
        )}
      </section>
    </main>
  );
}

export default StorePage;