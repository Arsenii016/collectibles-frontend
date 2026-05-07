import { useEffect, useState } from "react";

const API_URL = "https://collectibles-backend-hcey.onrender.com";
const ORDER_STATUSES = ["Created", "Paid", "Shipped", "Delivered"];

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    fetch(`${API_URL}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }

  function updateStatus(orderId, status) {
    fetch(`${API_URL}/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.order) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId ? data.order : order
            )
          );
        } else {
          alert(data.error || "Ошибка обновления статуса");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="category-page">
      <section className="category-hero">
        <p className="section-kicker">Admin panel</p>
        <h2>Orders</h2>
        <p>Список оформленных заказов пользователей и управление статусами.</p>
      </section>

      <section className="products-section category-products">
        {orders.length === 0 ? (
          <p className="empty-text">Заказов пока нет.</p>
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
                    <strong>Телефон:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Адрес:</strong> {order.address}
                  </p>
                  <p>
                    <strong>Оплата:</strong> {order.payment_method}
                  </p>
                  <p>
                    <strong>Комментарий:</strong>{" "}
                    {order.comment || "Нет комментария"}
                  </p>
                </div>

                <div className="order-status-controls">
                  {ORDER_STATUSES.map((status) => (
                    <button
                      key={status}
                      className={
                        order.status === status
                          ? "status-button active"
                          : "status-button"
                      }
                      onClick={() => updateStatus(order.id, status)}
                    >
                      {status}
                    </button>
                  ))}
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

export default AdminOrdersPage;