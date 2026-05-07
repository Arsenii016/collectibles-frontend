import { useEffect, useState } from "react";

const API_URL = "https://collectibles-backend-hcey.onrender.com";

function MyOrdersPage({ currentUser }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (currentUser) {
      loadMyOrders();
    }
  }, [currentUser]);

  function loadMyOrders() {
    fetch(`${API_URL}/users/${currentUser.id}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }

  if (!currentUser) {
    return (
      <main className="category-page">
        <section className="category-hero">
          <p className="section-kicker">Account</p>
          <h2>My Orders</h2>
          <p>Войдите в аккаунт, чтобы увидеть свои заказы.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="category-page">
      <section className="category-hero">
        <p className="section-kicker">Account</p>
        <h2>My Orders</h2>
        <p>Здесь отображаются ваши заказы и их текущий статус.</p>
      </section>

      <section className="products-section category-products">
        {orders.length === 0 ? (
          <p className="empty-text">У вас пока нет заказов.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <div>
                    <p className="section-kicker">Order #{order.id}</p>
                    <h3>{order.customer_name}</h3>
                  </div>

                  <span
                    className={`order-status ${order.status
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-info">
                  <p>
                    <strong>Адрес:</strong> {order.address}
                  </p>
                  <p>
                    <strong>Оплата:</strong> {order.payment_method}
                  </p>
                  <p>
                    <strong>Телефон:</strong> {order.phone}
                  </p>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div className="order-item" key={`${order.id}-${item.id}`}>
                      <img src={item.image_url} alt={item.name} />

                      <div>
                        <h4>{item.name}</h4>
                        <p>
                          {item.category} · {item.quantity} шт.
                        </p>
                        <strong>{item.price} ₽</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <span>Total</span>
                  <strong>{order.total} ₽</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MyOrdersPage;