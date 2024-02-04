// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

const mockCategories = [
  { id: 'vehicles', name: 'Vehicles', description: 'Find a variety of products related to vehicles, from cars to bicycles.' },
  { id: 'electronics', name: 'Electronics', description: 'Explore a selection of cutting-edge electronic products.' },
  { id: 'clothing', name: 'Clothing', description: 'Discover the latest fashion trends with our clothing collection.' },
];

const mockProducts = [
  { id: '1', name: 'Car', category: 'vehicles', description: 'A stylish car designed for comfort and style.' },
  { id: '2', name: 'Mountain Bike', category: 'vehicles', description: 'A rugged mountain bike for outdoor adventures.' },
  { id: '3', name: 'Electric Scooter', category: 'vehicles', description: 'Compact and efficient electric scooter for urban mobility.' },
  { id: '4', name: 'Smartphone', category: 'electronics', description: 'State-of-the-art smartphone with advanced features.' },
  { id: '5', name: 'Wireless Headphones', category: 'electronics', description: 'Wireless headphones with noise cancellation for an immersive sound experience.' },
  { id: '6', name: 'Smartwatch', category: 'electronics', description: 'Smartwatch with activity tracking and health monitoring.' },
  { id: '7', name: 'Cotton T-shirt', category: 'clothing', description: 'Soft cotton T-shirt with a modern design.' },
  { id: '8', name: 'Stylish Hoodie', category: 'clothing', description: 'Comfortable and stylish hoodie.' },
  { id: '9', name: 'High-Quality Jeans', category: 'clothing', description: 'High-quality jeans for a casual style.' },
];

function useProducts(categoryId) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const filteredProducts = mockProducts.filter(product => product.category === categoryId);
    setProducts(filteredProducts);
  }, [categoryId]);

  return products;
}

function useCategories() {
  return mockCategories;
}

function Home({ addToCart }) {
  return (
    <div className="home">
      <h2>Welcome to our E-commerce Store!</h2>
      <p>Explore our wide range of products.</p>
      <div className="product-list">
        {mockProducts.map(product => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link className='brand' to="/">LOPEREZ</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/catalog">Catalog</Link>
        </li>
        <li>
          <Link to="/cart">Cart ({cartCount})</Link>
        </li>
      </ul>
    </nav>
  );
}

function ProductItem({ product, addToCart }) {
  return (
    <div className="product-item">
      <div className="product-box">
        <img src={`${process.env.PUBLIC_URL}/images/${product.id}.jpg`} alt={`Product: ${product.name}`} />
        <p>{product.name}</p>
        <p className="description">{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <Link to={`/product/${product.id}`}>View Details</Link>
      </div>
    </div>
  );
}

function ProductDetails() {
  const { productId } = useParams();
  const product = mockProducts.find(product => product.id === productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p className="description">{product.description}</p>
      <p>Category: {product.category}</p>
      <p>ID: {product.id}</p>
      {/* Add more details as needed */}
    </div>
  );
}

function Catalog({ addToCart }) {
  const { categoryId } = useParams();
  const categories = useCategories();
  const products = useProducts(categoryId);

  return (
    <div className="catalog-container">
      <div className="categories-container">
        {categories.map(category => (
          <Link key={category.id} to={`/catalog/${category.id}`} className="category-button">
            {category.name}
          </Link>
        ))}
        <h2>Products</h2>
        <div className="product-list">
          {products.map(product => (
            <ProductItem key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Cart({ cart }) {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map(product => (
            <li key={product.id} className="cart-item">
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  const [cart, setCart] = React.useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log(`Added to cart: ${product.name}`);
  };

  return (
    <Router>
      <div className="app">
        <Navbar cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/catalog" element={<Catalog addToCart={addToCart} />} />
          <Route path="/catalog/:categoryId" element={<Catalog addToCart={addToCart} />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
