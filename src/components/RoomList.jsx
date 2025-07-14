import React, { useState, useEffect, useRef, useCallback } from 'react';
import './RoomList.css';
import RoomCard from './RoomCard';
import { getAllVariants } from '../clientUtils';

const PAGE_SIZE = 10;

function RoomList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const allVariants = useRef(getAllVariants());

  // Infinite scroll: load more when bottom is visible
  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => { // Simulate async fetch
      try {
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const nextItems = allVariants.current.slice(start, end);
        setItems(prev => [...prev, ...nextItems]);
        setHasMore(end < allVariants.current.length);
        setLoading(false);
      } catch {
        setError('Failed to load data');
        setLoading(false);
      }
    }, 500);
  }, [page]);

  return (
    <div className="room-list">
      {items.map((variant, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <RoomCard
            key={variant.variant_id}
            variant={variant}
            ref={isLast ? lastItemRef : null}
          />
        );
      })}
      {loading && <div className="skeleton-list">{Array.from({length: PAGE_SIZE}).map((_,i) => <div className="skeleton-card" key={i}></div>)}</div>}
      {error && <div className="error">{error}</div>}
      {!hasMore && <div className="end-message">No more rooms to load.</div>}
    </div>
  );
}

export default RoomList; 