function CollectionsPage({ openCategory }) {
  return (
    <section className="info-page">
      <p className="section-kicker">Curated drops</p>
      <h2>Collections</h2>
      <p className="info-text">
        Подборки коллекционных вещей: архивные позиции, редкие релизы,
        винтажные аксессуары и временные промо-коллекции.
      </p>

      <div className="collection-grid">
        <button onClick={() => openCategory("Back to 2008")}>
          Back to 2008
        </button>

        <button onClick={() => openCategory("Rare drops")}>
          Rare drops
        </button>

        <button onClick={() => openCategory("Archive pieces")}>
          Archive pieces
        </button>

        <button onClick={() => openCategory("Vintage toys")}>
          Vintage toys
        </button>
      </div>
    </section>
  );
}

export default CollectionsPage;