function ProductFormModal({
  isOpen,
  onClose,
  formData,
  handleProductChange,
  handleFileChange,
  handleProductSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <form className="product-form" onSubmit={handleProductSubmit}>
        <div className="form-header">
          <div>
            <p className="form-label">Admin panel</p>
            <h2>Add collectible item</h2>
          </div>

          <button className="close-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Название товара"
          value={formData.name}
          onChange={handleProductChange}
          required
        />

        <textarea
          name="description"
          placeholder="Описание"
          value={formData.description}
          onChange={handleProductChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={formData.price}
          onChange={handleProductChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleProductChange}
          required
        >
          <option value="Sneakers">Sneakers</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>

          <option value="Back to 2008">Back to 2008</option>
          <option value="Rare drops">Rare drops</option>
          <option value="Archive pieces">Archive pieces</option>
          <option value="Vintage toys">Vintage toys</option>
        </select>

        <label className="upload-box">
          <span>
            {formData.image_file
              ? formData.image_file.name
              : "Выбрать изображение"}
          </span>

          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        <input
          type="number"
          name="seller_id"
          placeholder="ID администратора"
          value={formData.seller_id}
          onChange={handleProductChange}
          required
        />

        <button className="submit-button">Add item</button>
      </form>
    </div>
  );
}

export default ProductFormModal;