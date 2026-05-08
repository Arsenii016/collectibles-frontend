import { useState } from "react";
import ProductCard from "../components/ProductCard";

function StorePage({
  products,
  activeCategory,
  openCategory,
  addToCart,
  toggleFavorite,
  isFavorite,
  openProduct,
  currentUser,
  isAdmin,
  deleteProduct,
  hideHeader = false,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState("newest");

  const categories = [
    "All items",
    "Sneakers",
    "Clothing",
    "Accessories",
    "Back to 2008",
    "Rare drops",
    "Archive pieces",
    "Vintage toys",
  ];

  const filteredProducts = products
    .filter((product) => {
      if (activeCategory === "All items") return true;
      return product.category === activeCategory;
    })
    .filter((product) => {
      const query = searchValue.toLowerCase();

      return (
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortType === "price-low") {
        return Number(a.price) - Number(b.price);
      }

      if (sortType === "price-high") {
        return Number(b.price) - Number(a.price);
      }

      return b.id - a.id;
    });

  return (
    <main className={hideHeader ? "store-inner" : "category-page"}>
      {!hideHeader && (
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
      )}

      <section className={hideHeader ? "" : "products-section category-products"}>
        <div className="store-toolbar">
          <div className="search-box">
            <span>Search</span>
            <input
              type="text"
              placeholder="Nike, jacket, sneakers..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>

          <div className="sort-box">
            <span>Sort by</span>
            <select
              value={sortType}
              onChange={(event) => setSortType(event.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                openProduct={openProduct}
                currentUser={currentUser}
                isAdmin={isAdmin}
                deleteProduct={deleteProduct}
              />
            ))}
          </div>
        ) : (
          <p className="empty-text">Ничего не найдено.</p>
        )}
      </section>
    </main>
  );
}

export default StorePage;