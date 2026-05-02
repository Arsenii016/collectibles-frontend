function AboutPage() {
  return (
    <section className="info-page">
      <p className="section-kicker">About Collectibles</p>
      <h2>Store for selected rare fashion items</h2>

      <p className="info-text">
        Collectibles — это интернет-магазин коллекционных вещей с упором на
        лимитированную обувь, одежду и аксессуары. Каталог формируется
        администратором, чтобы пользователи видели только отобранные товары.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <h3>Authenticity</h3>
          <p>Проверка и отбор товаров перед публикацией в каталоге.</p>
        </div>

        <div className="about-card">
          <h3>Delivery</h3>
          <p>Информация о доставке и статусах заказов может быть расширена.</p>
        </div>

        <div className="about-card">
          <h3>Admin catalog</h3>
          <p>Управление товарами доступно только администратору.</p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;