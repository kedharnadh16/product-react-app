import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);

  const [searchId, setSearchId] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [searchedNameProduct, setSearchedNameProduct] = useState(null);

  const [updateId, setUpdateId] = useState("");

  const [updateProduct, setUpdateProduct] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    quantity: ""
  });

  const [deleteId, setDeleteId] = useState("");

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    quantity: ""
  });


  // =========================
  // GET ALL PRODUCTS
  // =========================

  const getProducts = () => {

    axios.get("http://localhost:9988/product/allProducts")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log("API ERROR:", error);
        alert("Unable to load products");
      });

  };


  // =========================
  // CREATE PRODUCT
  // =========================

  const handleChange = (event) => {

    setProduct({
      ...product,
      [event.target.name]: event.target.value
    });

  };


  const createProduct = () => {

    axios.post(
      "http://localhost:9988/product/createproduct",
      product
    )
      .then(response => {

        alert("Product Created Successfully!");

        setProduct({
          productName: "",
          category: "",
          description: "",
          price: "",
          quantity: ""
        });

        getProducts();

      })
      .catch(error => {

        console.log(error);

        alert("Product Creation Failed!");

      });

  };


  // =========================
  // GET BY ID
  // =========================

  const getProductById = () => {

    if (!searchId) {
      alert("Please enter Product ID");
      return;
    }

    axios.get(
      `http://localhost:9988/product/Productbyid/${searchId}`
    )
      .then(response => {

        setSearchedProduct(response.data);

      })
      .catch(error => {

        console.log(error);

        alert("Product Not Found");

      });

  };


  // =========================
  // GET BY NAME
  // =========================

  const getProductByName = () => {

    if (!searchName) {
      alert("Please enter Product Name");
      return;
    }

    axios.get(
      `http://localhost:9988/product/productname/${encodeURIComponent(searchName)}`
    )
      .then(response => {

        setSearchedNameProduct(response.data);

      })
      .catch(error => {

        console.log(error);

        alert("Product Not Found");

      });

  };


  // =========================
  // UPDATE
  // =========================

  const handleUpdateChange = (event) => {

    setUpdateProduct({
      ...updateProduct,
      [event.target.name]: event.target.value
    });

  };


  const updateProductData = () => {

    if (!updateId) {
      alert("Please enter Product ID");
      return;
    }

    axios.put(
      `http://localhost:9988/product/update/${updateId}`,
      updateProduct
    )
      .then(response => {

        alert("Product Updated Successfully!");

        setUpdateId("");

        setUpdateProduct({
          productName: "",
          category: "",
          description: "",
          price: "",
          quantity: ""
        });

        getProducts();

      })
      .catch(error => {

        console.log(error);

        alert("Product Update Failed!");

      });

  };


  // =========================
  // DELETE
  // =========================

  const deleteProduct = () => {

    if (!deleteId) {
      alert("Please enter Product ID");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    axios.delete(
      `http://localhost:9988/product/delete/${deleteId}`
    )
      .then(response => {

        alert("Product Deleted Successfully!");

        setDeleteId("");

        getProducts();

      })
      .catch(error => {

        console.log(error);

        alert("Product Delete Failed!");

      });

  };


  return (

    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-icon">
            📦
          </div>

          <div>
            <h1>ProductHub</h1>
            <span>Product Management</span>
          </div>

        </div>

        <button
          className="refresh-btn"
          onClick={getProducts}
        >
          ↻ Refresh
        </button>

      </header>


      {/* ================= HERO ================= */}

      <section className="hero">

        <div>

          <span className="hero-badge">
            PRODUCT MANAGEMENT SYSTEM
          </span>

          <h2>
            Manage your products
            <br />
            <span>easily & efficiently.</span>
          </h2>

          <p>
            Create, search, update and manage all your products
            from one simple dashboard.
          </p>

        </div>

        <div className="hero-icon">
          📦
        </div>

      </section>


      <main className="container">


        {/* ================= CREATE ================= */}

        <section className="section-card create-section">

          <div className="section-title">

            <div className="title-icon green">
              +
            </div>

            <div>
              <h3>Add New Product</h3>
              <p>Create a new product in your inventory</p>
            </div>

          </div>


          <div className="form-grid">

            <div className="input-group">

              <label>Product Name</label>

              <input
                type="text"
                name="productName"
                placeholder="e.g. Wireless Mouse"
                value={product.productName}
                onChange={handleChange}
              />

            </div>


            <div className="input-group">

              <label>Category</label>

              <input
                type="text"
                name="category"
                placeholder="e.g. Electronics"
                value={product.category}
                onChange={handleChange}
              />

            </div>


            <div className="input-group full">

              <label>Description</label>

              <input
                type="text"
                name="description"
                placeholder="Enter product description"
                value={product.description}
                onChange={handleChange}
              />

            </div>


            <div className="input-group">

              <label>Price</label>

              <input
                type="number"
                name="price"
                placeholder="₹ 0.00"
                value={product.price}
                onChange={handleChange}
              />

            </div>


            <div className="input-group">

              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                value={product.quantity}
                onChange={handleChange}
              />

            </div>

          </div>


          <button
            className="primary-btn"
            onClick={createProduct}
          >
            + Add Product
          </button>

        </section>


        {/* ================= SEARCH ================= */}

        <section className="section-card">

          <div className="section-title">

            <div className="title-icon blue">
              🔍
            </div>

            <div>
              <h3>Find a Product</h3>
              <p>Search products using ID or name</p>
            </div>

          </div>


          <div className="search-grid">

            {/* BY ID */}

            <div className="search-card">

              <span className="search-label">
                SEARCH BY ID
              </span>

              <h4>Product ID</h4>

              <div className="search-input">

                <input
                  type="number"
                  placeholder="Enter ID"
                  value={searchId}
                  onChange={(e) =>
                    setSearchId(e.target.value)
                  }
                />

                <button
                  onClick={getProductById}
                >
                  Search
                </button>

              </div>


              {searchedProduct && (

                <div className="search-result">

                  <strong>
                    {searchedProduct.productName}
                  </strong>

                  <span>
                    ID: {searchedProduct.productId}
                  </span>

                  <span>
                    {searchedProduct.category}
                  </span>

                  <span>
                    ₹{searchedProduct.price}
                  </span>

                </div>

              )}

            </div>


            {/* BY NAME */}

            <div className="search-card">

              <span className="search-label">
                SEARCH BY NAME
              </span>

              <h4>Product Name</h4>

              <div className="search-input">

                <input
                  type="text"
                  placeholder="Enter product name"
                  value={searchName}
                  onChange={(e) =>
                    setSearchName(e.target.value)
                  }
                />

                <button
                  onClick={getProductByName}
                >
                  Search
                </button>

              </div>


              {searchedNameProduct && (

                <div className="search-result">

                  <strong>
                    {searchedNameProduct.productName}
                  </strong>

                  <span>
                    ID: {searchedNameProduct.productId}
                  </span>

                  <span>
                    {searchedNameProduct.category}
                  </span>

                  <span>
                    ₹{searchedNameProduct.price}
                  </span>

                </div>

              )}

            </div>

          </div>

        </section>


        {/* ================= UPDATE ================= */}

        <section className="section-card">

          <div className="section-title">

            <div className="title-icon orange">
              ✎
            </div>

            <div>
              <h3>Update Product</h3>
              <p>Edit an existing product</p>
            </div>

          </div>


          <div className="update-id">

            <div className="input-group">

              <label>Product ID</label>

              <input
                type="number"
                placeholder="Enter Product ID"
                value={updateId}
                onChange={(e) =>
                  setUpdateId(e.target.value)
                }
              />

            </div>

          </div>


          <div className="form-grid">

            <div className="input-group">

              <label>Product Name</label>

              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={updateProduct.productName}
                onChange={handleUpdateChange}
              />

            </div>


            <div className="input-group">

              <label>Category</label>

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={updateProduct.category}
                onChange={handleUpdateChange}
              />

            </div>


            <div className="input-group full">

              <label>Description</label>

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={updateProduct.description}
                onChange={handleUpdateChange}
              />

            </div>


            <div className="input-group">

              <label>Price</label>

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={updateProduct.price}
                onChange={handleUpdateChange}
              />

            </div>


            <div className="input-group">

              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={updateProduct.quantity}
                onChange={handleUpdateChange}
              />

            </div>

          </div>


          <button
            className="update-btn"
            onClick={updateProductData}
          >
            Update Product
          </button>

        </section>


        {/* ================= DELETE ================= */}

        <section className="delete-section">

          <div>

            <div className="delete-title">
              🗑️ Delete Product
            </div>

            <p>
              Enter a product ID to permanently remove it
              from your inventory.
            </p>

          </div>


          <div className="delete-action">

            <input
              type="number"
              placeholder="Product ID"
              value={deleteId}
              onChange={(e) =>
                setDeleteId(e.target.value)
              }
            />

            <button
              onClick={deleteProduct}
            >
              Delete
            </button>

          </div>

        </section>


        {/* ================= PRODUCTS ================= */}

        <section className="products-section">

          <div className="products-header">

            <div>

              <span className="section-label">
                INVENTORY
              </span>

              <h2>All Products</h2>

              <p>
                {products.length} products in your inventory
              </p>

            </div>


            <button
              className="view-btn"
              onClick={getProducts}
            >
              View Products →
            </button>

          </div>


          {products.length === 0 ? (

            <div className="empty-state">

              <div>📦</div>

              <h3>No products loaded</h3>

              <p>
                Click "View Products" to load your products.
              </p>

            </div>

          ) : (

            <div className="product-grid">

              {products.map((product) => (

                <div
                  className="product-card"
                  key={product.productId}
                >

                  <div className="product-card-top">

                    <span className="id-badge">
                      #{product.productId}
                    </span>

                    <span className="category-badge">
                      {product.category}
                    </span>

                  </div>


                  <div className="product-icon">
                    📦
                  </div>


                  <h3>
                    {product.productName}
                  </h3>


                  <p className="product-description">
                    {product.description}
                  </p>


                  <div className="product-bottom">

                    <div>

                      <span>PRICE</span>

                      <strong>
                        ₹{product.price}
                      </strong>

                    </div>


                    <div>

                      <span>STOCK</span>

                      <strong>
                        {product.quantity}
                      </strong>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer>

        <p>
          ProductHub © 2026 • Product Management System
        </p>

      </footer>

    </div>

  );

}

export default App;