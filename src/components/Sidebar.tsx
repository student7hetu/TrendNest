import { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectCategory,
    setSelectCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeywords,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    'apple',
    'watch',
    'Fashion',
    'trend',
    'shoes',
    'shirts',
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeywords(keyword);
  };

  const hanleResetFilters = () => {
    setSearchQuery('');
    setSelectCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeywords('');
  };

  return (
    <div className='w-[360px] min-h-screen bg-white shadow-xl flex items-start justify-center'>
      <div className='w-full max-w-[300px] px-4 py-10 flex flex-col gap-10'>
        <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>
          TrendNest
        </h1>

        {/* Search */}
        <input
          type='text'
          placeholder=' Search Product'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border border-gray-300 px-4 py-3 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition'
        />

        {/* Price Filter */}
        <div className='flex gap-4'>
          <input
            type='text'
            placeholder=' Min'
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}
            className='border border-gray-300 px-4 py-3 text-base w-full placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition'
          />
          <input
            type='text'
            placeholder=' Max'
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
            className='border border-gray-300 px-4 py-3 text-base w-full placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition'
          />
        </div>

        {/* Categories */}
        <div>
          <h2 className='text-xl font-semibold text-gray-900 mb-4 capitalize'>
            Categories
          </h2>
          <div className='flex flex-col gap-3'>
            {categories.map((category, index) => (
              <label
                key={index}
                className='flex items-center gap-3 text-gray-800 hover:text-black cursor-pointer transition capitalize text-base'
              >
                <input
                  type='radio'
                  name='category'
                  value={category}
                  onChange={() => handleRadioChangeCategories(category)}
                  checked={selectCategory === category}
                  className='accent-black w-4 h-4'
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div>
          <h2 className='text-xl font-semibold text-gray-900 mb-4 capitalize'>
            Keywords
          </h2>
          <div className='flex flex-col gap-3'>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className='w-full text-left px-4 py-2 bg-gray-100 text-gray-800 hover:bg-black hover:text-white transition text-base font-medium capitalize flex items-center justify-center rounded'
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          className='w-full bg-black text-white py-3 hover:bg-gray-800 transition font-semibold text-base'
          onClick={hanleResetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
