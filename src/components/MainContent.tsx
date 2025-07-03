import { useFilter } from './FilterContext';
import { Tally3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const MainContent = () => {
  const { searchQuery, selectCategory, minPrice, maxPrice, keywords } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
    if (keywords) {
      url = `https://dummyjson.com/products/search?q=${keywords}`;
    }

    axios.get(url).then((res) => setProducts(res.data.products));
  }, [currentPage, keywords]);

  const getFilteredProducts = () => {
    let filtered = [...products];

    if (selectCategory) {
      filtered = filtered.filter(p => p.category === selectCategory);
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= maxPrice);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case 'cheap':
        return filtered.sort((a, b) => a.price - b.price);
      case 'expensive':
        return filtered.sort((a, b) => b.price - a.price);
      case 'popular':
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(100 / itemsPerPage);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center gap-2 px-5 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Tally3 className="h-5 w-5" />
          {filter === 'all' ? 'Filter' : filter}
        </button>

        {dropdownOpen && (
          <div className="absolute mt-2 bg-white border shadow rounded z-10">
            {['cheap', 'expensive', 'popular'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setFilter(type);
                  setDropdownOpen(false);
                }}
                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <BookCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.thumbnail}
            price={product.price}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-full"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded-full ${page === currentPage ? 'bg-black text-white' : ''}`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-full"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default MainContent;
