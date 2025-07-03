import { createContext, useState, ReactNode, useContext } from 'react';

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectCategory: string;
  setSelectCategory: (category: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  keywords: string;
  setKeywords: (keywords: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keywords, setKeywords] = useState('');

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectCategory,
        setSelectCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keywords,
        setKeywords,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used within FilterProvider');
  return context;
};
