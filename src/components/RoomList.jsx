import React, { useState, useEffect, useRef, useCallback } from 'react';
import './RoomList.css';
import RoomContainer from './RoomContainer';
import sampleData from '../data/data.json';

const PAGE_SIZE = 5;

function getAllRooms() {
  // sampleData.rooms_by_serial_no[0].rooms is the array of rooms
  return (sampleData.rooms_by_serial_no || []).flatMap(serial => serial.rooms);
}

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const allRooms = useRef(getAllRooms());

  // Infinite scroll: load more when bottom is visible
  const lastRoomRef = useCallback(node => {
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
    setTimeout(() => {
      try {
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const nextRooms = allRooms.current.slice(start, end);
        setRooms(prev => [...prev, ...nextRooms]);
        setHasMore(end < allRooms.current.length);
        setLoading(false);
      } catch {
        setError('Failed to load data');
        setLoading(false);
      }
    }, 500);
  }, [page]);

  return (
    <div className="room-list">
      {rooms.map((room, idx) => {
        const isLast = idx === rooms.length - 1;
        return (
          <RoomContainer
            key={room.room_type_code || room.name || idx}
            room={room}
            ref={isLast ? lastRoomRef : null}
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