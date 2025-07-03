import { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';

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
  const keywordList = ['apple', 'watch', 'fashion', 'trend', 'shoes', 'shirts'];

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        const unique = Array.from(new Set(data.products.map((p: any) => p.category))) as string[];
        setCategories(unique);
      });
  }, []);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeywords('');
  };

  return (
    <aside className="w-[320px] bg-white shadow-lg p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">TrendNest</h1>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search product"
        className="border px-4 py-2 rounded w-full placeholder:text-gray-500"
      />

      <div className="flex gap-3">
        <input
          type="number"
          placeholder="Min"
          value={minPrice ?? ''}
          onChange={(e) => setMinPrice(parseFloat(e.target.value))}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice ?? ''}
          onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          className="border px-4 py-2 rounded w-full"
        />
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Categories</h2>
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex gap-2 items-center capitalize mb-2 cursor-pointer"
          >
            <input
              type="radio"
              checked={selectCategory === cat}
              onChange={() => setSelectCategory(cat)}
              name="category"
              className="accent-black"
            />
            {cat}
          </label>
        ))}
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Keywords</h2>
        {keywordList.map((word) => (
          <button
            key={word}
            onClick={() => setKeywords(word)}
            className="w-full mb-2 bg-gray-100 hover:bg-black hover:text-white px-3 py-2 rounded capitalize"
          >
            {word}
          </button>
        ))}
      </div>

      <button
        onClick={resetFilters}
        className="mt-auto w-full bg-black text-white py-3 rounded hover:bg-gray-800"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default Sidebar;
