import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiDollarSign, FiPackage, FiFilter, FiX, FiMenu, FiGrid } from 'react-icons/fi';


const Quickhome = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Filter states
  const [nameFilter, setNameFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [stockFilter, setStockFilter] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate paginated products
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        
        // Extract unique categories from products
        const uniqueCategories = [...new Set(res.data.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setFilteredProducts([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [nameFilter, priceRange, stockFilter, categoryFilter, sortOrder, products]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [filteredProducts, pageSize]);

  const applyFilters = () => {
    let filtered = [...products];
    
    if (nameFilter) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (stockFilter > 0) {
      filtered = filtered.filter(product => product.stock >= stockFilter);
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    // Apply sorting
    if (sortOrder !== 'default') {
      filtered = sortProducts(filtered, sortOrder);
    }
    
    setFilteredProducts(filtered);
  };

  const sortProducts = (products, sortType) => {
    const sorted = [...products];
    
    switch(sortType) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'stock-high':
        return sorted.sort((a, b) => b.stock - a.stock);
      default:
        return sorted;
    }
  };

  const resetFilters = () => {
    setNameFilter('');
    setPriceRange([0, 1000]);
    setStockFilter(0);
    setCategoryFilter('');
    setSortOrder('default');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Not fixed */}
      <header className="bg-blue-900 text-white shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 p-2 rounded-md hover:bg-blue-800 lg:hidden"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            {/* Added logo image here */}
            <img 
              src="./src/images/logo.png" 
              alt="QuickCart Logo" 
              className="h-10 w-auto mr-3"
            />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">QuickCart Grocery</h1>
          </div>
          <button
            className="bg-white text-blue-900 font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-100 transition duration-200"
            type="button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </header>

      {/* Full-width banner image */}
      <div className="w-full h-64 md:h-96 overflow-hidden">
        <img 
          src="./src/images/grocery.jpg" 
          alt="Grocery store banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-blue-900 text-white w-64 flex-shrink-0 p-4 fixed lg:static h-[calc(100vh-4rem)] z-20 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block overflow-y-auto`}>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center">
              <FiFilter className="mr-2" /> Filters
            </h2>
            <button 
              onClick={resetFilters}
              className="text-sm text-blue-200 hover:text-white"
            >
              Reset
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 flex items-center">
              <FiSearch className="mr-2" /> Product Name
            </label>
            <input
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-blue-700 bg-blue-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 flex items-center">
              <FiGrid className="mr-2" /> Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-blue-700 bg-blue-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 flex items-center">
              <FiDollarSign className="mr-2" /> Price Range
            </label>
            <div className="flex items-center justify-between mb-2 text-blue-200">
              <span className="text-xs">Rs. {priceRange[0]}</span>
              <span className="text-xs">Rs. {priceRange[1]}</span>
            </div>
            <div className="flex space-x-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full accent-blue-400"
              />
              <input
                type="range"
                min="0"
                max="2500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-blue-400"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 flex items-center">
              <FiPackage className="mr-2" /> Minimum Stock
            </label>
            <input
              type="number"
              min="0"
              value={stockFilter}
              onChange={(e) => setStockFilter(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-blue-700 bg-blue-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-8 pt-4 border-t border-blue-700">
            <label className="block text-sm font-medium mb-2">Switch Role</label>
            <select
              className="w-full px-3 py-2 border border-blue-700 bg-blue-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              defaultValue=""
              onChange={e => {
                if (e.target.value) navigate('/login');
              }}
            >
              <option value="" disabled className="bg-blue-900">Select role...</option>
              <option value="finance" className="bg-blue-900">Finance Member</option>
              <option value="hr" className="bg-blue-900">HR Manager</option>
              <option value="inventory" className="bg-blue-900">Inventory Manager</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)] lg:ml-64">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">Our Products</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor="sortOrder" className="text-sm text-gray-600">Sort by:</label>
                  <select
                    id="sortOrder"
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="stock-high">Stock: High to Low</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="pageSize" className="text-sm text-gray-600">Products per page:</label>
                  <select
                    id="pageSize"
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                  >
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={16}>16</option>
                    <option value={24}>24</option>
                    <option value={32}>32</option>
                  </select>
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {paginatedProducts.map(product => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                        {product.images && product.images[0] ? (
                          <img 
                            src={product.images[0].url} 
                            alt={product.name} 
                            className="h-full w-full object-cover transition duration-200 hover:scale-105"
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                          {product.category}
                        </span>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-blue-700">Rs. {product.price?.toFixed(2)}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            product.stock > 10 ? 'bg-green-100 text-green-800' : 
                            product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 truncate">
                          Supplier: {product.supplier}
                        </div>
                        <button
                          className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition"
                          onClick={() => alert(`You clicked Buy for ${product.name}`)}
                          disabled={product.stock === 0}
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                      className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <img 
                  src="./src/images/logo.png" 
                  alt="QuickCart Logo" 
                  className="h-8 w-auto mr-2"
                />
                <h3 className="text-xl font-bold">QuickCart Grocery</h3>
              </div>
              <p className="text-blue-200 text-sm">Your one-stop shop for all grocery needs</p>
            </div>
            <div className="text-sm text-blue-200">
              &copy; {new Date().getFullYear()} QuickCart Grocery Store. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Quickhome;