import ProductCard from "../components/ProductCard";

function NewArrivalsPage({ products }) {
  return (
    <main className="category-page">
      <section className="category-hero">
        <p className="section-kicker">Fresh drops</p>
        <h2>New Arrivals</h2>
        <p>Последние добавленные позиции в каталоге магазина.</p>
      </section>

      <section className="products-section category-products">
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default NewArrivalsPage;