'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/ui/navbar';


const dummyCategories = Array.from({ length: 30 }, (_, index) => ({
  id: `category-${index + 1}`,
  name: `Category ${index + 1}`,
}));

const BATCH_SIZE = 6;

const App: React.FC = () => {
  const router = useRouter();
  const [displayedCategories, setDisplayedCategories] = useState(dummyCategories.slice(0, BATCH_SIZE));
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState(displayedCategories);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const results = dummyCategories
      .filter((cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, page * BATCH_SIZE);
    setFiltered(results);
  };


  const fetchMore = () => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const nextBatch = dummyCategories.slice(0, nextPage * BATCH_SIZE);

      setDisplayedCategories(nextBatch);
      if (searchTerm) {
        const filteredBatch = nextBatch.filter((cat) =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFiltered(filteredBatch);
      } else {
        setFiltered(nextBatch);
      }

      setPage(nextPage);
      setIsLoading(false);
    }, 1000);
  };


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        fetchMore();
      }
    });

    const ref = observerRef.current;
    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [isLoading, filtered]);


  const handleCategoryClick = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />

      {/* Breadcrumbs */}
      <div className="px-8 py-2 text-sm text-gray-600">
        <span className="cursor-pointer text-blue-600" onClick={() => router.push('/')}>
          Home
        </span>{' '}
        {' > '}
        <span className="text-gray-800">Categories</span>
      </div>

      {/* Category Grid */}
      <div className="p-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="cursor-pointer border rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{cat.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">No categories found</div>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="text-center text-gray-500 mt-4">Loading more categories...</div>
        )}

        {/* Scroll Observer Target */}
        <div ref={observerRef} className="h-10" />
      </div>
    </div>
  );
};

export default App;
