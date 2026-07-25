import React, { useState, useEffect } from 'react';
import { Animal, AnimalCategory } from '../types';
import { api } from '../services/api';
import { AnimalCard } from '../components/AnimalCard';
import { Search, SlidersHorizontal, RefreshCw, Filter, ShieldCheck } from 'lucide-react';

interface AnimalMarketProps {
  onSelectAnimal: (animal: Animal) => void;
}

export const AnimalMarket: React.FC<AnimalMarketProps> = ({ onSelectAnimal }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(400000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight-desc'>('featured');

  const categories: string[] = ['All', 'Bull', 'Cow', 'Goat', 'Sheep'];

  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const res = await api.getAnimals({
        category: selectedCategory,
        search: searchQuery,
        maxPrice: maxPrice,
      });
      let result = [...res.animals];

      // Sorting
      if (sortBy === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'weight-desc') {
        result.sort((a, b) => b.weight - a.weight);
      }

      setAnimals(result);
    } catch (err) {
      console.error('Failed to fetch market animals', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <div className="space-y-8 pb-16">
      {/* Page Title Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4 shadow-xl border border-slate-800">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-400/30">
              Verified Cattle & Livestock Market
            </span>
            <h1 className="text-2xl sm:text-4xl font-black mt-2">Browse Kurbani Animals & Shares</h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Filter by weight, breed, price per share, and farm location. All cattle listed undergo live digital scale weighing.
            </p>
          </div>
          <button
            onClick={fetchAnimals}
            className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Market
          </button>
        </div>

        {/* Search & Category Tabs Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat === 'All' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search breed, title, farm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Controls & Sort Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span>Max Price Filter:</span>
          <input
            type="range"
            min="20000"
            max="500000"
            step="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-32 accent-emerald-600"
          />
          <span className="font-bold text-emerald-800">৳{maxPrice.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-slate-500">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="featured">Featured / Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="weight-desc">Weight: Heaviest First</option>
          </select>
        </div>
      </div>

      {/* Animal Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-2xl h-80 border border-slate-200 animate-pulse p-4 space-y-4">
              <div className="bg-slate-200 h-40 rounded-xl" />
              <div className="bg-slate-200 h-4 rounded-md w-3/4" />
              <div className="bg-slate-200 h-4 rounded-md w-1/2" />
            </div>
          ))}
        </div>
      ) : animals.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Animals Match Your Filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your price slider or searching for a different breed like Shahiwal, Australian Cross, or Deshi.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setMaxPrice(500000);
            }}
            className="bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} onSelect={onSelectAnimal} />
          ))}
        </div>
      )}
    </div>
  );
};
