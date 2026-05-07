import ProductCard from "../components/ProductCard";

function NewArrivalsPage({
  products,
  addToCart,
  toggleFavorite,
  isFavorite,
  openProduct,
}) {
  return (
    <main className="category-page">
      <section className="category-hero">
        <p className="section-kicker">Fresh drops</p>

        <h2>New Arrivals</h2>

        <p>
          Последние добавленные позиции
          в каталоге магазина.
        </p>
      </section>

      <section className="products-section category-products">
        {products.length > 0 ? (
          <div className="grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                openProduct={openProduct}
              />
            ))}
          </div>
        ) : (
          <p className="empty-text">
            Пока нет новых товаров.
          </p>
        )}
      </section>
    </main>
  );
}

export default NewArrivalsPage;